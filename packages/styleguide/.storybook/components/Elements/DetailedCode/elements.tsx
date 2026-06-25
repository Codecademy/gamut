import { css } from '@codecademy/gamut-styles';
import styled from '@emotion/styled';
import { FlexBox, Box } from '@codecademy/gamut';

export const DetailedCodeWrapper = styled(FlexBox)(
  css({
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
    },
    /* Reserves space under the text for the overlay */
    '& .docblock-source pre': {
      pb: hasShowCodeButton ? 48 : 20,
    },
  })
);

export const FloatingIndicator = styled(Box)(
  css({
    position: 'absolute',
    bottom: 16,
    left: 16,
    px: 12,
    fontSize: 14,
    fontFamily: 'monospace',
    textColor: '#C9CDCF',
  })
);
