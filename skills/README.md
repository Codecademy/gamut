# Gamut Agent Skills

This directory contains agent skills for the Gamut design system. These skills help AI coding agents understand and correctly use Gamut packages in applications.

## What are Agent Skills?

Agent skills are markdown files that provide detailed instructions and context to AI coding agents like OpenCode. They help agents:

- Understand package APIs and patterns
- Make correct implementation choices
- Follow best practices and conventions
- Access comprehensive examples and documentation

## Available Skills

### 🚀 gamut-quickstart

**Set up Gamut design system in your React application**

- Installation (gamut-kit vs individual packages)
- Setting up GamutProvider
- Creating your first components
- Framework integration (Next.js, Vite, CRA)
- Troubleshooting setup issues

### 🧩 gamut-components

**Build UIs with Gamut React components, layouts, and patterns**

- Layout components (Box, FlexBox, GridBox)
- Typography (Text)
- Interactive components (Tabs, Disclosure, Drawer, Menu)
- Forms (GridForm)
- Navigation (Anchor, Breadcrumbs)
- Utilities (Badge, Tag, Overlay, Popover)

### 🎨 gamut-styling

**Style applications with Gamut design tokens and themes**

- GamutProvider setup
- Design tokens (colors, spacing, typography)
- Emotion styled components
- Variance system
- Responsive styles
- Color modes
- SCSS utilities

### 🎯 gamut-icons

**Use 300+ icons from the Gamut icon library**

- Finding and importing icons
- Icon props (size, color, etc.)
- Accessibility best practices
- Icon categories and naming conventions

### 🌈 gamut-theming

**Create and customize themes in the Gamut design system**

- Available pre-built themes
- Theme structure and tokens
- Creating custom themes
- Color modes (light/dark)
- Accessing theme values in components

### 📝 gamut-forms

**Build accessible forms with Gamut GridForm components**

- GridForm and GridFormInputGroup
- Input types (text, checkbox, radio, file)
- Validation and error handling
- Accessibility best practices
- Integration with react-hook-form

### 🖼️ gamut-illustrations

**Implement Gamut brand illustrations for empty states and onboarding**

- 70+ available brand illustrations
- Illustration categories (success, learning, error, etc.)
- Sizing and styling illustrations
- Empty state and onboarding patterns
- Accessibility considerations

### 🎭 gamut-patterns

**Add visual texture with Gamut background patterns**

- 28 pattern variations (9 styles × 3 densities + Herringbone)
- Pattern styles (Dots, Waves, Grid, Lines, Stripes, etc.)
- Density levels (Dense, Regular, Loose)
- Background texture and visual interest
- Performance and accessibility best practices

### 🏛️ gamut-advanced-components

**Advanced patterns, composition, and performance optimization with Gamut**

- Building custom reusable components
- Compound component patterns
- Performance optimization (memoization, lazy loading)
- Advanced styling and theming
- Complex form patterns
- Accessibility-first implementation
- Debugging and testing strategies

## Usage

### For OpenCode Users

These skills are automatically discovered by OpenCode when working in the Gamut repository. Agents can load them on-demand when they need guidance on using Gamut packages.

To use these skills in another project:

1. **Copy or symlink** this `skills` directory to your project
2. **Or configure OpenCode** to reference this directory in your `opencode.json`

```json
{
  "skill": {
    "paths": ["/path/to/gamut/skills"]
  }
}
```

### For Other AI Agents

These skills follow the standard SKILL.md format and can be used with any AI agent that supports:

- OpenCode
- Claude Desktop (via `.claude/skills/`)
- Other agents supporting the skill definition format

## Skill Format

Each skill is a directory containing a `SKILL.md` file with:

```markdown
---
name: skill-name
description: Brief description for discovery
license: MIT
compatibility: opencode
metadata:
  package: '@codecademy/package-name'
  audience: developers
---

## What I do

[Detailed description of what the skill helps with]

## When to use me

[When to load this skill]

## Key concepts

[Main concepts and patterns]

...
```

## Contributing

To add a new skill:

1. Create a new directory: `skills/skill-name/`
2. Add a `SKILL.md` file following the format above
3. Ensure the skill name is lowercase with hyphens
4. Provide comprehensive examples and patterns
5. Include accessibility and best practices

## License

MIT - Same as Gamut packages

## Related Documentation

- [Gamut Repository](https://github.com/Codecademy/gamut)
- [OpenCode Agent Skills Documentation](https://opencode.ai/docs/skills/)
- [Gamut Storybook](https://gamut.codecademy.com/)
