import { setupRtl } from '@codecademy/gamut-tests';

import { createMockAppHeaderLinkItem } from '../../../mockAppHeaderItems';
import { AppHeaderLink } from '..';

const testText = 'Test Link';
const action = jest.fn();

const renderView = setupRtl(AppHeaderLink, {
  action,
  item: createMockAppHeaderLinkItem('test-link', 'test-url', testText),
});

describe('AppHeaderLink', () => {
  it('calls action() when clicked', () => {
    renderView().view.getByRole('link').click();
    expect(action).toHaveBeenCalled();
  });
});
