#!/bin/bash
set -euo pipefail

# Only run in Claude Code on the web
if [ "${CLAUDE_CODE_REMOTE:-}" != "true" ]; then
  exit 0
fi

# Change to project directory
cd "${CLAUDE_PROJECT_DIR:-$(dirname "$(dirname "$(dirname "$(realpath "$0")")")")}"

# Install Bun dependencies
echo "Installing Bun dependencies..."
if bun install; then
  echo "Dependencies installed successfully"
else
  echo "Warning: bun install failed, but continuing..."
fi

# Install GitHub CLI if not already installed
if ! command -v gh &> /dev/null; then
  echo "Installing GitHub CLI..."

  # Try installing via apt first (preferred method)
  if curl -fsSL https://cli.github.com/packages/githubcli-archive-keyring.gpg | sudo dd of=/usr/share/keyrings/githubcli-archive-keyring.gpg 2>/dev/null && \
     sudo chmod go+r /usr/share/keyrings/githubcli-archive-keyring.gpg && \
     echo "deb [arch=$(dpkg --print-architecture) signed-by=/usr/share/keyrings/githubcli-archive-keyring.gpg] https://cli.github.com/packages stable main" | sudo tee /etc/apt/sources.list.d/github-cli.list > /dev/null && \
     sudo apt update && \
     sudo apt install gh -y; then
    echo "GitHub CLI installed successfully via apt"
  else
    # Fallback: Download binary directly
    echo "Apt installation failed, trying binary download..."
    GH_VERSION="2.45.0"
    ARCH=$(dpkg --print-architecture)

    # Download and extract
    cd /tmp
    curl -fsSL "https://github.com/cli/cli/releases/download/v${GH_VERSION}/gh_${GH_VERSION}_linux_${ARCH}.tar.gz" -o gh.tar.gz
    tar -xzf gh.tar.gz
    sudo mv "gh_${GH_VERSION}_linux_${ARCH}/bin/gh" /usr/local/bin/
    sudo chmod +x /usr/local/bin/gh
    rm -rf gh.tar.gz "gh_${GH_VERSION}_linux_${ARCH}"

    if command -v gh &> /dev/null; then
      echo "GitHub CLI installed successfully via binary download"
    else
      echo "Warning: GitHub CLI installation failed"
    fi
  fi
else
  echo "GitHub CLI already installed"
fi

echo "Session setup complete!"
