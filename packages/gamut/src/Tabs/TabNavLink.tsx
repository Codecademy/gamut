import styled from '@emotion/styled';

import { TabButton } from './TabButton';

const StyledTabNavLink = styled(TabButton)();

<<<<<<< HEAD
TabNavLink.defaultProps = {
  variant: 'standard',
  role: 'tab',
=======
export const TabNavLink: React.FC<ComponentProps<typeof StyledTabNavLink>> = ({
  variant = 'standard',
  roles = 'tab',
  ...rest
}) => {
  return <StyledTabNavLink roles={roles} variant={variant} {...rest} />;
>>>>>>> 678a6f54d (form group)
};
