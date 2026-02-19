import { css } from '@codecademy/gamut-styles';
import styled from '@emotion/styled';
import { FlexBox, TextButton } from '@codecademy/gamut';

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
  hasFloatingBadge?: boolean;
}>(({ hasFloatingBadge }) =>
  css({
    position: 'relative',
    flexDirection: 'column',
    /* Override Storybook's Source component default styles to remove unwanted spacing and borders in the container */
    '& .docblock-source': {
      borderRadius: 'none',
      margin: 0,
      pb: hasFloatingBadge ? 48 : 0,
    },
  })
);

export const FloatingExpandButton = styled(TextButton)(
  css({
    position: 'absolute',
    bottom: 16,
    left: '50%',
    transform: 'translateX(-50%)',
    zIndex: 1,
    bg: 'white',
  })
);