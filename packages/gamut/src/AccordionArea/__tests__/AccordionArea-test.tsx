import { setupEnzyme } from '@codecademy/gamut-tests';
import React from 'react';
import { act } from 'react-dom/test-utils';

import { AccordionArea } from '..';

const renderWrapper = setupEnzyme(AccordionArea, {
  children: <div data-testid="contents" />,
  expanded: false,
  top: 'Click me!',
});

jest.useFakeTimers();

describe('AccordionArea', () => {
  it('starts collapsed when expanded is not true', () => {
    const { wrapper } = renderWrapper({ expanded: false });

    expect(wrapper.find(`[data-testid="contents"]`)).toHaveLength(0);
  });

  it('starts expanded when expanded is true', () => {
    const { wrapper } = renderWrapper({ expanded: true });

    expect(wrapper.find(`[data-testid="contents"]`)).toHaveLength(1);
  });

  it('expands when props change to expand', () => {
    const { wrapper } = renderWrapper({ expanded: false });

    wrapper.setProps({ expanded: true });

    expect(wrapper.find(`[data-testid="contents"]`)).toHaveLength(1);
  });

  it('contracts after a delay when set to not expanded after being expanded', async () => {
    const { wrapper } = renderWrapper({ expanded: true });

    wrapper.setProps({ expanded: false });
    await act(async () => {
      jest.runAllTimers();
    });
    wrapper.setProps(wrapper.props());

    expect(wrapper.find(`[data-testid="contents"]`)).toHaveLength(0);
  });
});
