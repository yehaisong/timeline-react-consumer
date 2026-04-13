#!/usr/bin/env bash

set -euo pipefail

ROOT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"
LIB_DIR="${ROOT_DIR}/../timeline-react"
VENDOR_DIR="${ROOT_DIR}/vendor/historical-timeline-react"

if [[ ! -d "${LIB_DIR}" ]]; then
  echo "Missing library repo at ${LIB_DIR}" >&2
  exit 1
fi

echo "Building library from ${LIB_DIR}"
npm --prefix "${LIB_DIR}" run build

echo "Refreshing vendored package in ${VENDOR_DIR}"
rm -rf "${VENDOR_DIR}"
mkdir -p "${VENDOR_DIR}/dist"

cp "${LIB_DIR}/LICENSE" "${VENDOR_DIR}/LICENSE"
cp "${LIB_DIR}/README.md" "${VENDOR_DIR}/README.md"
cp -r "${LIB_DIR}/dist/." "${VENDOR_DIR}/dist/"

cat > "${VENDOR_DIR}/package.json" <<'EOF'
{
  "name": "historical-timeline-react",
  "version": "0.0.1",
  "license": "MIT",
  "type": "module",
  "main": "./dist/index.js",
  "module": "./dist/index.js",
  "types": "./dist/index.d.ts",
  "files": [
    "dist"
  ],
  "exports": {
    ".": {
      "types": "./dist/index.d.ts",
      "import": "./dist/index.js"
    },
    "./styles.css": "./dist/styles.css"
  },
  "peerDependencies": {
    "react": "^19.2.0",
    "react-dom": "^19.2.0"
  }
}
EOF

echo "Vendored package updated."
