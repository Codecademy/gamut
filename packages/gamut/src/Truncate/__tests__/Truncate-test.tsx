import React from 'react';
import { mount } from 'enzyme';
import { Truncate } from '..';

describe('Truncate', () => {
  it('configured truncate markup if defined', () => {
    const renderedTruncate = mount(<Truncate lines={2}>Hello</Truncate>);

    expect(renderedTruncate.find('TruncateMarkup')).toBeDefined();
  });

  it('renders a span by default if not truncating', () => {
    const renderedTruncate = mount(<Truncate lines={false}>Hello</Truncate>);

    expect(renderedTruncate.find('TruncateMarkup').length).toBe(0);
    expect(renderedTruncate.find('span').length).toBe(1);
  });

  it('can be rendered as other elements if specified', () => {
    let renderedTruncate = mount(
      <Truncate lines={false} as="p">
        Hello
      </Truncate>
    );

    expect(renderedTruncate.find('p').length).toBe(1);

    renderedTruncate = mount(
      <Truncate lines={false} as="div">
        Hello
      </Truncate>
    );

    expect(renderedTruncate.find('div').length).toBe(1);
  });

  it('takes a callback to be called when text is truncated', () => {
    const onTruncate = jest.fn();

    mount(
      <Truncate lines={2} onTruncate={onTruncate}>
        Hello
      </Truncate>
    );

    expect(onTruncate).toHaveBeenCalled();
    expect(onTruncate).toHaveBeenCalledWith(true);
  });
});
