import { variant } from '@codecademy/gamut-styles';
import styled from '@emotion/styled';

export const AppBarSection = styled.div(
  variant({
    prop: 'position',
    base: {
      display: 'flex',
      alignItems: 'center',
      height: '100%',
      zIndex: 1,
    },
    variants: {
      left: {
        flex: 1,
      },
      center: {
        flex: 2,
        justifyContent: 'center',
        textAlign: 'center',
      },
      right: {
        flex: 1,
        justifyContent: 'flex-end',
      },
    },
  })
);
