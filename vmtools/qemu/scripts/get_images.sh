#!/bin/bash

# Define the installation directory for the images
INSTALL_DIR="images"
mkdir -p "$INSTALL_DIR"

# Define the array of URLs and output file names
URLS=(
  "https://cloud-images.ubuntu.com/focal/current/focal-server-cloudimg-amd64.img u2004.qcow2"
  "https://cloud-images.ubuntu.com/minimal/releases/focal/release/ubuntu-20.04-minimal-cloudimg-amd64.img u2004m.qcow2"
  "https://cloud-images.ubuntu.com/jammy/current/jammy-server-cloudimg-amd64.img u2204.qcow2"
  "https://cloud-images.ubuntu.com/minimal/releases/jammy/release/ubuntu-22.04-minimal-cloudimg-amd64.img u2204m.qcow2"
)

# Check if either wget or curl is installed
if command -v wget >/dev/null 2>&1; then
  DOWNLOADER="wget -qO"
elif command -v curl >/dev/null 2>&1; then
  DOWNLOADER="curl -sSL -o"
else
  echo "Error: This script requires either wget or curl to be installed. Please install one of these tools and try again." >&2
  exit 1
fi

# Loop through the URLs and download the files
for item in "${URLS[@]}"; do
  url=$(echo "$item" | awk '{print $1}')
  output=$(echo "$item" | awk '{print $2}')
  output_file="$INSTALL_DIR/$output"

  # Check if the file already exists
  if [ -f "$output_file" ]; then
    echo "Skipping download: File already exists: $output_file"
  else
    echo "Downloading: $output_file from $url"
    $DOWNLOADER "$output_file" "$url"
  fi
done
