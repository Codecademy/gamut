---
applyTo: '**'
priority: high
---

# Figma Dev Mode MCP Rules

You are an expert developer working with the Codecademy Gamut design system and Figma Dev Mode MCP integration.

When generating code from Figma designs, follow these rules:

## WORKFLOW TRIGGER - CRITICAL

**When you see ANY of these patterns:**

- Figma URL mentioned (figma.com/design/...)
- nodeId provided
- "generate from figma" or similar requests
- MCP Figma server is being used

## MANDATORY Pre-Generation Steps

**BEFORE generating ANY code from Figma, you MUST:**

1. **Inspect the Figma layer hierarchy**:

   - Call `get_metadata` WITH the nodeId to get parent component info
   - Call `get_metadata` WITHOUT nodeId (empty string) to attempt to get CHILD layers
   - **IMPORTANT**: Current limitation - `get_metadata` may not return nested child layer names (icons, nested components, etc.)
   - **If child layer names are not available from tooling:**
     - Analyze the screenshot and make your best guess about which icons/nested components are used
     - Look for visual clues (user icon, gear icon, etc.) and match them to likely Gamut icon names
     - Search the codebase to verify the icon exists (e.g., check for `PersonIcon`, `GearIcon`, etc. in `/packages/gamut-icons/src`)
     - Generate the code using your best guess
     - **AFTER generating the code**, ask the user to confirm the icons are correct
     - Example: "I've generated the code using PersonIcon and GearIcon based on what I see in the screenshot. Can you confirm these are the correct icons from the Figma layers?"
   - Map icon layer names to components in the codebase (e.g., "Regular/Interface/PersonIcon" → `PersonIcon`, "Mini/MiniCheckCircleIcon" → `MiniCheckCircleIcon`)

2. **Read token files** (use read_file tool on ALL of these):

   - `/packages/gamut-styles/src/variables/spacing.ts`
   - `/packages/gamut-styles/src/variables/colors.ts`
   - `/packages/gamut-styles/src/variables/typography.ts`
   - `/packages/gamut-styles/src/variables/borderRadii.ts`

3. **Search for existing components** (use codebase_search):

   - Check if similar component exists in `/packages/gamut/src`
   - If exists, extend it instead of creating new one

4. **Understand the design system patterns**:
   - Read example components like Badge, Tag, or Button
   - Follow variance, system props, and styledOptions patterns

## Asset Management

- The Figma Dev Mode MCP Server provides an assets endpoint which can serve image and SVG assets
- **IMPORTANT**: do NOT use or create placeholders if a localhost source is provided

## Component Usage

- **IMPORTANT**: Always use components from `/packages` whenever possible
- Check if the Figma component name matches a Gamut component name and use that component
- **IMPORTANT**: All patterns should come from `/packages/gamut-patterns` - use the design's metadata to match the Figma component name to the pattern component
- **IMPORTANT**: All illustrations should come from `/packages/gamut-illustrations` - use the design's metadata to match the Figma component name to the illustration component
- **IMPORTANT**: All icons should come from `/packages/gamut-icons`:
  - Try to get icon layer names from Figma metadata
  - If layer names are not available, make your best guess based on the screenshot and verify the icon exists in the codebase
  - Generate the code with your best guess, then confirm with the user after
  - Map icon layer names to Gamut components (e.g., "Regular/Interface/PersonIcon" → `PersonIcon` from `@codecademy/gamut-icons`)

## Styling Guidelines - STRICT RULES

### ❌ NEVER Do This:

```tsx
// NEVER use hardcoded pixel values
height: 24,
width: '64px',
fontSize: 14,

// NEVER use hardcoded hex colors
color: '#ffffff',
backgroundColor: '#000000',

// NEVER use CSS properties not in system props
backdropFilter: 'blur(1px)',

// NEVER use inline styles
style={{ fontSize: 14 }}
```

### ✅ ALWAYS Do This:

```tsx
// ALWAYS use spacing tokens (4, 8, 12, 16, 24, 32, 40, 48, 64, 96)
height: 24,  // from spacing.ts
width: 64,   // from spacing.ts

// ALWAYS use fontSize tokens (14, 16, 18, 20, 22, 26, 34, 44, 64)
fontSize: 14,  // from typography.ts

// ALWAYS use borderRadii tokens (none, sm, md, lg, xl, full)
borderRadius: 'full',  // from borderRadii.ts

// ALWAYS use semantic color tokens
bg: 'background',
color: 'text',
borderColor: 'border',

// ALWAYS use system props via system.css or styled components
system.css({
  bg: 'black',
  color: 'white',
  borderRadius: 'full',
})
```

### Token Mapping Rules:

1. **Spacing/Sizing**: Map Figma values to closest token from `spacing.ts`

   - 4px, 8px, 12px, 16px, 24px, 32px, 40px, 48px, 64px, 96px

2. **Colors**: Use semantic tokens OR core colors from `colors.ts`

   - Semantic: `background`, `text`, `border`, `text-secondary`, etc.
   - Core: `navy`, `white`, `black`, `blue`, `green`, `red`, `yellow`, etc.
   - For Background component only: use color names (navy, white, etc.)

3. **Border Radius**: Use tokens from `borderRadii.ts`

   - none (0px), sm (2px), md (4px), lg (8px), xl (16px), full (999px)

4. **Typography**: Use tokens from `typography.ts`

   - fontFamily: `accent`, `base`, `monospace`, `system`
   - fontSize: 14, 16, 18, 20, 22, 26, 34, 44, 64
   - fontWeight: 400, 700 or `base`, `title`
   - lineHeight: `base` (1.5), `title` (1.2), `spacedTitle` (1.3)

5. **If no exact match**: Document in code comment why custom value needed

### Emotion & CSS-in-JS Patterns:

- **IMPORTANT**: Do not use inline styles
- Use `styled` from `@emotion/styled`
- Use `system.css()` for style objects
- Use `styledOptions` for styled component options
- Compose system props with `variance.compose()`

## Accessibility & Best Practices

- **IMPORTANT**: Follow WCAG requirements for accessibility
- Always follow best practices from `/packages/styleguide/src/lib/Meta/Best Practices.mdx`

## Implementation

- Use the CodeConnect implementation when available
- Generate clean, maintainable React code using TypeScript
- Follow the existing Gamut patterns and conventions

## Post-Generation Validation

After generating code, verify:

- [ ] No hardcoded hex colors (`#` in color values)
- [ ] No hardcoded pixel strings (`'24px'` format)
- [ ] All spacing values match tokens from spacing.ts
- [ ] All colors use semantic tokens or theme colors
- [ ] All border radius uses borderRadii tokens
- [ ] Component follows Gamut patterns (variance, system props, styledOptions)
- [ ] No inline styles
- [ ] Uses emotion styled components
