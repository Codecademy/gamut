# Coding agent instructions (Gamut)

This repository ships shared guidance for **coding agents and assistants** (Cursor, Claude Code, Copilot, and similar tools). Human-readable contributor docs also live in Storybook under `packages/styleguide`.

## Canonical reference

Detailed, tool-agnostic guides:

| Topic                                   | Document                                                                         |
| --------------------------------------- | -------------------------------------------------------------------------------- |
| Design system authoring (this monorepo) | [docs/agents/gamut-library-authoring.md](docs/agents/gamut-library-authoring.md) |
| Consuming Gamut in applications         | [docs/agents/gamut-consumer.md](docs/agents/gamut-consumer.md)                   |
| Accessibility                           | [docs/agents/gamut-accessibility.md](docs/agents/gamut-accessibility.md)         |
| ColorMode, Background, themes           | [docs/agents/gamut-theming.md](docs/agents/gamut-theming.md)                     |
| Figma → code (Gamut)                    | [docs/agents/figma-from-design.md](docs/agents/figma-from-design.md)             |

Browse on GitHub: [docs/agents on `main`](https://github.com/Codecademy/gamut/tree/main/docs/agents) (same files as in this clone; URL source of truth: [docs/agents/canonical-urls.json](docs/agents/canonical-urls.json)). Folder hub: [docs/agents/README.md](docs/agents/README.md).

## When you are in this monorepo

- Library work: follow **gamut-library-authoring** and the project rules under [`.cursor/rules/`](.cursor/rules/) when your environment loads them (e.g. Cursor).
- Optional packaged rules/skills for editors: [`packages/agent-plugin/`](packages/agent-plugin/) (plugin name **`gamut`**) with Cursor and Claude manifests.
- **Figma MCP (local):** team default for Cursor lives in [`.cursor/mcp.json`](.cursor/mcp.json). Setup, verification, and prompts are documented in Storybook under **Meta → MCP → Figma MCP** ([source `Figma MCP.mdx`](packages/styleguide/src/lib/Meta/MCP/Figma%20MCP.mdx)). Any MCP-capable client can use the same Figma server URL; do not commit secrets or personal MCP credentials into tracked config.

## When you are in an application repo

- Use the **`gamut`** agent plugin (or open the same markdown files on GitHub under `docs/agents/`) for consumption, accessibility, and theming guidance.
- Do not apply library-authoring workflows meant only for the Gamut source tree.
