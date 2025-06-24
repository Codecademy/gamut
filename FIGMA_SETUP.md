# Figma Dev Mode MCP Server Setup

This repository is configured to use the Figma Dev Mode MCP server locally. This allows you to extract designs, code, and assets directly from Figma within Cursor.

## Setup Instructions

### 1. Install Dependencies

```bash
yarn install
```

This will install the `@figma/mcp-server` package that's configured in the `devDependencies`.

### 2. Get Your Figma Access Token

1. Go to [Figma Settings > Personal Access Tokens](https://www.figma.com/developers/api#access-tokens)
2. Click "Create new personal access token"
3. Give it a descriptive name (e.g., "Gamut Repository MCP")
4. Copy the generated token

### 3. Configure the Token

You have two options to provide your Figma access token:

#### Option A: Environment Variable (Recommended)

Set the environment variable in your shell:

```bash
export FIGMA_ACCESS_TOKEN="your_figma_access_token_here"
```

Or add it to your shell profile (`~/.zshrc`, `~/.bashrc`, etc.):

```bash
echo 'export FIGMA_ACCESS_TOKEN="your_figma_access_token_here"' >> ~/.zshrc
source ~/.zshrc
```

#### Option B: Update MCP Configuration

Edit `.cursor/mcp.json` and replace the empty token:

```json
{
  "mcpServers": {
    "figma": {
      "command": "npx",
      "args": ["@figma/mcp-server"],
      "env": {
        "FIGMA_ACCESS_TOKEN": "your_figma_access_token_here"
      }
    }
  }
}
```

### 4. Restart Cursor

After configuring the token, restart Cursor to load the MCP server.

## Usage

Once configured, you can:

1. **Extract designs from Figma**: Select elements in Figma and use the MCP tools to get code
2. **Get design specifications**: Extract colors, spacing, typography from Figma designs
3. **Generate components**: Create React components based on Figma designs

The MCP server will be available in Cursor's chat interface when working in this repository.

## Troubleshooting

### MCP Server Not Loading

- Ensure your Figma access token is valid
- Check that the token has the necessary permissions
- Restart Cursor after making configuration changes

### Token Issues

- Verify the token is correctly set in the environment or configuration
- Make sure there are no extra spaces or quotes in the token
- Generate a new token if the current one isn't working

## Configuration Files

- `.cursor/mcp.json` - Local MCP server configuration for this repository
- `package.json` - Contains the `@figma/mcp-server` dependency

This setup is local to this repository and won't affect your global Cursor configuration.
