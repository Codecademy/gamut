import { isUndefined } from 'lodash';
import isPropValid from '@emotion/is-prop-valid';
import styled from '@emotion/styled';
import { css } from '@emotion/core';
import * as CSS from 'csstype';

export type BoxProps = {
  display?: CSS.Property.Display;
  height?: CSS.Property.Height;
  width?: CSS.Property.Width;
};

export type FlexProps = BoxProps & {
  /** Flex alignment for container content */
  alignItems?: CSS.Property.AlignItems;
  /** Custom flex alignment for the container relative to its parent */
  alignSelf?: CSS.Property.AlignSelf;
  /**
   * Justifies and aligns content to the center of the container
   * */
  centerContent?: boolean;
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
  flexGrow?: CSS.Property.FlexGrow;
  /** Flex justification for container content */
  justifyContent?: CSS.Property.JustifyContent;
  /** Custom flex shrink specification for the container relative to its parent */
  flexShrink?: CSS.Property.FlexShrink;
};

type FlexPropKeys = Readonly<Array<keyof FlexProps>>;

const internalFlexProps: FlexPropKeys = ['display', 'width', 'height'] as const;

const flexStyles = (props: FlexProps) => {
  const alignItems = props.alignItems || (props.centerContent && 'center');
  const justifyContent =
    props.justifyContent || (props.centerContent && 'center');

  /**
   * If any of these flex properties are set,
   * we want to set the others to their default values,
   * this was originally added to maintain styles across browsers, but may no longer be necessary
   * */
  const shouldResetFlexProperties = !isUndefined(
    props.flexGrow ?? props.flexShrink ?? props.flexBasis
  );

  return css`
    box-sizing: 'border-box';
    display: ${props.display};
    align-items: ${alignItems};
    align-self: ${props.alignSelf};
    flex-direction: ${props.flexDirection};
    flex-wrap: ${props.flexWrap};
    justify-content: ${justifyContent};
    flex-grow: ${props.flexGrow ?? (shouldResetFlexProperties && 0)};
    flex-shrink: ${props.flexShrink ?? (shouldResetFlexProperties && 1)};
    flex-basis: ${props.flexBasis ?? (shouldResetFlexProperties && 'auto')};
    width: ${props.width};
    height: ${props.height};
  `;
};

/**
 * A simple variant of the Flex component that defaults to display block for use as a child component for flex layouts
 */
export const Flex = styled('div', {
  shouldForwardProp: (prop) =>
    isPropValid(prop) && !internalFlexProps.includes(prop as any),
})<FlexProps>`
  ${flexStyles}
`;

Flex.defaultProps = {
  display: 'flex',
};

export type FlexItemProps = FlexProps & {};

/**
 * A simple variant of the Flex component that defaults to display block for use as a child component for flex layouts
 */
export const FlexItem = styled(Flex)<FlexItemProps>``;

FlexItem.defaultProps = {
  display: 'block',
};
