import styled from '@emotion/styled';
import { ComponentProps } from 'react';

import { TabButton } from './TabButton';

const StyledTabNavLink = styled(TabButton)();

export const TabNavLink: React.FC<ComponentProps<typeof StyledTabNavLink>> = ({
  variant = 'standard',
  role = 'tab',
  ...rest
}) => {
  return <StyledTabNavLink role={role} variant={variant} {...rest} />;
};
