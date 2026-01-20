import { css } from '@codecademy/gamut-styles';
import styled from '@emotion/styled';

import { Anchor } from '../Anchor';
import { FlexBox } from '../Box';

export const DetailedCodeWrapper = styled(FlexBox)(
  css({
    width: '100%',
    maxHeight: 'fit-content',
    borderRadius: 'md',
    border: 1,
    bg: 'background',
  })
);

export const DetailedCodeButtonWrapper = styled(Anchor)(
  css({
    borderRadius: 'md',
    bg: 'inherit',
  })
);

export const DetailedCodeBodyWrapper = styled(FlexBox)(
  css({
    overflow: 'hidden',
    '& pre': {
      margin: 0,
    },
    '& > div': {
      borderRadius: 'none',
      padding: 0,
    },
    '& .docblock-source': {
      margin: 0,
    },
  })
);
