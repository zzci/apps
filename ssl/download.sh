#!/bin/sh
# Download mkcert binary for the current platform
set -e

OS=$(uname -s | tr '[:upper:]' '[:lower:]')
ARCH=$(uname -m)
case "$ARCH" in
  x86_64) ARCH="amd64" ;;
  aarch64|arm64) ARCH="arm64" ;;
esac

VERSION=$(curl -fsSL https://api.github.com/repos/FiloSottile/mkcert/releases/latest | grep tag_name | cut -d '"' -f 4)
URL="https://github.com/FiloSottile/mkcert/releases/download/${VERSION}/mkcert-${VERSION}-${OS}-${ARCH}"

echo "Downloading mkcert ${VERSION} for ${OS}-${ARCH}..."
curl -fsSL -o mkcert "$URL"
chmod +x mkcert
echo "Done: ./mkcert"
