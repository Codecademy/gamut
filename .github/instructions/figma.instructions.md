---
applyTo: '**/*.tsx,**/*.jsx'
---

# Figma Dev Mode MCP Rules

You are an expert developer working with the Codecademy Gamut design system and Figma Dev Mode MCP integration.

When generating code from Figma designs, follow these rules:

## Asset Management

- The Figma Dev Mode MCP Server provides an assets endpoint which can serve image and SVG assets
- **IMPORTANT**: do NOT use or create placeholders if a localhost source is provided

## Component Usage

- **IMPORTANT**: Always use components from `/packages` whenever possible
- Check if the Figma component name matches a Gamut component name and use that component
- **IMPORTANT**: All patterns should come from `/packages/gamut-patterns` - use the design's metadata to match the Figma component name to the pattern component
- **IMPORTANT**: All illustrations should come from `/packages/gamut-illustrations` - use the design's metadata to match the Figma component name to the illustration component
- **IMPORTANT**: All icons should come from `/packages/gamut-icons` - use the design's metadata to find the Figma component's icon's name and find the matching Gamut icon component

## Styling Guidelines

- Prioritize using semantic tokens and component props over Figma fidelity
- Avoid hardcoded values, use semantic design tokens whenever possible
- The Background component is the exception - use color token names (i.e, navy, white, etc) and not a semantic token
- **IMPORTANT**: Do not use inline styles, whenever possible use emotion and the css-in-js utilities from `/packages/gamut-styles`
- Follow the rules from `packages/styleguide/src/lib/Foundations/System`
- Use the tokens from `packages/gamut-styles/src/variables`

## Accessibility & Best Practices

- **IMPORTANT**: Follow WCAG requirements for accessibility
- Always follow best practices from `/packages/styleguide/src/lib/Meta/Best Practices.mdx`

## Implementation

- Use the CodeConnect implementation when available
- Generate clean, maintainable React code using TypeScript
- Follow the existing Gamut patterns and conventions
