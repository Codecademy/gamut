import {
  ColorModes,
  css,
  fontSmoothPixel,
  lineHeight,
  pxRem,
  states,
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
const containerOffsetVertical = 12;

export const TooltipWrapper = styled.div(
  css({ position: 'relative', display: 'inline-flex' })
);

export const TargetContainer = styled.div(
  css({
    cursor: 'pointer',
    border: 'none',
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

const getToolTipVisibility = (boolean: boolean) =>
  boolean
    ? ({ opacity: 1, visibility: 'visible' } as const)
    : ({ opacity: 0, visibility: 'hidden' } as const);

const centerMaxWidth = { maxWidth: '8rem' } as const;
const alignedMaxWidth = { maxWidth: '16rem' } as const;

const topStyles = {
  bottom: '100%',
  pb: containerOffsetVertical,
  '&::after': {
    borderBottomRightRadius: '4px',
    borderWidth: '0 1px 1px 0',
    bottom: '0.25rem',
  },
} as const;

const bottomStyles = {
  top: '100%',
  pt: containerOffsetVertical,
  '&::after': {
    borderTopightRadius: '4px',
    borderWidth: '1px 0 0 1px',
    top: '0.25rem',
  },
} as const;

const centerStyles = {
  left: 'calc(50% - 4rem)',
  '&::after': {
    left: 'calc(50% - 0.5rem)',
  },
} as const;

const leftStyles = {
  justifyContent: 'flex-end',
  left: 'calc(50% - 14rem)',
  '&::after': {
    right: '1.5rem',
  },
} as const;

const rightStyles = {
  left: 'calc(50% - 2rem)',
  '&::after': {
    left: '1.5rem',
  },
} as const;

const toolTipAlignmentVariants = variant({
  prop: 'alignment',
  variants: {
    'bottom-center': {
      centerMaxWidth,
    },
    'bottom-left': {
      alignedMaxWidth,
    },
    'bottom-right': {
      alignedMaxWidth,
    },
    'top-center': {
      centerMaxWidth,
      topStyles,
    },
    'top-left': {
      alignedMaxWidth,
      topStyles,
    },
    'top-right': {
      alignedMaxWidth,
      topStyles,
    },
  },
});

const toolTipContainerModeVariants = variant({
  prop: 'mode',
  variants: {
    dark: { backgroundColor: 'black', borderColor: 'white' },
    light: { backgroundColor: 'white', borderColor: 'black' },
  },
});

const toolTipVisibilityStates = states({
  visible: getToolTipVisibility(true),
});

const toolTipBaseCss = css({
  fontSmoothPixel,
  display: 'flex',
  transition: `opacity ${timing.fast}`,
  transitionDelay: `${timing.fast}`,
  position: 'absolute',
  width: '70vw',
  zIndex: 1,
  opacity: 1,
  visibility: 'visible',
  '&::after': {
    content: '',
    display: 'block',
    height: `${arrowHeight}`,
    position: 'absolute',
    transform: 'rotate(45deg)',
    width: `${arrowHeight}`,
    borderStyle: 'solid',
  },
});

export const ToolTipContainer = styled.div`
  ${TargetContainer}:hover + &,
  ${TargetContainer}:focus-within + &,
  &:hover {
    ${getToolTipVisibilityCSS(true)}
  },
  ${toolTipBaseCss},
`;

const ToolTipContainer_1 = styled.div<Required<ToolTipContainerProps>>`
  max-width: ${({ alignment }) =>
    alignment.includes('center') ? '8rem' : '16rem'};

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
