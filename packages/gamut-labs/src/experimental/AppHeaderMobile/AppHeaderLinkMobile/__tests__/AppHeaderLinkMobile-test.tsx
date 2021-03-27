import { setupRtl } from '@codecademy/gamut-tests';
import React from 'react';

import { AppHeaderLinkMobile } from '..';

const testText = 'Test Link';
const action = jest.fn();

const renderView = setupRtl(AppHeaderLinkMobile, {
  action,
  item: {
    dataTestId: '',
    id: 'test-link',
    href: 'test-url',
    text: testText,
    trackingTarget: '',
    type: 'link',
    icon: () => <svg />,
  },
});

describe('AppHeaderLinkMobile', () => {
  it('calls action() when clicked', () => {
    renderView().view.getByRole('link').click();
    expect(action).toHaveBeenCalled();
  });
});
