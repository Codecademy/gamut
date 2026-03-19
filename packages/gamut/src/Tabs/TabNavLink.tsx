import styled from '@emotion/styled';
import type { ComponentProps, ComponentType } from 'react';

import { TabButton } from './TabButton';

const StyledTabNavLink = styled(TabButton)();

/** Props for TabNavLink. Use when wrapping or composing TabNavLink. */
export type TabNavLinkProps = ComponentProps<typeof StyledTabNavLink>;

export const TabNavLink: ComponentType<TabNavLinkProps> = ({
  variant = 'standard',
  role = 'tab',
  ...rest
}) => {
  return <StyledTabNavLink role={role} variant={variant} {...rest} />;
};
