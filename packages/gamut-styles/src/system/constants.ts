import { standard, directional } from './templateStyles';

export const propMap = {
  fontFamily: 'font-family',
  fontSize: 'font-size',
  fontWeight: 'font-weight',
  textAlign: 'text-align',
  letterSpacing: 'letter-spacing',
  lineHeight: 'line-height',
  fontStyle: 'font-style',
  margin: 'margin',
  padding: 'padding',
  borderWidth: 'border-width',
  borderStyle: 'border-style',
  borderColor: 'border-color',
  borderRadius: 'border-radius',
  display: 'display',
  width: 'width',
  minWidth: 'min-width',
  maxWidth: 'max-width',
  height: 'height',
  minHeight: 'min-height',
  maxHeight: 'max-height',
  overflow: 'overflow',
  overflowX: 'overflow-x',
  overflowY: 'overflow-y',
  position: 'position',
  top: 'top',
  bottom: 'bottom',
  left: 'left',
  right: 'right',
  zIndex: 'z-index',
} as const;

export type PropAlias = keyof typeof propMap;

export const typeMap = {
  standard: standard,
  directional: directional,
};
