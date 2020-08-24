import { isUndefined } from 'lodash';
import { css } from '@emotion/core';
import * as CSS from 'csstype';
import { Box } from './BaseBox';
import styled from '@emotion/styled';

export type FlexProps = {
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
  /**
   * Enables flex behavior for the container
   * alias for `display: "flex"` */
  flex: boolean;
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

// type FlexBoxPropKeys = Readonly<Array<keyof FlexBoxProps>>;

// const internalBoxProps: FlexBoxPropKeys = [
//   'alignItems',
//   'alignSelf',
//   'center',
//   'column',
//   'display',
//   'flex',
//   'grow',
//   'inline',
//   'justifyContent',
//   'row',
//   'shrink',
// ] as const;

export const flexStyles = (props: Partial<FlexProps>) => {
  const display = (props.inline && 'inline-flex') || 'flex';
  const flexDirection =
    (props.column && 'column') || (props.row && 'row') || props.flexDirection;
  const alignItems = props.alignItems || (props.center && 'center');
  const justifyContent = props.justifyContent || (props.center && 'center');

  /**
   * If any of these flex properties are set, we want to set the others to their default values
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

export const Flex = styled(Box)<FlexProps>`
  ${flexStyles}
`;
