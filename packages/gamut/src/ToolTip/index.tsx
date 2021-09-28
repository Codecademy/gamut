import {
  ColorModes,
  fontSmoothPixel,
  lineHeight,
  pxRem,
  timing,
  variant,
} from '@codecademy/gamut-styles';
import styled from '@emotion/styled';
import React, { ReactNode } from 'react';

import { Box, BoxProps } from '../Box';

export type ToolTipAlignment =
  | 'bottom-center'
  | 'bottom-left'
  | 'bottom-right'
  | 'top-center'
  | 'top-left'
  | 'top-right';

const arrowHeight = `1rem`;
const containerOffsetVertical = `0.75rem`;

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

type ToolTipBodyProps = {
  /**
   * How to align the tooltip relative to the target.
   */
  alignment?: ToolTipAlignment;

  mode?: ColorModes;
};

type ToolTipContainerProps = ToolTipBodyProps;

const getToolTipVisibilityCSS = (visibility: boolean) =>
  visibility
    ? `
  opacity: 1;
  visibility: visible;
`
    : `
  opacity: 0;
  visibility: hidden;
`;

const ToolTipContainer = styled.div<Required<ToolTipContainerProps>>`
  ${fontSmoothPixel}
  display: flex;
  transition: opacity ${timing.fast};
  transition-delay: ${timing.fast};
  position: absolute;
  max-width: ${({ alignment }) =>
    alignment.includes('center') ? '8rem' : '16rem'};
  width: 70vw;
  z-index: 1;

  ${getToolTipVisibilityCSS(false)}

  &::after {
    content: '';
    display: block;
    height: ${arrowHeight};
    position: absolute;
    transform: rotate(45deg);
    width: ${arrowHeight};
  }

  &::after {
    border-style: solid;

    ${variant({
      prop: 'mode',
      variants: {
        dark: { backgroundColor: 'black', borderColor: 'white' },
        light: { backgroundColor: 'white', borderColor: 'black' },
      },
    })}
  }

  ${TargetContainer}:hover + &,
  ${TargetContainer}:focus-within + &,
  &:hover {
    ${getToolTipVisibilityCSS(true)}
  }

  ${({ alignment }) =>
    alignment.includes('top') &&
    `
      bottom: 100%;
      padding-bottom: ${containerOffsetVertical};

      &::after {
        border-bottom-right-radius: 4px;
        border-width: 0 1px 1px 0;
        bottom: 0.25rem;
      }
    `}

  ${({ alignment }) =>
    alignment.includes('bottom') &&
    `
      top: 100%;
      padding-top: ${containerOffsetVertical};

      &::after {
        border-top-left-radius: 4px;
        border-width: 1px 0 0 1px;
        top: 0.25rem;
      }
    `}

${({ alignment }) =>
    alignment.includes('center') &&
    `
      left: calc(50% - 4rem);

      &::after {
        left: calc(50% - 0.5rem);
      }
    `}

  ${({ alignment }) =>
    alignment.includes('left') &&
    `
      justify-content: flex-end;

      &::after {
        right: 1.5rem;
      }

      left: calc(50% - 14rem)
    `}

  ${({ alignment }) =>
    alignment.includes('right') &&
    `
      &::after {
        left: 1.5rem;
      }

      left: calc(50% - 2rem);
    `}
`;

const ToolTipBody = styled(Box)<Required<ToolTipBodyProps>>`
  border: 1px solid;
  border-radius: 3px;
  display: inline-block;
  font-size: ${pxRem(14)};
  line-height: ${lineHeight.base};
  ${({ alignment }) =>
    alignment.includes('center')
      ? `
      margin: auto;
      padding: 0.5rem;
      text-align: center;
    `
      : `
      padding: 1rem;
    `}

  ${variant({
    prop: 'mode',
    variants: {
      dark: {
        bg: 'black',
        borderColor: 'beige',
        textColor: 'beige',
      },
      light: {
        bg: 'white',
        borderColor: 'black',
        textColor: 'black',
      },
    },
  })}
`;

export type ToolTipProps = ToolTipContainerProps & {
  children?: ReactNode;

  /**
   * Class name for the hidden-by-default contents.
   *
   * @remarks
   * This is an inner element, not the outermost positioning element.
   * That element is styled with `containerClassName`.
   */
  className?: string;

  /**
   * Class name for the outermost positioning element.
   */
  containerClassName?: string;

  /**
   * Whether to manually add a tabIndex of 0 to the target container, for tooltips without focusable children.
   */
  focusable?: boolean;

  target?: ReactNode;

  toolTipStyles?: BoxProps;
} & (
    | {
        id: string;
        label?: never;
      }
    | {
        id?: never;
        label: string;
      }
  );

export const ToolTip: React.FC<ToolTipProps> = ({
  alignment = 'top-right',
  children,
  className,
  containerClassName,
  focusable,
  id,
  label,
  mode = 'light',
  target,
  toolTipStyles,
}) => {
  return (
    <TooltipWrapper className={containerClassName}>
      <TargetContainer
        aria-labelledby={id}
        aria-label={label}
        role={focusable ? 'button' : undefined}
        onKeyDown={(event) => {
          if (event.key === 'Escape') {
            (event.target as HTMLElement).blur();
          }
        }}
        // ToolTips sometimes contain actual <button>s, which cannot be a child of a button.
        // This element still needs tab focus so we must use the `tabIndex=0` hack.
        // eslint-disable-next-line jsx-a11y/no-noninteractive-tabindex
        tabIndex={focusable ? 0 : undefined}
      >
        {target}
      </TargetContainer>
      <ToolTipContainer
        alignment={alignment}
        className={className}
        id={id}
        role="tooltip"
        mode={mode}
        aria-live="polite"
      >
        <ToolTipBody
          alignment={alignment}
          mode={mode}
          minWidth="4rem"
          {...toolTipStyles}
        >
          {children}
        </ToolTipBody>
      </ToolTipContainer>
    </TooltipWrapper>
  );
};
