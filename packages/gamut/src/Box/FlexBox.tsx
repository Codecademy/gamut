import { flex } from '@codecademy/gamut-styles';
import { compose, HandlerProps } from '@codecademy/gamut-system';
import styled from '@emotion/styled';
import { boxStyles } from './Box';

const flexBoxStyles = compose(boxStyles, flex);

type FlexStyles = HandlerProps<typeof flexBoxStyles>;

export interface FlexBoxProps extends FlexStyles {}

export const FlexBox = styled.div<FlexBoxProps>(flexBoxStyles);

FlexBox.defaultProps = {
  display: 'flex',
};
