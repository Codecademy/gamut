# AI tooling (Gamut)

Internal home for **Cursor plugins**, **Claude Code plugins**, and related agent tooling. Contents under `examples/` are **reference skeletons**—copy and adapt when starting something new; promote separate copies if they become production plugins.

## Conventions

- **Naming:** Use kebab-case for plugin directories and manifest `name` fields.
- **Review:** Treat changes like other shared engineering standards (PR review, clear purpose in the manifest `description`).
- **Scope:** Keep examples minimal; grow plugins in dedicated folders or repos when they need CI, tests, or release versioning.

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
