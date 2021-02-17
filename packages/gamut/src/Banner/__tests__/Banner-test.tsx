import { setupEnzyme } from '@codecademy/gamut-tests';
import React from 'react';

import { IconButton, TextButton } from '../../Button';
import { Banner } from '..';

const onClose = jest.fn();
const onCtaClick = jest.fn();

describe('Banner', () => {
  const renderWrapper = setupEnzyme(Banner, {
    onClose,
    children: <span className="test">Hello</span>,
  });

  beforeEach(() => {
    jest.resetAllMocks();
  });

  it('renders children when closing has not been requested', () => {
    const { wrapper } = renderWrapper({});

    expect(wrapper.find('span.test')).toHaveLength(1);
  });

  it('renders a button when a cta is provided', () => {
    const { wrapper } = renderWrapper({
      cta: 'Learn more',
      href: '#',
      onCtaClick,
    });

    const CTA = wrapper.find(TextButton);
    expect(CTA).toHaveLength(2);

    CTA.at(0).simulate('click');

    expect(onCtaClick).toHaveBeenCalled();
  });
  it('calls the onClose callback when the close icon is clicked', () => {
    const { wrapper } = renderWrapper({});

    wrapper.find(IconButton).simulate('click');

    expect(onClose).toHaveBeenCalled();
  });
});
