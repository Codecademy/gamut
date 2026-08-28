# BarChart — supplemental (not in the generated `.prompt.md`)

`BarChart.prompt.md` truncates before its "Custom styling" and "Custom
scale" sections (source doc exceeds the per-component doc size cap) — this
file covers what's cut.

## Custom styling — `styleConfig` prop

Customizes chart element colors. All values must be valid Gamut color
tokens, maintaining at least 3:1 contrast with the background.

| Property            | Controls                                                                                                                    | Default          |
| ------------------- | --------------------------------------------------------------------------------------------------------------------------- | ---------------- |
| `textColor`         | Each bar row's `categoryLabel`                                                                                              | `text`           |
| `seriesOneBarColor` | The bar for `seriesOneValue` (only bar in simple charts; overlay segment in stacked charts)                                 | `text`           |
| `seriesTwoBarColor` | The bar for `seriesTwoValue` (full-length bar behind the overlay in stacked charts; unused if only `seriesOneValue` is set) | `primary`        |
| `seriesOneLabel`    | Numeric label color for `seriesOneValue`                                                                                    | `text-secondary` |
| `seriesTwoLabel`    | Numeric label color for `seriesTwoValue` (stacked only — the total at the end of the bar)                                   | `primary`        |

## Custom scale — `scaleInterval` prop

By default the scale interval (spacing between scale markers) is
auto-calculated from `maxScaleValue` (scale always starts at 0). Override
with `scaleInterval` for specific/consistent markings across charts — e.g.
`scaleInterval: 250` → markers at 0, 250, 500, 750…; `scaleInterval: 500` →
0, 500, 1000, 1500… Tick count = `Math.ceil(maxScaleValue / scaleInterval) + 1`.
