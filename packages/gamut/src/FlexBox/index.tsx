import isPropValid from '@emotion/is-prop-valid';
import styled from '@emotion/styled';
import { css } from '@emotion/core';
import * as CSS from 'csstype';

export type BoxProps = {
  /** Flex alignment for container content */
  align?: CSS.Property.AlignItems;
  /** Custom flex alignment for the container relative to its parent */
  alignSelf?: CSS.Property.AlignSelf;
  /**
   * Justifies and aligns content to the center of the container
   * (cannot be used with: `justify` or `align`)
   * */
  center?: boolean;
  /**
   * Enables flex direction column
   * alias for `justifyContent: 'column'`
   */
  column?: boolean;
  /** Display property for the component */
  display?: CSS.Property.Display;
  /** Fits the container to the dimensions of its parent element */
  fit?: boolean;
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
  grow?: number;
  /** Enables inline-flex behavior for the container
   * alias for `display: "inline-flex"`
   * */
  inline?: boolean;
  /** Flex justification for container content */
  justify?: CSS.Property.JustifyContent;
  /** Disable flex wrapping for container content
   * (cannot be used with: `wrap`)
   * alias for `flexWrap: 'nowrap'`
   * */
  nowrap?: boolean;
  /**
   * @deprecated
   * Reverses flex direction from the default of either `row` or `column` containers.
   * */
  reverse?: boolean;
  /**
   * Enables flex direction row
   * alias for `justifyContent: 'row'`
   * */
  row?: boolean;
  /** Custom flex shrink specification for the container relative to its parent */
  shrink?: number;
  /** Enable flex wrapping for container content
   *  (cannot be used with: `nowrap`)
   *  alias for `flexWrap: 'wrap'`
   * */
  wrap?: boolean;
};

type BoxPropKeys = Readonly<Array<keyof BoxProps>>;

const internalBoxProps: BoxPropKeys = [
  'align',
  'center',
  'column',
  'display',
  'fit',
  'flex',
  'grow',
  'inline',
  'justify',
  'nowrap',
  'reverse',
  'row',
  'shrink',
  'wrap',
] as const;

const boxStyles = (props: BoxProps) => {
  const display =
    (props.flex && 'flex') || (props.inline && 'inline-flex') || props.display;
  const flexDirection =
    (props.column && 'column') || (props.row && 'row') || props.flexDirection;
  const flexWrap =
    (props.wrap && 'wrap') || (props.nowrap && 'nowrap') || props.flexWrap;
  return css`
    display: ${display};
    align-self: ${props.alignSelf};
    flex-direction: ${flexDirection};
    flex-wrap: ${flexWrap};
    justify-content: ${props.justify};
    flex-grow: ${props.grow};
    flex-shrink: ${props.shrink};
    flex-basis: ${props.flexBasis};
    box-sizing: 'border-box';
  `;
};

export const Box = styled('div', {
  shouldForwardProp: (prop) =>
    isPropValid(prop) && !internalBoxProps.includes(prop as any),
})<BoxProps>`
  ${boxStyles}
`;

Box.defaultProps = {
  display: 'block',
};

type FlexProps = Omit<BoxProps, 'display' | 'flex'>;

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
