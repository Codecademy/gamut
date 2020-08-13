import { shallow } from 'enzyme';
import React from 'react';

import { Button } from '../../Button';
import { Banner } from '..';
import styles from ' ../styles.module.scss';

describe('Banner', () => {
  it('renders children when closing has not been requested', () => {
    const children = <span className="test" />;
    const component = shallow(<Banner onClose={() => {}}>{children}</Banner>);

    expect(component.find('span.test')).toHaveLength(1);
  });

  it('does not render anything if it is closed', () => {
    const component = shallow(<Banner onClose={() => {}} isClosed />);

    expect(component.children().length).toBe(0);
  });

  it('renders a button always', () => {
    const component = shallow(<Banner onClose={() => {}} />);

    expect(component.find(Button)).toHaveLength(1);
  });

  it('renders as full width by default', () => {
    const component = shallow(<Banner onClose={() => {}} />);

    expect(component.at(0).hasClass(styles.containerFullWidth)).toBe(true);
  });

  it('renders with border bottom', () => {
    const component = shallow(<Banner onClose={() => {}} />);

    expect(component.at(0).hasClass(styles.containerFullWidth)).toBe(true);
  });

  it('does not render an icon when an no icon is provided', () => {
    const component = shallow(<Banner onClose={() => {}} />);
    component.update();

    expect(component.find("div[data-testid='icon-id']")).toHaveLength(0);
  });

  it('renders an icon when an icon is provided', () => {
    const TestIcon = () => <div />;
    const component = shallow(
      <Banner onClose={() => {}} icon={<TestIcon />} />
    );

    expect(component.find(TestIcon)).toHaveLength(1);
    expect(component.find("div[data-testid='icon-id']")).toHaveLength(1);
  });

  it('calls the onClose callback when the close icon is clicked', () => {
    const onClose = jest.fn();
    const component = shallow(<Banner onClose={onClose} />);

    component.find(Button).simulate('click');

    expect(onClose).toHaveBeenCalled();
  });
});
