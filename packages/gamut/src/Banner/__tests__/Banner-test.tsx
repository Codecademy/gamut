import { shallow } from 'enzyme';
import React from 'react';

import { IconButton, TextButton } from '../../Button';
import { Banner } from '..';

const onClose = jest.fn();
const onCtaClick = jest.fn();

describe('Banner', () => {
  beforeEach(() => {
    jest.resetAllMocks();
  });

  it('renders children when closing has not been requested', () => {
    const children = <span className="test" />;
    const component = shallow(<Banner onClose={onClose}>{children}</Banner>);

    expect(component.find('span.test')).toHaveLength(1);
  });

  it('renders a button when a cta is provided', () => {
    const component = shallow(
      <Banner
        cta="Learn more"
        href="#"
        onCtaClick={onCtaClick}
        onClose={onClose}
      />
    );
    const CTA = component.find(TextButton);
    expect(CTA).toHaveLength(1);

    CTA.simulate('click');

    expect(onCtaClick).toHaveBeenCalled();
  });

  it('renders a button when a cta is provided', () => {
    const component = shallow(
      <Banner
        cta="Learn more"
        href="#"
        onCtaClick={onCtaClick}
        onClose={onClose}
      />
    );

    expect(component.find(TextButton)).toHaveLength(1);
  });

  it('calls the onClose callback when the close icon is clicked', () => {
    const component = shallow(<Banner onClose={onClose}>Hello</Banner>);

    component.find(IconButton).simulate('click');

    expect(onClose).toHaveBeenCalled();
  });
});
