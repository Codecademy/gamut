import styled from '@emotion/styled';
import { Flex, FlexProps } from '../Flex';

export type FlexItemProps = FlexProps & {};

/**
 * A simple variant of the Flex component that defaults to display block for use as a child component for flex layouts
 */
export const FlexItem = styled(Flex)<FlexItemProps>``;

FlexItem.defaultProps = {
  display: 'block',
};
