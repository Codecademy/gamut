# AI tooling — reference map

Consolidated index of **in-repo** agent tooling and **external** documentation. Start with [AGENTS.md](../AGENTS.md) for the short index; this page is for navigation and onboarding.

## Internal paths (repository)

| Asset                                 | Path                                                                                                                                                                                                             |
| ------------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Agent index (start here)              | [AGENTS.md](../AGENTS.md)                                                                                                                                                                                        |
| Agent docs hub + conventions          | [README.md](./README.md)                                                                                                                                                                                         |
| This reference map                    | [references.md](./references.md)                                                                                                                                                                                 |
| GitHub URL source of truth            | [canonical-urls.json](./canonical-urls.json)                                                                                                                                                                     |
| Monorepo skill manifest               | [monorepo-skills.manifest.json](./monorepo-skills.manifest.json)                                                                                                                                                 |
| Library authoring (long form)         | [gamut-library-authoring.md](./gamut-library-authoring.md)                                                                                                                                                       |
| Consumer / a11y / theming / Figma     | [gamut-consumer.md](./gamut-consumer.md), [gamut-accessibility.md](./gamut-accessibility.md), [gamut-theming.md](./gamut-theming.md), [figma-from-design.md](./figma-from-design.md)                             |
| Cursor project rules                  | [gamut-library.mdc](../../.cursor/rules/gamut-library.mdc), [gamut-component-building.mdc](../../.cursor/rules/gamut-component-building.mdc), [gamut-figma-rules.mdc](../../.cursor/rules/gamut-figma-rules.mdc) |
| Monorepo library skill (generated)    | [SKILL.md](../../.cursor/skills/gamut-library-authoring/SKILL.md)                                                                                                                                                |
| Cursor MCP (Figma)                    | [mcp.json](../../.cursor/mcp.json)                                                                                                                                                                               |
| **`gamut`** plugin root               | [README.md](../../packages/agent-plugin/README.md)                                                                                                                                                               |
| Plugin manifests                      | [plugin.json](../../packages/agent-plugin/.cursor-plugin/plugin.json) (Cursor), [plugin.json](../../packages/agent-plugin/.claude-plugin/plugin.json) (Claude)                                                   |
| Plugin skills manifest                | [skills.manifest.json](../../packages/agent-plugin/skills/skills.manifest.json)                                                                                                                                  |
| Plugin rules                          | [rules/](../../packages/agent-plugin/rules/)                                                                                                                                                                     |
| Skill generator                       | [generate-skills.mjs](../../packages/agent-plugin/scripts/generate-skills.mjs)                                                                                                                                   |
| Team marketplace                      | [marketplace.json](../../.cursor-plugin/marketplace.json)                                                                                                                                                        |
| Validator                             | [validate-agent-plugins.mjs](../../.github/scripts/validate-agent-plugins.mjs)                                                                                                                                   |
| Workflow                              | [cursor-plugins.yml](../../.github/workflows/cursor-plugins.yml)                                                                                                                                                 |
| Old plugins breadcrumb                | [README.md](../../gamut-cursor-plugins/README.md)                                                                                                                                                                |
| Storybook source: building components | [Building components in Gamut.mdx](../../packages/styleguide/src/lib/Meta/Gamut%20writing%20guide/Stories/Building%20components%20in%20Gamut.mdx)                                                                |
| Storybook source: Figma MCP           | [Figma MCP.mdx](../../packages/styleguide/src/lib/Meta/MCP/Figma%20MCP.mdx)                                                                                                                                      |

### Commands (from repository root)

- `yarn generate:agent-skills` — regenerate packaged and monorepo `SKILL.md` files (see [package.json](../../package.json))
- `node .github/scripts/validate-agent-plugins.mjs` — validate marketplace, plugin layout, monorepo `.cursor` rules/skills
- `yarn test:agent-plugins-validator` — unit tests for validator helpers

### Nx

[agent-plugin project.json](../../packages/agent-plugin/project.json) is included in the Nx graph. **`agent-plugin` is excluded from `nx release`** (not an npm package); see `release.projects` in [nx.json](../../nx.json).

---

## External documentation (vendor / product)

| Topic                                    | URL                                                                                                                             |
| ---------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------- |
| Codecademy Gamut Storybook               | https://gamut.codecademy.com/                                                                                                   |
| Cursor plugins                           | https://cursor.com/docs/plugins                                                                                                 |
| Cursor plugin reference (metadata)       | https://cursor.com/docs/reference/plugins.md                                                                                    |
| Claude Code plugins                      | https://code.claude.com/docs/en/plugins                                                                                         |
| Claude plugin manifest (field reference) | https://github.com/anthropics/claude-code/blob/main/plugins/plugin-dev/skills/plugin-structure/references/manifest-reference.md |
| Figma Dev Mode MCP                       | https://help.figma.com/hc/en-us/articles/32132100833559-Guide-to-the-Dev-Mode-MCP-Server                                        |
| Figma desktop                            | https://www.figma.com/downloads/                                                                                                |
| Gamut on GitHub (`main`)                 | See [canonical-urls.json](./canonical-urls.json) for `githubRepo`, `docsAgentsTreeOnMain`, and `docsAgentsBlobBaseOnMain`       |
