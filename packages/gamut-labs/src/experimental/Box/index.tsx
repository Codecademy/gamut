import styled from '@emotion/styled';
import {
  getLayout,
  getPosition,
  getTypography,
  getSpacing,
  getBorder,
  compose,
} from '@codecademy/gamut-styles';

const boxStyles = compose(
  getTypography,
  getLayout,
  getSpacing,
  getBorder,
  getPosition
);

export const Box = styled.div`
  ${boxStyles}
`;
