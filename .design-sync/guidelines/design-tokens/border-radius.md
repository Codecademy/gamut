# Border Radius Tokens

| Token  | Value | Usage                                        |
| ------ | ----- | -------------------------------------------- |
| `none` | 0px   | Square / non-interactive elements            |
| `sm`   | 2px   | Subtle rounding, tags, interactive elements  |
| `md`   | 4px   | Buttons, inputs, interactive cards, overlays |
| `lg`   | 8px   | Cards, panels                                |
| `xl`   | 16px  | Large cards, modals                          |
| `full` | 999px | Pills, avatars, toggles, badges              |

**No custom border radius values.** Use the tokens above.

**These pixel values are for Core/Admin/Platform/Percipio.** LX Studio uses larger radii (`sm`=4px, `md`=8px, `lg`=12px) as a deliberate brand difference — see `theme-lxstudio.md` before using radius tokens under `lxStudioTheme`.
