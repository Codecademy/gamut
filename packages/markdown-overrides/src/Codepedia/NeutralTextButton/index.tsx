import { TextButton } from '@codecademy/gamut';
import { colors } from '@codecademy/gamut-styles';
import styled from '@emotion/styled';

export const NeutralTextButton = styled(TextButton)`
  color: ${colors.navy} !important;

  span {
    color: ${colors.navy} !important;
  }

  :hover span {
    background-color: ${colors.lightGreen}33 !important;
  }

  :focus {
    box-shadow: none;
  }

  :focus-visible {
    box-shadow: ${colors.lightGreen} 0 0 0 2px;
  }
`;
