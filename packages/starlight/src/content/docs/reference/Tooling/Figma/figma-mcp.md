---
title: Figma MCP
description: Set up the Figma MCP to enable design-to-code generation, exclusive to Codecademy + Skillsoft employees.
---

MCP-generated code is experimental — always validate and adapt it to your own needs rather than shipping it directly. Using the Figma MCP requires a Dev or Full Figma account.

This page adapts Figma's own [Dev Mode MCP documentation](https://help.figma.com/hc/en-us/articles/32132100833559-Guide-to-the-Dev-Mode-MCP-Server) and [remote server installation guide](https://developers.figma.com/docs/figma-mcp-server/remote-server-installation/) to the Gamut repository's context — refer to those directly for the most current information.

## Remote server (recommended)

Connects directly to Figma's hosted MCP server at `https://mcp.figma.com/mcp`, authenticated via Figma OAuth — no need to install or run the Figma desktop app.

### Cursor

1. Open Cursor Settings (`Cmd+Shift+J`).
2. Select **Plugins** in the sidebar.
3. Search for "Figma" and click **Add to Cursor**.
4. Select **Add for myself** and complete authentication.

Cursor uses `git` to install plugins — you may be prompted to install it if it's not already on your machine.

### Claude Code (terminal)

```bash
claude mcp add --scope user --transport http figma https://mcp.figma.com/mcp
```

Then, inside a session, run `/mcp` to authenticate, and again to confirm the Figma server is connected.

### Claude Desktop

1. Click **Code** in the left nav.
2. Click **Customize**.
3. Click **Connectors**.
4. Search for "Figma" and click **Connect**.
5. Accept the terms.
6. Configure tool permissions as needed.

## Prompting your MCP client

Either link directly to a design node:

> Generate the code for this node: https://www.figma.com/design/...

or select the node in Figma and ask for the current selection:

> Generate the code for the current selection

You may be prompted to allow commands like `get_code()` to run — these can also be added to your editor's allowlist.

## Local server (alternative)

Requires the Figma desktop app running in the background, and is more limited in what an agent can do. Download it from [Figma's downloads page](https://www.figma.com/downloads/).

### Start the local server

1. Enable Dev Mode in the Figma desktop client.
2. Open the "MCP server" section in the right-hand sidebar.
3. Open its settings modal and toggle the status on — or, from the Figma icon menu, choose **Actions** → "Enable desktop MCP server" and check the box.

### Configure your editor

**Cursor** — Settings → Cursor Settings → MCP → **+ Add MCP server**:

```json
{
  "mcpServers": {
    "Figma": { "url": "http://127.0.0.1:3845/mcp" }
  }
}
```

**Claude Code**:

```bash
claude mcp add --scope user --transport http figma http://127.0.0.1:3845/mcp
```

### Verifying the local server

Visit `http://127.0.0.1:3845/mcp` in a browser — a response like `{"jsonrpc":"2.0","error":{"code":-32001,"message":"Invalid sessionId"},"id":null}` confirms it's running.

## Feedback

Share feedback with the Gamut team — a new rule you'd like implemented, support for another editor, or incorrect code generation.
