import { isUndefined } from 'lodash';
import isPropValid from '@emotion/is-prop-valid';
import styled from '@emotion/styled';
import { css } from '@emotion/core';
import * as CSS from 'csstype';

export type BoxProps = {
  /** Flex alignment for container content */
  alignItems?: CSS.Property.AlignItems;
  /** Custom flex alignment for the container relative to its parent */
  alignSelf?: CSS.Property.AlignSelf;
  /**
   * Justifies and aligns content to the center of the container
   * */
  center?: boolean;
  /**
   * Enables flex direction column
   * alias for `justifyContent: 'column'`
   */
  column?: boolean;
  /** Display property for the component */
  display?: CSS.Property.Display;
  /**
   * Enables flex behavior for the container
   * alias for `display: "flex"` */
  flex?: boolean;
  /**
   * Flex Basis
   */
  flexBasis?: CSS.Property.FlexBasis<string | 0 | number>;
  /**
   * Flex Direction
   */
  flexDirection?: CSS.Property.FlexDirection;
  /**
   * Flex Wrap
   */
  flexWrap?: CSS.Property.FlexWrap;
  /** Custom flex grow specification relative to its parent */
  grow?: CSS.Property.FlexGrow;
  height?: CSS.Property.Height;
  /** Enables inline-flex behavior for the container
   * alias for `display: "inline-flex"`
   * */
  inline?: boolean;
  /** Flex justification for container content */
  justifyContent?: CSS.Property.JustifyContent;
  /**
   * Enables flex direction row
   * alias for `justifyContent: 'row'`
   * */
  row?: boolean;
  /** Custom flex shrink specification for the container relative to its parent */
  shrink?: CSS.Property.FlexShrink;
  width?: CSS.Property.Width;

  /** @deprecated switch to `flexWrap: 'nowrap'` */
  nowrap?: boolean;
  /** @deprecated switch to `flexWrap: 'wrap'` */
  wrap?: boolean;
  /** @deprecated switch to alignItems */
  align?: never;
  /** @deprecated switch to justifyContent */
  justify?: never;
  /** @deprecated use width/height 100% */
  fit?: never;
  /** @deprecated use the reverse variants of flexDirection insead */
  reverse?: never;
};

type BoxPropKeys = Readonly<Array<keyof BoxProps>>;

const internalBoxProps: BoxPropKeys = [
  'alignItems',
  'alignSelf',
  'center',
  'column',
  'display',
  'flex',
  'grow',
  'inline',
  'justifyContent',
  'row',
  'shrink',
] as const;

const boxStyles = (props: BoxProps) => {
  const display =
    (props.flex && 'flex') || (props.inline && 'inline-flex') || props.display;
  const flexDirection =
    (props.column && 'column') || (props.row && 'row') || props.flexDirection;
  const alignItems = props.alignItems || (props.center && 'center');
  const justifyContent = props.justifyContent || (props.center && 'center');

  /**
   * If any of these flex properties are set, we want to set the others to their default values
   * @
   * */
  const shouldResetFlexProperties = !isUndefined(
    props.grow ?? props.shrink ?? props.flexBasis
  );

  return css`
    box-sizing: 'border-box';
    display: ${display};
    align-items: ${alignItems};
    align-self: ${props.alignSelf};
    flex-direction: ${flexDirection};
    flex-wrap: ${props.flexWrap};
    justify-content: ${justifyContent};
    flex-grow: ${props.grow ?? (shouldResetFlexProperties && 0)};
    flex-shrink: ${props.shrink ?? (shouldResetFlexProperties && 0)};
    flex-basis: ${props.flexBasis ?? (shouldResetFlexProperties && 'auto')};
    width: ${props.width};
    height: ${props.height};
  `;
};

/**
 * The basic building block of the Gamut design system
 */
export const Box = styled('div', {
  shouldForwardProp: (prop) =>
    isPropValid(prop) && !internalBoxProps.includes(prop as any),
})<BoxProps>`
  ${boxStyles}
`;

Box.defaultProps = {
  display: 'block',
};

export type FlexProps = Omit<BoxProps, 'display' | 'flex'>;

/**
 * A simple variant of the Box component that defaults to display flex for easy flex-based layout composition
 */
export const Flex = styled('div', {
  shouldForwardProp: (prop) =>
    isPropValid(prop) && !internalBoxProps.includes(prop as any),
})<FlexProps>`
  ${boxStyles}
  display: ${(props) => (props.inline ? 'inline-flex' : 'flex')};
`;

/**
 * @deprecated
 */
export const Container = Flex;

/**
 * @deprecated
 */
export const Item = Box;
