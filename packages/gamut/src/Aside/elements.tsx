import { css } from '@codecademy/gamut-styles';
import styled from '@emotion/styled';

import { FloatingCard } from '../FloatingCard/FloatingCard';

export const AsideContainer = styled(FloatingCard)(
  css({
    gridTemplateAreas: `'header header ...'
      'subtitle subtitle ...'
      'content content content'
      '... ... ...'
      'primaryButton secondaryButton content'`,
    p: 24,
    minWidth: 380,
    '&:hover': {
      outline: '5px double currentColor',
    },
  })
);
