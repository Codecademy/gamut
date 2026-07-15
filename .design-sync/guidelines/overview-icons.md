# Icons

Icons must come from `@codecademy/gamut-icons`. Do not import or generate icons from any other source. If a needed icon is unavailable, leave a placeholder annotation rather than substituting a non-system asset.

## Identifying the correct icon

**Do not rely on Figma layer names (`data-name`).** Figma does not update them when icons are swapped, so layer names like `"Mini/MiniDeleteIcon"` or `"Regular/Interface/SearchIcon"` are frequently stale.

Determine the correct icon by:

1. **Reading the design image** — visually identify the shape (three vertical dots = kebab menu, 3×3 grid = app switcher, etc.).
2. **Using contextual clues** — tooltip text (e.g., "Show options" → `MiniKebabMenuIcon`), element purpose (e.g., app switcher → `LayoutModuleAltIcon`), surrounding UI patterns.
3. **Cross-referencing the full export list** — see `components/icons.md` for all 371 icon names (335 Regular + 36 Mini), grouped by family — do not guess at names or introspect `window.CodecademyGamut` at runtime to find them.
4. **Treating layer names as hints only** — if a layer name conflicts with visual/contextual evidence, trust the evidence.
5. **When uncertain**, flag for confirmation rather than guessing.

Before using any icon, confirm the exact name exists in `components/icons.md`. If not, pick the closest match rather than inventing a name.
