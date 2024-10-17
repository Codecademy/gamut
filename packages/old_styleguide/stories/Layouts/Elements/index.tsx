import { css } from '@codecademy/gamut-styles';
import styled from '@emotion/styled';

export const Example = styled.div(
  css({
    minHeight: '3rem',
    bg: 'navy',
    color: 'white',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  })
);

export const RowExample = styled(Example)(css({ mb: 16 }));
