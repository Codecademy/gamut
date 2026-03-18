import { css } from '@codecademy/gamut-styles';
import styled from '@emotion/styled';
import { FlexBox, Box } from '@codecademy/gamut';

export const DetailedCodeWrapper = styled(FlexBox)(
  css({
    width: '100%',
    flexDirection: 'column',
    borderRadius: 'md',
    border: 1,
    bg: 'background',
  })
);

export const DetailedCodeBodyWrapper = styled(FlexBox)<{
  hasShowCodeButton?: boolean;
}>(({ hasShowCodeButton }) =>
  css({
    position: 'relative',
    flexDirection: 'column',
    /* Override Storybook's Source component default styles to remove unwanted spacing and borders in the container */
    '& .docblock-source': {
      borderRadius: 'none',
      margin: 0,
      pb: hasShowCodeButton ? 32 : 0,
    },
  })
);

export const FloatingIndicator = styled(Box)(
  css({
    position: 'absolute',
    bottom: 16,
    left: 16,
    zIndex: 1,
    bg: 'inherit',
    px: 12,
    py: 4,
    fontSize: 14,
    fontFamily: 'monospace',
    letterSpacing: '0.1em',
    /* Color to match the text color in the Source component */
    textColor: '#C9CDCF',
  })
);
