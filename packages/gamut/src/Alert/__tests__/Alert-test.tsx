import { mount } from 'enzyme';
import React from 'react';

import { Alert } from '..';

describe('Alert', () => {
  const onClose = jest.fn();
  const onCtaClick = jest.fn();

  beforeEach(() => {
    jest.resetAllMocks();
  });

  it('renders without exploding', () => {
    const renderedAlert = mount(<Alert onClose={() => {}}>Hello</Alert>);

    expect(renderedAlert).toBeDefined();
  });

  it('does not render a close button when there is no onClose callback', () => {
    const renderedAlert = mount(<Alert>Hello</Alert>);

    const buttons = renderedAlert.find('button');

    expect(buttons).toHaveLength(0);
  });

  it('calls the onClose callback when the close button is clicked', () => {
    const onClose = jest.fn();
    const renderedAlert = mount(<Alert onClose={onClose}>Hello</Alert>);

    const close = renderedAlert.find('button').at(0);
    close.simulate('click');

    expect(onClose).toHaveBeenCalled();
  });

  it('renders a clickable CTA', () => {
    const renderedAlert = mount(
      <Alert onClose={onClose} cta={{ text: 'Click Me', onClick: onCtaClick }}>
        Hello
      </Alert>
    );

    const cta = renderedAlert.find('button').at(0);
    cta.simulate('click');

    expect(onCtaClick).toHaveBeenCalled();
    expect(cta.text()).toEqual('Click Me');
  });

  it('disables the cta if configured', () => {
    const renderedAlert = mount(
      <Alert
        onClose={onClose}
        cta={{ text: 'Click Me', onClick: onCtaClick, disabled: true }}
      >
        Hello
      </Alert>
    );

    const cta = renderedAlert.find('button').at(1);
    cta.simulate('click');

    expect(onCtaClick).not.toHaveBeenCalled();
  });

  it('renders the cta as a link if configured', () => {
    const renderedAlert = mount(
      <Alert
        onClose={onClose}
        cta={{ text: 'Click Me', onClick: onCtaClick, href: '/hello' }}
      >
        Hello
      </Alert>
    );

    const cta = renderedAlert.find('a').at(0);
    cta.simulate('click');

    expect(cta.prop('href')).toEqual('/hello');
    expect(onCtaClick).toHaveBeenCalled();
  });

  it('opens the cta in a new tab unless specified', () => {
    const newTabAlert = mount(
      <Alert
        onClose={onClose}
        cta={{ text: 'Click Me', onClick: onCtaClick, href: '/hello' }}
      >
        Hello
      </Alert>
    );

    const cta = newTabAlert.find('a').at(0);
    expect(cta.prop('target')).toEqual('_blank');

    const sameTabAlert = mount(
      <Alert
        onClose={onClose}
        cta={{
          text: 'Click Me',
          onClick: onCtaClick,
          href: '/hello',
          openInSameTab: true,
        }}
      >
        Hello
      </Alert>
    );
    const specialCta = sameTabAlert.find('a').at(0);
    expect(specialCta.prop('target')).toEqual(undefined);
  });

  it('truncates any children to a limited number of lines', () => {
    const renderedAlert = mount(
      <Alert
        onClose={onClose}
        cta={{ text: 'Click Me', onClick: onCtaClick, href: '/hello' }}
        lines={2}
      >
        Hello
      </Alert>
    );

    const renderedTruncated = renderedAlert.find('Truncate');

    expect(renderedTruncated.prop('lines')).toEqual(2);
  });

  it('automatically displays content as expanded if no lines are set', () => {
    const renderedAlert = mount(
      <Alert
        onClose={onClose}
        cta={{ text: 'Click Me', onClick: onCtaClick, href: '/hello' }}
      >
        Hello
      </Alert>
    );

    const renderedTruncated = renderedAlert.find('Truncate');
    expect(renderedTruncated.prop('expanded')).toEqual(true);
  });

  it('renders a clickable button to expand the truncated section', () => {
    const renderedAlert = mount(
      <Alert
        onClose={onClose}
        cta={{ text: 'Click Me', onClick: onCtaClick }}
        lines={2}
      >
        Hello
      </Alert>
    );

    const buttons = renderedAlert.find('button');

    expect(buttons.length).toEqual(3);
    buttons.at(0).simulate('click');

    renderedAlert.update();

    expect(renderedAlert.find('Truncate').prop('expanded')).toEqual(true);
  });

  it('renders a clickable button to collapse the truncated section when clicked twice', () => {
    const renderedAlert = mount(
      <Alert
        onClose={onClose}
        cta={{ text: 'Click Me', onClick: onCtaClick }}
        lines={2}
      >
        Hello
      </Alert>
    );

    const buttons = renderedAlert.find('button');
    expect(buttons.length).toBe(3);

    buttons.at(0).simulate('click');

    renderedAlert.update();

    buttons.at(0).simulate('click');

    renderedAlert.update();

    expect(renderedAlert.find('Truncate').prop('lines')).toEqual(2);
  });
});
