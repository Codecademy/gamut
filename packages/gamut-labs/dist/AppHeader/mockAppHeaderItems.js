export var createMockAppHeaderLinkItem = function createMockAppHeaderLinkItem(id, href, text) {
  return {
    dataTestId: "app-header-link-".concat(id),
    id: id,
    href: href,
    text: text,
    trackingTarget: '',
    type: 'link'
  };
};