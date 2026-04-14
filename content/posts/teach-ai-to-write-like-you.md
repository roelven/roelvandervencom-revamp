---
title: "Teach AI to write like you (not like everyone else)"
date: 2026-01-29T12:00:00.000Z
draft: false
tags: ["ai", "writing", "productivity", "voice profile"]
type: article
slug: "teach-ai-to-write-like-you"
---

Every time I ask an LLM to draft something for me, there's a version of the output that reads like it was written by a committee of consultants who all attended the same TED talk. You know the voice: punchy, agreeable, decorated with em dashes, and somehow both confident and saying nothing at all.

That's the default. And for a while I accepted it, because editing AI output into something that sounds like me was still faster than writing from scratch. But it's a tax. Every draft needs the same corrections: strip the buzzwords, collapse the dramatic one-liners, ground the abstractions in something real. At some point the pattern becomes hard to ignore.

So I built a voice profile. A structured document that captures how I write, what I avoid, and the underlying philosophy that shapes my tone. I feed it to Claude, Cursor, Gemini, whatever I'm using. And the difference is significant enough that I haven't gone back.

## What a voice profile actually is

It's not a style guide and it's not a list of favorite words. A voice profile captures the *how* and *why* behind your writing at multiple levels: emotional positioning, sentence rhythm, philosophical lens, language register, and hard rules. The goal is to give an LLM enough signal to produce output that sounds like you wrote it on a good day, not output that sounds like it memorized your vocabulary.

The distinction matters. If you just hand an LLM a list of words you like, it'll stuff them into every sentence. If you describe the *type* of language you use, the register, the level of formality, how you handle certainty and uncertainty, it adapts more naturally.

A good voice profile has a few layers:

- **Emotional architecture**: How confident are you? How do you handle difficulty? Where do you land on the optimism spectrum?
- **Sentence rhythm**: Not a formula, but tendencies. Do you favor short openers? Long explanations? Groups of three?
- **Philosophical lens**: How do you frame subjects? As systems? Stories? Arguments? What metaphor families show up in your writing?
- **Language characteristics**: Formality level, how you ground abstractions, what you actively avoid.
- **Hard rules**: Absolute prohibitions. Mine include never using em dashes and never using staccato contrast pairs (those two-sentence dramatic inversions that manufacture profundity through rhythm instead of substance).
- **Anti-patterns**: A table of failure modes. What does your voice sound like when it goes wrong? This is surprisingly useful, because it gives the model clear boundaries.

## How to create yours

I've published [the full extraction prompt as a GitHub Gist](https://gist.github.com/roelven/53d497d4361f7c938533dee06e1a4fa4). The process works like this:

**1. Gather your writing.** You need at least five long-form documents. Strategy docs, RFCs, product briefs, internal memos, anything where you were writing in your natural voice. Blog posts work too, but professional documents tend to reveal patterns you don't notice in polished public writing. The more variety in format and audience, the better the profile will be.

**2. Feed everything to a capable model.** Use Claude, GPT-4, Gemini, whatever you have access to with a large enough context window. Paste in the extraction prompt from the Gist, then provide your documents. The prompt walks the model through a structured analysis across five dimensions: structural patterns, sentence-level patterns, emotional architecture, philosophical lens, and language characteristics.

**3. Review what comes back.** The model will generate a full profile with your core identity, emotional architecture, sentence rhythm, philosophical lens, contextual elements, language characteristics, underlying philosophy, anti-patterns, a self-evaluation rubric, and an instruction template. Read it carefully. Does it feel like you? The anti-patterns table is especially worth scrutinizing, because that's where you'll spot the failure modes that would make output feel inauthentic.

**4. Iterate.** Your first profile will be roughly right but not sharp. Run a few test generations with it and see where the output drifts. Tighten the areas that need it, remove anything that's producing mechanical behavior, and add hard rules for patterns you keep having to correct.

## How to apply it

This is the part where it becomes a daily tool rather than an interesting exercise.

**In Claude Code**, save your voice profile as a memory file or include it in your project's CLAUDE.md. Every time you ask Claude to write something, it references the profile automatically. I use mine whenever I'm drafting notes, producing reports, or writing blog posts (this one included).

**In Cursor**, you can add your voice profile to your project rules or user rules. Any AI-assisted writing in the editor will pick it up.

**In Gemini**, create a Gem with your voice profile as the system instruction. You can then use that Gem specifically for writing tasks.

**In ChatGPT**, you can paste it into your custom instructions or create a dedicated GPT with the profile baked in.

The pattern is the same everywhere: make the profile available as persistent context so you don't have to paste it into every conversation.

## What changes when you use one

The obvious benefit is that drafts require less editing. But the less obvious benefit is what it does to your relationship with AI-assisted writing. When the output already sounds like you, you stop spending cognitive energy on tone correction and start spending it on substance. You're editing for accuracy and completeness, not for voice. That's a different kind of editing, and it's faster.

I've been using my voice profile daily for a few months now, across Claude and Cursor primarily. It saves me hours of time and, more importantly, it enables me to distribute my thinking a lot faster than before. When I need to produce a report, draft a blog post, or write up notes from a meeting, the first draft is already in my voice. The iteration cycle goes from "rewrite this so it doesn't sound like a chatbot" to "sharpen this argument."

There's also a useful side effect: building the profile forces you to articulate things about your writing that you probably haven't made explicit before. I didn't realize how strongly I felt about staccato contrast pairs until I saw the model producing them and noticed my consistent negative reaction. Now it's a hard rule. That kind of self-knowledge compounds across every piece of writing you do, AI-assisted or not.

## A word about what this isn't

A voice profile doesn't replace judgment. It captures tone and philosophy, not substance. You still need to know what you want to say. The profile ensures that when you say it through an LLM, it sounds like you said it, not like a language model's median impression of a professional writer.

It also isn't static. I update mine when I notice new patterns or when my writing evolves. The profile I'm using today is already different from the one I started with. That's the right behavior: it's a living document that tracks how you think and write, and both of those things change over time.

If you're using AI to write anything that carries your name, this is worth the afternoon it takes to set up. The [extraction prompt is here](https://gist.github.com/roelven/53d497d4361f7c938533dee06e1a4fa4). Start with your best documents and let the model do the analysis. You'll be surprised by what it finds.
