import { Globals, LineStyle, Properties } from 'csstype';

// General
type UnitOrPx = `${number}` | `${number}${string}`;
type Unit = `${number} ${UnitOrPx}`;

// Fles Shorthand
type Flex = UnitOrPx | Unit | `${number} ${Unit}`;

// Border Shorthands
type Border =
  | `${LineStyle | Globals}`
  | `${number}${string} ${LineStyle}`
  | `${LineStyle} ${string}`
  | `${string} ${LineStyle} ${string}`;

// Updated Shorthand Types
export interface PropertyTypes<TLength = never> extends Properties<TLength> {
  border?: Border;
  flex?: Flex;
  content?: '""' | `"${string}"`;
}
