#!/usr/bin/env node

const fs = require('fs');
const path = require('path');

const EXPORT_DIR = path.join(__dirname, '..', 'roelvandervencom-export');
const CONTENT_DIR = path.join(__dirname, '..', 'content');
const STATIC_IMAGES_DIR = path.join(__dirname, '..', 'static', 'images');

// Parse frontmatter from markdown content
function parseFrontmatter(content) {
  const match = content.match(/^---\n([\s\S]*?)\n---\n([\s\S]*)$/);
  if (!match) {
    return null;
  }

  const frontmatterText = match[1];
  const body = match[2];
  const frontmatter = {};

  // Parse YAML-style frontmatter
  frontmatterText.split('\n').forEach(line => {
    const colonIndex = line.indexOf(':');
    if (colonIndex === -1) return;

    const key = line.substring(0, colonIndex).trim();
    let value = line.substring(colonIndex + 1).trim();

    // Remove quotes from strings
    if ((value.startsWith("'") && value.endsWith("'")) ||
        (value.startsWith('"') && value.endsWith('"'))) {
      value = value.slice(1, -1);
    }

    // Parse arrays (simple implementation for tags)
    if (value.startsWith('[') && value.endsWith(']')) {
      value = value.slice(1, -1).split(',').map(v =>
        v.trim().replace(/^['"]|['"]$/g, '')
      );
    }

    frontmatter[key] = value;
  });

  return { frontmatter, body };
}

// Convert RFC 2822 date to ISO 8601
function convertDate(rfc2822Date) {
  try {
    const date = new Date(rfc2822Date);
    if (isNaN(date.getTime())) {
      console.warn('Invalid date:', rfc2822Date);
      return new Date().toISOString();
    }
    return date.toISOString();
  } catch (error) {
    console.warn('Error parsing date:', rfc2822Date, error);
    return new Date().toISOString();
  }
}

// Determine content type and section based on tags
function determineContentType(tags) {
  if (!tags || !Array.isArray(tags)) {
    return { section: 'posts', type: 'article' };
  }

  // Check for cameo
  if (tags.includes('Cameo')) {
    return { section: 'photos', type: 'cameo' };
  }

  // Check for blog posts
  if (tags.includes('Blog') || tags.includes('Blogs')) {
    return { section: 'posts', type: 'article' };
  }

  // Skip Feed, Image, Gallery, Navigation, Social Media posts
  if (tags.some(tag => ['Feed', 'Image', 'Gallery', 'Navigation', 'Social Media'].includes(tag))) {
    return null; // Skip this post
  }

  return { section: 'posts', type: 'article' };
}

// Clean up WordPress shortcodes
function cleanContent(content) {
  // Convert YouTube embeds (handle both escaped and non-escaped brackets)
  content = content.replace(/\\?\[embed\\?\]https?:\/\/(?:www\.)?youtube\.com\/watch\?v=([a-zA-Z0-9_-]+).*?\\?\[\/embed\\?\]/g, (match, videoId) => {
    return `{{< youtube "${videoId}" >}}`;
  });

  content = content.replace(/\\?\[embed\\?\]https?:\/\/(?:www\.)?youtu\.be\/([a-zA-Z0-9_-]+).*?\\?\[\/embed\\?\]/g, (match, videoId) => {
    return `{{< youtube "${videoId}" >}}`;
  });

  // Convert Vimeo embeds (handle both escaped and non-escaped brackets)
  content = content.replace(/\\?\[embed\\?\]https?:\/\/(?:www\.)?vimeo\.com\/([0-9]+)[^\]]*\\?\[\/embed\\?\]/g, (match, videoId) => {
    return `{{< vimeo "${videoId}" >}}`;
  });

  // Remove [caption] shortcodes - handle both escaped and unescaped
  content = content.replace(/\\?\[caption[^\]]*\\?\]([\s\S]*?)\\?\[\/caption\\?\]/g, (match, inner) => {
    // Extract image markdown - handle both escaped and normal brackets
    const imgMatch = inner.match(/!\\?\[([^\]]*?)\\?\]\\?\(([^)]+?)\\?\)/);
    if (imgMatch) {
      const alt = imgMatch[1];
      let src = imgMatch[2];
      // Fix image path if needed
      if (src.startsWith('/images/') && !src.startsWith('/images/photos/')) {
        src = src.replace('/images/', '/images/photos/');
      }
      // Extract caption text after the image link
      const captionMatch = inner.match(/\\?\)\\?\s+(.+)$/s);
      const caption = captionMatch ? captionMatch[1].trim() : '';

      // Return just the image and caption as plain markdown
      return `![${alt}](${src})\n${caption ? '\n' + caption : ''}`;
    }
    return inner;
  });

  // Remove [gallery] shortcodes
  content = content.replace(/\[gallery[^\]]*\]/g, '');

  // Fix image paths - convert /images/ to /images/photos/ (but avoid double-fixing)
  content = content.replace(/!\[([^\]]*)\]\(\/images\/(?!photos\/)([^)]+)\)/g, '![$1](/images/photos/$2)');
  content = content.replace(/<img src="\/images\/(?!photos\/)([^"]+)"/g, '<img src="/images/photos/$1"');

  return content.trim();
}

// Generate slug from filename
function generateSlug(filename) {
  return filename
    .replace(/\.md$/, '')
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-|-$/g, '');
}

// Clean and normalize tags
function cleanTags(tags) {
  if (!tags || !Array.isArray(tags)) {
    return [];
  }

  return tags
    .filter(tag => !['Feed', 'Image', 'Gallery', 'Navigation', 'Social Media', 'Cameo', 'Blog', 'Blogs'].includes(tag))
    .map(tag => tag.toLowerCase().replace(/[^a-z0-9]+/g, '-'))
    .filter(tag => tag.length > 0);
}

// Main migration function
function migrateContent() {
  console.log('Starting content migration...\n');

  const files = fs.readdirSync(EXPORT_DIR);
  let migratedCount = 0;
  let skippedCount = 0;

  files.forEach(filename => {
    if (!filename.endsWith('.md')) {
      return;
    }

    const filePath = path.join(EXPORT_DIR, filename);
    const content = fs.readFileSync(filePath, 'utf-8');
    const parsed = parseFrontmatter(content);

    if (!parsed) {
      console.log(`⚠️  Skipping ${filename} - no frontmatter found`);
      skippedCount++;
      return;
    }

    const { frontmatter, body } = parsed;

    // Determine content type
    const contentType = determineContentType(frontmatter.tags);
    if (!contentType) {
      console.log(`⏭️  Skipping ${filename} - excluded content type`);
      skippedCount++;
      return;
    }

    // Convert date
    const isoDate = convertDate(frontmatter.date);

    // Generate slug
    const slug = generateSlug(filename);

    // Clean tags
    const cleanedTags = cleanTags(frontmatter.tags);

    // Clean content
    const cleanedBody = cleanContent(body);

    // Build new frontmatter
    const newFrontmatter = {
      title: frontmatter.title || slug,
      date: isoDate,
      draft: frontmatter.draft === 'true',
      tags: cleanedTags,
      type: contentType.type,
      slug: slug
    };

    // For cameo posts, add SEO fields
    if (contentType.type === 'cameo') {
      newFrontmatter.title = frontmatter.title.includes('Roel van der Ven')
        ? frontmatter.title
        : `Roel van der Ven - ${frontmatter.title}`;
      newFrontmatter.tags = ['cameo', ...cleanedTags];
    }

    // Build new markdown content
    const newContent = `---
title: "${newFrontmatter.title}"
date: ${newFrontmatter.date}
draft: ${newFrontmatter.draft}
tags: [${newFrontmatter.tags.map(t => `"${t}"`).join(', ')}]
type: ${newFrontmatter.type}
slug: "${newFrontmatter.slug}"
---

${cleanedBody}
`;

    // Write to appropriate section
    const outputDir = path.join(CONTENT_DIR, contentType.section);
    if (!fs.existsSync(outputDir)) {
      fs.mkdirSync(outputDir, { recursive: true });
    }

    const outputPath = path.join(outputDir, filename);
    fs.writeFileSync(outputPath, newContent, 'utf-8');

    console.log(`✅ Migrated ${filename} → ${contentType.section}/${filename}`);
    migratedCount++;
  });

  console.log(`\n📊 Migration complete!`);
  console.log(`   Migrated: ${migratedCount} files`);
  console.log(`   Skipped: ${skippedCount} files`);

  // Copy images
  console.log('\n📁 Copying images...');
  const imagesDir = path.join(EXPORT_DIR, 'images');
  if (fs.existsSync(imagesDir)) {
    const photosImagesDir = path.join(STATIC_IMAGES_DIR, 'photos');
    if (!fs.existsSync(photosImagesDir)) {
      fs.mkdirSync(photosImagesDir, { recursive: true });
    }

    const imageFiles = fs.readdirSync(imagesDir);
    imageFiles.forEach(imageFile => {
      const src = path.join(imagesDir, imageFile);
      const dest = path.join(photosImagesDir, imageFile);
      fs.copyFileSync(src, dest);
      console.log(`   Copied ${imageFile}`);
    });

    console.log(`✅ Copied ${imageFiles.length} images`);
  }

  console.log('\n🎉 All done!\n');
}

// Run migration
migrateContent();
