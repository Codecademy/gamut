import {
  ColorModes,
  css,
  fontSmoothPixel,
  lineHeight,
  pxRem,
  theme,
  timing,
  variant,
} from '@codecademy/gamut-styles';
import styled from '@emotion/styled';

export type ToolTipAlignment =
  | 'bottom-center'
  | 'bottom-left'
  | 'bottom-right'
  | 'top-center'
  | 'top-left'
  | 'top-right';

const arrowHeight = `1rem`;
const containerOffsetVertical = `0.75rem`;

export const TooltipWrapper = styled.div(
  css({ position: 'relative', display: 'inline-flex' })
);

export const TargetContainer = styled.div(
  css({
    cursor: 'pointer',
    border: 0,
    background: 'none',
    padding: 0,

    '&:focus-visible': {
      outline: `0.3rem auto ${theme.colors['primary-hover']}`,
    },
  })
);

type ToolTipBodyProps = {
  /**
   * How to align the tooltip relative to the target.
   */
  alignment?: ToolTipAlignment;

  mode?: ColorModes;

  widthMode?: 'standard' | 'unlimited';
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

const ToolTipBody = styled.div<Required<ToolTipBodyProps>>`
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

  ${({ widthMode }) => (widthMode === 'unlimited' ? {} : { minWidth: '4rem' })}
`;
