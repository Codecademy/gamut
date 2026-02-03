import { css } from '@codecademy/gamut-styles';
import styled from '@emotion/styled';

import { FlexBox } from '../Box';

export const DetailedCodeWrapper = styled(FlexBox)(
  css({
    width: '100%',
    flexDirection: 'column',
    borderRadius: 'md',
    border: 1,
    bg: 'background',
  })
);

export const DetailedCodeBodyWrapper = styled(FlexBox)(
  css({
    flexDirection: 'column',
    /* Override Storybook's Source component default styles to remove unwanted spacing and borders in the container */
    '& .docblock-source': {
      borderRadius: 'none',
      margin: 0,
    },
  })
);
