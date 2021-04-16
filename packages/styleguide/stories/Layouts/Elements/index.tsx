import { system } from '@codecademy/gamut-styles';
import styled from '@emotion/styled';

export const Example = styled.div(
  system.css({
    minHeight: '3rem',
    bg: 'navy',
    color: 'white',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  })
);

export const RowExample = styled(Example)(system.css({ mb: 16 }));
