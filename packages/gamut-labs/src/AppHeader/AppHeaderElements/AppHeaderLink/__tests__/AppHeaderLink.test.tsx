import { Badge } from '@codecademy/gamut';
import { setupRtl } from '@codecademy/gamut-tests';
import { fireEvent } from '@testing-library/react';

import { createMockAppHeaderLinkItem } from '../../../mockAppHeaderItems';
import { AppHeaderLink } from '..';

const testText = 'Test Link';
const action = jest.fn();

const item = createMockAppHeaderLinkItem('test-link', 'test-url', testText);

const renderView = setupRtl(AppHeaderLink, {
  action,
  item: createMockAppHeaderLinkItem('test-link', 'test-url', testText),
});

describe('AppHeaderLink', () => {
  it('calls action() when clicked', () => {
    const { view } = renderView();

    fireEvent.click(view.getByRole('menuitem'));

    expect(action).toHaveBeenCalled();
  });

  it('renders badge when badge prop is included', () => {
    const { view } = renderView({
      item: { ...item, badge: <Badge>New</Badge> },
    });

    view.getByText('New');
  });

  it('does not render badge when badge prop is not included', () => {
    const { view } = renderView();

    expect(view.queryByText('New')).toBeNull();
  });
});
