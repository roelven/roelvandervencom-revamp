#!/bin/bash
set -e

SITE_DIR="$(cd "$(dirname "$0")" && pwd)"
REMOTE_HOST="docker-host"  # SSH config alias
REMOTE_PATH="/docker/volumes/roelvanderven.com/public"

cd "$SITE_DIR"

echo "🔨 Building site with Hugo..."
hugo --minify

echo ""
echo "📦 Deploying to homelab..."
# Use scp -r to copy files (rsync not available on server)
ssh "$REMOTE_HOST" "rm -rf $REMOTE_PATH/*"
scp -r public/* "$REMOTE_HOST:$REMOTE_PATH/"

echo ""
echo "✅ Published to roelvanderven.com"
echo "🌐 Site should be available at https://roelvanderven.com"
