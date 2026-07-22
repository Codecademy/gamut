# AI tooling (Gamut)

Internal home for **Cursor plugins**, **Claude Code plugins**, and related agent tooling. Contents under `examples/templates/` are **reference templates**—copy and adapt when starting something new; promote separate copies if they become production plugins. These are **not** published or distributed through Cursor or Claude Code marketplaces; they exist only as in-repo starting points.

## Conventions

- **Naming:** Use kebab-case for plugin directories and manifest `name` fields.
- **Review:** Treat changes like other shared engineering standards (PR review, clear purpose in the manifest `description`).
- **Scope:** Keep examples minimal; grow plugins in dedicated folders or repos when they need CI, tests, or release versioning.

## Claude Code and these templates

Use a copied template with **`--plugin-dir`** pointing at the plugin folder (for example `examples/templates/claude-plugin` while experimenting in this repo). See [Claude Code — Create plugins](https://code.claude.com/docs/en/plugins).

We are **not** planning to distribute these templates through a plugin marketplace. If you later publish your own plugin, see Anthropic’s docs for [plugin marketplaces](https://code.claude.com/docs/en/plugin-marketplaces); that is separate from these Gamut reference templates.

The Claude template includes a minimal `.claude-plugin/marketplace.json` **only** so the optional Gamut `install-plugin` helper can resolve a local `plugin@marketplace` spec when registering this directory with the Claude CLI on your machine. It does **not** imply publishing or listing these templates anywhere.

## Validate manifests

From the repository root:

```bash
npx nx run ai-tools:validate
```

This parses each example `plugin.json` so broken JSON is caught early.

## Further reading

### Official documentation

- [Cursor — Plugins reference](https://cursor.com/docs/reference/plugins)
- [Claude Code — Create plugins](https://code.claude.com/docs/en/plugins)
- [Claude Code — Plugins reference (Anthropic docs)](https://docs.anthropic.com/en/docs/claude-code/plugins-reference)
- [Nx — Introduction](https://nx.dev/docs/getting-started/intro)
- [Nx — Crafting your workspace](https://nx.dev/docs/getting-started/tutorials/crafting-your-workspace)

### Reference repositories

- [cursor/plugins](https://github.com/cursor/plugins) — Spec, marketplace layout, multiple plugins in one repository
- [cursor/plugin-template](https://github.com/cursor/plugin-template) — Scaffold for single- and multi-plugin repos
- [planetscale/cursor-plugin](https://github.com/planetscale/cursor-plugin) — Third-party plugin example (skills, MCP-oriented patterns)
- [anthropics/claude-plugins-official](https://github.com/anthropics/claude-plugins-official) — Official Claude Code plugin catalog (`plugins/`, `external_plugins/`)
- [anthropics/claude-plugins-official — example-plugin](https://github.com/anthropics/claude-plugins-official/tree/main/plugins/example-plugin) — Reference plugin layout
- [modelcontextprotocol/servers](https://github.com/modelcontextprotocol/servers) — MCP server reference implementations

### Monorepo structure

- [Nx — Virtuous cycle of workspace structure](https://nx.dev/blog/virtuous-cycle-of-workspace-structure)
