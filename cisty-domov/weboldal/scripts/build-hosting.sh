#!/usr/bin/env bash
# Builds the site for ordinary web hosting (Apache + PHP, e.g. Websupport).
#
#   npm run build:hosting
#
# Output: dist/hosting/ — copy everything inside it (including the hidden
# .htaccess) into the hosting's web root (public_html / www).
#
# The static export cannot carry the API route or the locale proxy, so the
# build runs on a copy without them: the form posts to contact.php instead,
# and the root index.html picks the language in the browser.
set -euo pipefail
cd "$(dirname "$0")/.."

WORK="$(mktemp -d)"
trap 'rm -rf "$WORK"' EXIT

cp -r src public package.json tsconfig.json postcss.config.mjs next.config.ts "$WORK/"
cp -al node_modules "$WORK/node_modules" 2>/dev/null || cp -R node_modules "$WORK/node_modules"
rm -rf "$WORK/src/app/api" "$WORK/src/proxy.ts"

(cd "$WORK" && STATIC_EXPORT=1 NEXT_PUBLIC_CONTACT_ENDPOINT=/contact.php npx next build)

rm -rf dist/hosting
mkdir -p dist
cp -R "$WORK/out" dist/hosting
cp hosting/index.html hosting/.htaccess hosting/contact.php dist/hosting/

# The form's recipient and the sender's domain, from lib/site.ts.
EMAIL="$(sed -n 's/^export const EMAIL = "\([^"]*\)".*/\1/p' src/lib/site.ts)"
sed -i.bak "s/__TO_EMAIL__/$EMAIL/" dist/hosting/contact.php
rm dist/hosting/contact.php.bak

echo "Ready: dist/hosting/  (recipient: $EMAIL)"
