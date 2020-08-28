import styled from '@emotion/styled';
import { spacing, SpaceSizes } from '@codecademy/gamut-styles';
import { pick, entries } from 'lodash';

export const paddingAliases = [
  'padding',
  'paddingLeft',
  'paddingRight',
  'paddingTop',
  'paddingBottom',
] as const;

export const marginAliases = [
  'margin',
  'marginLeft',
  'marginRight',
  'marginBottom',
  'marginTop',
] as const;

type PropDictionary = Record<string | number, string | number | undefined>;

type MarginSizes = typeof marginAliases[number];
type PaddingSizes = typeof paddingAliases[number];

type Padding = Partial<Record<PaddingSizes, SpaceSizes>>;
type Margin = Partial<Record<MarginSizes, SpaceSizes>>;

export type BoxProps = Margin & Padding;

const dashCase = (string: string) =>
  string.replace(/[A-Z]/g, (m) => '-' + m.toLowerCase());

function templateAliases<T extends PropDictionary, K extends PropDictionary>(
  props: T,
  scale: K
) {
  return entries(props).map(
    ([key, value]) => value && `${dashCase(key)}: ${scale[value]};`
  );
}

const getPadding = (props: BoxProps) =>
  templateAliases(pick(props, paddingAliases), spacing);

const getMargin = (props: BoxProps) =>
  templateAliases(pick(props, marginAliases), spacing);

export const Box = styled.div<BoxProps>`
  display: block;
  ${getPadding}
  ${getMargin}
`;
