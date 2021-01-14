import { setupEnzyme } from '@codecademy/gamut-tests';
import React from 'react';
import { act } from 'react-dom/test-utils';

import { Accordion, AccordionProps } from '..';

const renderWrapper = setupEnzyme(Accordion, {
  children: <div data-testid="contents" />,
  top: 'Click me!',
});

jest.useFakeTimers();

describe('Accordion', () => {
  it('starts collapsed when initiallyExpanded is not true', () => {
    const { wrapper } = renderWrapper({ initiallyExpanded: false });

    expect(wrapper.find(`[data-testid="contents"]`)).toHaveLength(0);
  });

  it('starts expanded when initiallyExpanded is true', () => {
    const { wrapper } = renderWrapper({ initiallyExpanded: true });

    expect(wrapper.find(`[data-testid="contents"]`)).toHaveLength(1);
  });

  it('expands when its button is clicked', () => {
    const { wrapper } = renderWrapper({ initiallyExpanded: true });

    wrapper.find('button').simulate('click');

    expect(wrapper.find(`[data-testid="contents"]`)).toHaveLength(1);
  });

  it('calls onClick when its button is clicked and onClick is provided', () => {
    const onClick = jest.fn();
    const { wrapper } = renderWrapper({ onClick });

    act(() => {
      wrapper.find('button').simulate('click');
    });

    expect(onClick).toHaveBeenCalledWith(true);
  });
});
