import { css } from '@codecademy/gamut-styles';
import styled from '@emotion/styled';

import { FloatingCard } from '../FloatingCard/FloatingCard';

export const AsideContainer = styled(FloatingCard)(
  css({
    gridTemplateAreas: `'header header none'
      'subtitle subtitle none'
      'content content content'
      'none none none'
      'primaryButton secondaryButton content'`,
    p: 24,
    '&:hover': {
      outline: '5px double currentColor',
    },
  })
);
