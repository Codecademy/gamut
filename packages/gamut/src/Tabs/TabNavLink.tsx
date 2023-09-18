import styled from '@emotion/styled';
import { ComponentProps } from 'react';

import { TabButton } from './TabButton';

export const TabNavLink = styled(TabButton)();

export const TabNavLink2: React.FC<ComponentProps<typeof TabNavLink>> = ({
  variant = 'standard',
  roles = 'tab',
  ...rest
}) => {
  return <TabNavLink roles={roles} variant={variant} {...rest} />;
};
