import styled from '@emotion/styled';
import { ComponentProps } from 'react';

import { TabButton } from './TabButton';

const StyledTabNavLink = styled(TabButton)();

export const TabNavLink: React.FC<ComponentProps<typeof StyledTabNavLink>> = ({
  variant = 'standard',
  roles = 'tab',
  ...rest
}) => {
  return <StyledTabNavLink roles={roles} variant={variant} {...rest} />;
};
