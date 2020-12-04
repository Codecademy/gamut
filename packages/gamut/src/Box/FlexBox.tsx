import { flex } from '@codecademy/gamut-styles';
import styled from '@emotion/styled';
import { Box } from './Box';

export const FlexBox = styled(Box)(flex);

FlexBox.defaultProps = {
  display: 'flex',
};
