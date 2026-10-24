# Theme: Core / Admin / Platform (Codecademy)

Resolved values and brand voice for `coreTheme`, `adminTheme`, `platformTheme` — same visual identity, palette additions vary slightly on Platform. Semantic token _names_ are theme-agnostic (see `../colors.md`); this file has what those names actually resolve to here, plus voice/atmosphere context a design agent can't infer from token names alone.

## Voice & atmosphere

Codecademy communicates **logic with personality** — structured and trustworthy for a learning platform, with creative moments that feel engaging and human: _"ruled by logic, but creative and a bit unexpected."_ Density: medium — information-dense layouts with careful whitespace and strong typographic hierarchy, not cramped or overly airy.

Supports **light + dark** mode (all three sub-themes).

## Color resolution (semantic → actual value, light / dark)

| Token                | Light       | Dark         |
| -------------------- | ----------- | ------------ |
| `text`               | `navy-800`  | `white`      |
| `text-accent`        | `navy-900`  | `beige`      |
| `background`         | `white`     | `navy-800`   |
| `background-primary` | `beige`     | `navy-900`   |
| `primary`            | `hyper-500` | `yellow-500` |
| `primary-hover`      | `hyper-400` | `yellow-400` |
| `secondary`          | `navy-800`  | `white`      |
| `danger`             | `red-500`   | `red-300`    |
| `feedback-error`     | `red-600`   | `red-300`    |
| `feedback-success`   | `green-700` | `green-400`  |
| `border-primary`     | `navy-800`  | `white`      |

Platform theme adds palette colors: `lightBeige`, `gold`, `teal`, `purple`.

## Typography specifics

- Font: **Apercu** (base), **Suisse Intl Mono** (accent) — licensed for codecademy.com only.
- **Apercu Bold** (`fontWeight="title"`, resolves to `700`) for headlines/CTAs/buttons.
- Emphasize text _within_ a paragraph with **Italic**, not Bold.
- Suisse sparingly (code, captions, lists) — reads 10-15% larger than Apercu at the same size.

## Component notes

- Card background variants: `default`, `white`, `yellow`, `beige` (light contexts), `navy`, `hyper` (dark contexts).
- `CTAButton` — reserve for marketing/high-visibility promotions, never standard UI actions.

## Agent quick reference

| Scenario               | Tokens                                                                                             |
| ---------------------- | -------------------------------------------------------------------------------------------------- |
| Primary button (light) | `bg: primary`, `color: white`, `hover: primary-hover`                                              |
| Primary button (dark)  | `bg: primary`, `color: text`, `hover: primary-hover`                                               |
| Headline               | `color: text-accent`, `weight: title (700)`, `lineHeight: title (1.2)`                             |
| Card default           | `bg: background`, `borderRadius: none` (add `isInteractive` for hover shadow + `borderRadius: md`) |
| Error state            | `color: feedback-error`, `bg: background-error`, `border: danger`                                  |
