import { AppHeaderLinkItem } from './AppHeaderElements/types';

export const createMockAppHeaderLinkItem = (
  id: string,
  href: string,
  text: string
): AppHeaderLinkItem => {
  return {
    dataTestId: `app-header-link-${id}`,
    id,
    href,
    text,
    trackingTarget: '',
    type: 'link',
  };
};
