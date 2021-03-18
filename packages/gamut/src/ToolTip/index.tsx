import { fontSmoothing, pxRem, variant } from '@codecademy/gamut-styles';
import styled from '@emotion/styled';
import React, { ReactNode } from 'react';

import { VisualTheme } from '../theming/VisualTheme';

export type ToolTipPosition =
  | 'bottom-left'
  | 'bottom-right'
  | 'top-left'
  | 'top-right';

const arrowWidth = `1rem`;
const arrowHeight = `0.5rem`;
const arrowPaddingHorizontal = `1.5rem`;

const containerOffsetVertical = `0.75rem`;

const arrowOffsetHorizontal = `calc(${arrowPaddingHorizontal} - (${arrowWidth} / 2))`;
const arrowOffsetVertical = `calc(-${arrowHeight} / 2)`;

const slightShadow = `rgba(0, 0, 0, 0.15)`;

const TooltipWrapper = styled.div`
  position: relative;
  display: inline-flex;
`;

const TargetContainer = styled.div`
  cursor: pointer;
  border: 0;
  background: none;
  padding: 0;
`;

type ToolTipContainerProps = {
  position: ToolTipPosition;
  mode: VisualTheme;
};

const ToolTipContainer = styled.div<ToolTipContainerProps>`
  ${fontSmoothing()}

  display: flex;
  opacity: 0;
  transition: opacity 0ms;
  transition-delay: 750ms;
  position: absolute;
  width: 16rem;
  visibility: hidden;

  // Both before and after psuedo-elements are used because ::after's background should go over the container's
  // and ::before's box-shadow should be behind the container itself
  &::after,
  &::before {
    content: '';
    display: block;
    height: ${arrowHeight};
    position: absolute;
    transform: rotate(45deg);
    width: ${arrowHeight};
  }

  &::before {
    ${variant({
      prop: 'mode',
      variants: {
        dark: { backgroundColor: 'black' },
        light: { backgroundColor: 'white' },
      },
    })}
  }

  ${TargetContainer}:hover + &,
  ${TargetContainer}:focus + &,
  &:hover {
    opacity: 1;
    visibility: visible;
  }

  ${({ position }) =>
    ['top-left', 'top-right'].includes(position) &&
    `
      bottom: 100%;
      padding-bottom: ${containerOffsetVertical};

      &::after,
      &::before {
        bottom: ${arrowHeight};
      }

      &::before {
        box-shadow: 2px 2px 4px 0 ${slightShadow};
      }

      ${ToolTipBody} {
        box-shadow: 0 2px 4px 0 ${slightShadow};
      }
    `}

  ${({ position }) =>
    ['bottom-left', 'bottom-right'].includes(position) &&
    `
      top: 100%;
      padding-top: ${containerOffsetVertical};

      &::after,
      &::before {
        top: ${arrowHeight};
      }

      &::before {
        box-shadow: -2px -2px 4px 0 ${slightShadow};
      }

      ${ToolTipBody} {
        box-shadow: 0 0 4px 0 ${slightShadow};
      }
    `}

  ${({ position }) =>
    ['bottom-left', 'top-left'].includes(position) &&
    `
      justify-content: flex-end;
      right: $container-offset-horizontal;

      &::after,
      &::before {
        right: ${arrowOffsetHorizontal};
      }
    `}

  ${({ position }) =>
    ['bottom-right', 'top-right'].includes(position) &&
    `
      &::after,
      &::before {
        left: ${arrowOffsetHorizontal};
      }
    `}
`;

const ToolTipBody = styled.div<{ mode: VisualTheme }>`
  display: inline-block;
  font-size: ${pxRem(14)};
  line-height: ${({ theme }) => theme.lineHeight.base};
  padding: 0.6rem 0.75rem;

  ${variant({
    prop: 'mode',
    variants: {
      dark: { backgroundColor: 'black', textColor: 'white' },
      light: { backgroundColor: 'white', textColor: 'black' },
    },
  })}
`;

export type ToolTipProps = {
  children?: ReactNode;
  className?: string;

  /**
   * Whether to manually add a tabIndex of 0, such as for tooltips containing actual buttons.
   */
  focusable?: boolean;
  id: string;
  mode?: VisualTheme;
  position?: ToolTipPosition;
  target?: ReactNode;
  tipClassName?: string;
};

export const ToolTip: React.FC<ToolTipProps> = ({
  children,
  className,
  focusable,
  id,
  position = 'top-right',
  target,
  tipClassName,
  mode = 'light',
}) => {
  return (
    <TooltipWrapper className={className}>
      <TargetContainer
        aria-labelledby={id}
        // ToolTips sometimes contain actual <button>s, which cannot be a child of a button.
        // This element still needs tab focus so we must use the `tabIndex=0` hack. Sigh.
        // This behavior is considered deprecated; we recommend using Popover instead.
        // eslint-disable-next-line jsx-a11y/no-noninteractive-tabindex
        tabIndex={focusable ? 0 : undefined}
      >
        {target}
      </TargetContainer>
      <ToolTipContainer
        className={tipClassName}
        id={id}
        position={position}
        role="tooltip"
        mode={mode}
      >
        <ToolTipBody mode={mode}>{children}</ToolTipBody>
      </ToolTipContainer>
    </TooltipWrapper>
  );
};
