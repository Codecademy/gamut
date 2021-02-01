import { mount } from 'enzyme';
import React from 'react';

import { Truncate } from '..';

describe('Truncate', () => {
  it('configured truncate markup if defined', () => {
    const renderedTruncate = mount(<Truncate lines={2}>Hello</Truncate>);

    expect(renderedTruncate.find('TruncateMarkup')).toBeDefined();
  });

  it('renders a span by default if expanded', () => {
    const renderedTruncate = mount(
      <Truncate expanded lines={2}>
        Hello
      </Truncate>
    );

    expect(renderedTruncate.find('TruncateMarkup').length).toBe(0);
    expect(renderedTruncate.find('span').length).toBe(1);
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
