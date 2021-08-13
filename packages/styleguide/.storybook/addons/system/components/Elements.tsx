import styled from '@emotion/styled';
import { system, variant } from '@codecademy/gamut-styles/src';

export const PropGroupTooltip = styled.div(
  system.css({
    display: 'none',
    position: 'absolute',
    left: 0,
    bottom: 64,
    width: 380,
    zIndex: 2,
    '> *': {
      flex: 1,
    },
  })
);

export const PropItem = styled.pre(
  system.css({
    display: 'inline-block',
    m: 0,
    mx: 4,
    px: 4,
    bg: 'background-disabled',
    color: 'navy-700',
    lineHeight: 'base',
    borderRadius: '4px',
  })
);

export const PropGroupTag = styled.div(
  variant({
    defaultVariant: 'normal',
    base: {
      display: 'inline-block',
      userSelect: 'none',
      position: 'relative',
      py: 4,
      px: 8,
      fontSize: 14,
      borderRadius: '4px',
      cursor: 'help',
      border: 1,
      '&:hover > div': {
        display: 'flex',
      },
    },
    variants: {
      normal: {
        textColor: 'text',
        borderColor: 'currentColor',
      },
      selected: {
        textColor: 'background',
        bg: 'text',
        borderColor: 'currentColor',
      },
    },
  })
);

export const ToggleLabel = styled.label(
  system.css({ mr: 4, fontSize: 16, height: 32 })
);
