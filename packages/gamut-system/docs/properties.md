# Properties

There are 10 different property groups that we support by default each with a number of individual properties. While each of these properties is completely customizable, we currently do not support any other properties at this time.

- [Properties](#properties)
  - [Spacing](#spacing)
  - [Typography](#typography)
  - [Layout](#layout)
  - [Colors](#colors)
  - [Background](#background)
  - [Borders](#borders)
  - [Position](#position)
  - [Shadow](#shadow)
  - [Flex](#flex)
  - [Grid](#grid)

## Spacing

| Prop          | CSS Property                | defaultTransform |
| ------------- | --------------------------- | ---------------- |
| margin        | margin                      |                  |
| marginX       | margin-left, margin-right   |                  |
| marginY       | margin-top, margin-bottom   |                  |
| marginTop     | margin-top                  |                  |
| marginBottom  | margin-bottom               |                  |
| marginLeft    | margin-left                 |                  |
| marginRight   | margin-right                |                  |
| padding       | padding                     |                  |
| paddingX      | padding-left, padding-right |                  |
| paddingY      | padding-top, padding-bottom |                  |
| paddingTop    | padding-top                 |                  |
| paddingBottom | padding-bottom              |                  |
| paddingLeft   | padding-left                |                  |
| paddingRight  | padding-right               |                  |

## Typography

| Prop           | CSS Property    | defaultTransform |
| -------------- | --------------- | ---------------- |
| fontFamily     | font-family     |                  |
| fontWeight     | font-weight     |                  |
| fontSize       | font-size       |                  |
| lineHeight     | line-height     |                  |
| textAlign      | text-align      |                  |
| fontStyle      | font-style      |                  |
| letterSpacing  | letter-spacing  |                  |
| textDecoration | text-decoration |                  |

## Layout

| Prop          | CSS Property   | defaultTransform |
| ------------- | -------------- | ---------------- |
| display       | display        |                  |
| overflow      | overflow       |                  |
| overflowY     | overflow-y     |                  |
| overflowX     | overflow-x     |                  |
| width         | width          | `parseSize`      |
| minWidth      | min-width      | `parseSize`      |
| maxWidth      | max-width      | `parseSize`      |
| height        | height         | `parseSize`      |
| minHeight     | min-height     | `parseSize`      |
| maxHeight     | max-height     | `parseSize`      |
| verticalAlign | vertical-align |                  |

## Colors

| Prop              | CSS Property                          | defaultTransform |
| ----------------- | ------------------------------------- | ---------------- |
| color             | color                                 |                  |
| backgroundColor   | background-color                      |                  |
| borderColor       | border-color                          |                  |
| borderColorY      | border-top-color, border-bottom-color |                  |
| borderColorX      | border-left-color, border-right-color |                  |
| borderColorTop    | border-top-color                      |                  |
| borderColorBottom | border-bottom-color                   |                  |
| borderColorLeft   | border-left-color                     |                  |
| borderColorRight  | border-right-color                    |                  |

## Background

| Prop               | CSS Property        | defaultTransform |
| ------------------ | ------------------- | ---------------- |
| backgroundImage    | background-image    |                  |
| backgroundSize     | background-size     |                  |
| backgroundRepeat   | background-repeat   |                  |
| backgroundPosition | background-position |                  |

## Borders

| Prop              | CSS Property                          | defaultTransform |
| ----------------- | ------------------------------------- | ---------------- |
| borderWidth       | border-width                          |                  |
| borderWidthX      | border-left-width, border-right-width |                  |
| borderWidthY      | border-top-width, border-bottom-width |                  |
| borderWidthTop    | border-top-width                      |                  |
| borderWidthBottom | border-bottom-width                   |                  |
| borderWidthLeft   | border-left-width                     |                  |
| borderWidthRight  | border-right-width                    |                  |
| borderRadius      | border-radius                         |                  |
| borderStyle       | border-style                          |                  |

## Position

| Prop     | CSS Property | defaultTransform |
| -------- | ------------ | ---------------- |
| position | position     |                  |
| top      | top          | `parseSize`      |
| right    | right        | `parseSize`      |
| bottom   | bottom       | `parseSize`      |
| left     | left         | `parseSize`      |
| zIndex   | zIndex       |                  |

## Shadow

| Prop       | CSS Property | defaultTransform |
| ---------- | ------------ | ---------------- |
| boxShadow  | box-shadow   |                  |
| textShadow | text-shadow  |                  |

## Flex

| Prop           | CSS Property    | defaultTransform |
| -------------- | --------------- | ---------------- |
| flexBasis      | flex-basis      | `parseSize`      |
| flexDirection  | flex-direction  |                  |
| flexWrap       | flex-wrap       |                  |
| flexShrink     | flex-shrink     |                  |
| flexGrow       | flex-grow       |                  |
| order          | order           |                  |
| justifySelf    | justify-self    |                  |
| justifyContent | justify-content |                  |
| justifyItems   | justify-items   |                  |
| alignSelf      | align-self      |                  |
| alignItems     | align-items     |                  |
| alignContent   | align-content   |                  |

## Grid

| Prop                | CSS Property          | defaultTransform |
| ------------------- | --------------------- | ---------------- |
| gridAutoColumns     | grid-auto-columns     |                  |
| gridAutoRows        | grid-auto-rows        |                  |
| gridTemplateColumns | grid-template-columns |                  |
| gridTemplateRows    | grid-template-rows    |                  |
| gridAutoFlow        | grid-auto-flow        |                  |
| rowGap              | grid-row-gap          |                  |
| columnGap           | grid-column-gap       |                  |
| gridColumn          | grid-column           |                  |
| gridRow             | grid-row              |                  |
| gridColumnStart     | grid-column-start     |                  |
| gridRowStart        | grid-row-start        |                  |
| gridColumnEnd       | grid-column-end       |                  |
| gridRowEnd          | grid-row-end          |                  |
