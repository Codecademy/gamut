Product-specific design context lives in this directory. **Use one `DESIGN.md` per app — matched to the Gamut theme that app uses.**

| Source file            | Install with `--theme`                                    |
| ---------------------- | --------------------------------------------------------- |
| `DESIGN.Codecademy.md` | `core`, `admin`, `platform` (aliases: `codecademy`, `cc`) |
| `DESIGN.Percipio.md`   | `percipio`                                                |
| `DESIGN.LXStudio.md`   | `lxstudio` (alias: `lx-studio`)                           |

```sh
gamut plugin install cursor --theme <name>
# refresh: gamut plugin update cursor --theme <name> --force
```
