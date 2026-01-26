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

**Get started with Gamut design system in your application**

Learn how to set up Gamut including:

- Installing packages (gamut-kit vs individual packages)
- Setting up GamutProvider
- Creating your first components
- Framework integration (Next.js, Vite, CRA)
- Troubleshooting common issues

### 🧩 gamut-components

**Use Gamut React components correctly with proper props and patterns**

Learn how to use Gamut's component library including:

- Layout components (Box, FlexBox, GridBox)
- Typography (Text)
- Interactive components (Tabs, Disclosure, Drawer, Menu)
- Forms (GridForm)
- Navigation (Anchor, Breadcrumbs)
- Utilities (Badge, Tag, Overlay, Popover)

### 🎨 gamut-styling

**Apply Gamut styles, themes, and design tokens using gamut-styles package**

Learn how to style applications with:

- GamutProvider setup
- Design tokens (colors, spacing, typography)
- Emotion styled components
- Variance system
- Responsive styles
- Color modes
- SCSS utilities

### 🎯 gamut-icons

**Use SVG icons from the Gamut icon library correctly**

Learn how to use icons including:

- Finding and importing icons
- Icon props (size, color, etc.)
- Accessibility best practices
- Icon categories and naming conventions

### 🌈 gamut-theming

**Create and customize themes in Gamut design system**

Learn how to work with themes including:

- Available pre-built themes
- Theme structure and tokens
- Creating custom themes
- Color modes (light/dark)
- Accessing theme values in components

### 📝 gamut-forms

**Build accessible forms using Gamut's GridForm components**

Learn how to build forms including:

- GridForm and GridFormInputGroup
- Input types (text, checkbox, radio, file)
- Validation and error handling
- Accessibility best practices
- Integration with react-hook-form

### 🖼️ gamut-illustrations

**Use brand illustrations for empty states, onboarding, and visual storytelling**

Learn how to implement illustrations including:

- 70+ available brand illustrations
- Illustration categories (success, learning, error, etc.)
- Sizing and styling illustrations
- Empty state and onboarding patterns
- Accessibility considerations

### 🎭 gamut-patterns

**Use background patterns and visual textures to enhance your UI designs**

Learn how to use patterns including:

- 28 pattern variations (9 styles × 3 densities + Herringbone)
- Pattern styles (Dots, Waves, Grid, Lines, Stripes, etc.)
- Density levels (Dense, Regular, Loose)
- Background texture and visual interest
- Performance and accessibility best practices

### 🏛️ gamut-advanced-components

**Advanced component patterns, composition techniques, and performance optimization**

Learn advanced techniques including:

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
