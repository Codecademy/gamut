import React from 'react';
import { Notification } from '..';
import { mount } from 'enzyme';

describe('Notification', () => {
  const onClose = jest.fn();
  const onCtaClick = jest.fn();

  beforeEach(() => {
    jest.resetAllMocks();
  });

  it('renders without exploding', () => {
    const renderedNotification = mount(
      <Notification onClose={() => {}}>Hello</Notification>
    );

    expect(renderedNotification).toBeDefined();
  });

  it('calls the onClose callback when the close button is clicked', () => {
    const onClose = jest.fn();
    const renderedNotification = mount(
      <Notification onClose={onClose}>Hello</Notification>
    );

    const close = renderedNotification.find('button').at(0);
    close.simulate('click');

    expect(onClose).toHaveBeenCalled();
  });

  it('renders a clickable CTA', () => {
    const renderedNotification = mount(
      <Notification
        onClose={onClose}
        cta={{ text: 'Click Me', onClick: onCtaClick }}
      >
        Hello
      </Notification>
    );

    const cta = renderedNotification.find('button').at(0);
    cta.simulate('click');

    expect(onCtaClick).toHaveBeenCalled();
    expect(cta.text()).toEqual('Click Me');
  });

  it('disables the cta if configured', () => {
    const renderedNotification = mount(
      <Notification
        onClose={onClose}
        cta={{ text: 'Click Me', onClick: onCtaClick, disabled: true }}
      >
        Hello
      </Notification>
    );

    const cta = renderedNotification.find('button').at(1);
    cta.simulate('click');

    expect(onCtaClick).not.toHaveBeenCalled();
  });

  it('renders the cta as a link if configured', () => {
    const renderedNotification = mount(
      <Notification
        onClose={onClose}
        cta={{ text: 'Click Me', onClick: onCtaClick, href: '/hello' }}
      >
        Hello
      </Notification>
    );

    const cta = renderedNotification.find('a').at(0);
    cta.simulate('click');

    expect(cta.prop('href')).toEqual('/hello');
    expect(onCtaClick).toHaveBeenCalled();
  });

  it('truncates any children to a limited number of lines', () => {
    const renderedNotification = mount(
      <Notification
        onClose={onClose}
        cta={{ text: 'Click Me', onClick: onCtaClick, href: '/hello' }}
        lines={2}
      >
        Hello
      </Notification>
    );

    const renderedTruncated = renderedNotification.find('Truncate');

    expect(renderedTruncated.prop('lines')).toEqual(2);
  });

  it('renders an expandable button for any truncated text', () => {
    const renderedNotification = mount(
      <Notification
        onClose={onClose}
        cta={{ text: 'Click Me', onClick: onCtaClick }}
        lines={2}
      >
        Hello
      </Notification>
    );

    const buttons = renderedNotification.find('button');

    expect(buttons.length).toEqual(3);
    buttons.at(0).simulate('click');

    renderedNotification.update();

    expect(renderedNotification.find('Truncate').prop('lines')).toEqual(
      undefined
    );

    renderedNotification
      .find('button')
      .at(0)
      .simulate('click');

    renderedNotification.update();

    expect(renderedNotification.find('Truncate').prop('lines')).toEqual(2);
  });
});
