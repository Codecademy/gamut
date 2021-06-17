import styled from '@emotion/styled';

import { Anchor, AnchorProps } from './Anchor';

export interface LinkProps extends AnchorProps {}
export const Link = styled(Anchor)();

Link.defaultProps = {
  variant: 'interface',
};
