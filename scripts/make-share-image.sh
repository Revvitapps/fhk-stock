#!/bin/bash
# Captures /share-card from a running production server into the link-preview images.
# Usage: scripts/make-share-image.sh [base-url]   (default http://localhost:3218)
set -euo pipefail
BASE="${1:-http://localhost:3218}"
ROOT="$(cd "$(dirname "$0")/.." && pwd)"
CHROME="/Applications/Google Chrome.app/Contents/MacOS/Google Chrome"
TMP="$(mktemp -d)"

# First pass warms the image optimizer so the second capture has every photo painted.
# Headless Chrome can linger after writing the screenshot, so each pass gets a hard limit.
for pass in 1 2; do
  perl -e 'alarm 40; exec @ARGV' "$CHROME" --headless=new --disable-gpu --hide-scrollbars \
    --force-device-scale-factor=2 --window-size=1200,630 --user-data-dir="$TMP/profile" \
    --screenshot="$TMP/card@2x.png" "$BASE/share-card" >/dev/null 2>&1 || true
done
[ -s "$TMP/card@2x.png" ] || { echo "capture failed" >&2; exit 1; }

python3 - "$TMP/card@2x.png" "$ROOT/apps/web/app" <<'PY'
import sys
from PIL import Image
src, out = sys.argv[1], sys.argv[2]
im = Image.open(src).convert("RGB").resize((1200, 630), Image.LANCZOS)
im.save(f"{out}/opengraph-image.png", optimize=True)
im.save(f"{out}/twitter-image.png", optimize=True)
print("wrote", im.size)
PY
rm -rf "$TMP"
