import { setupRtl } from '@codecademy/gamut-tests';
import React from 'react';
import { act } from 'react-dom/test-utils';

import { AccordionArea } from '..';

const renderView = setupRtl(AccordionArea, {
  children: <div data-testid="contents" />,
  expanded: false,
  top: 'Click me!',
});

jest.useFakeTimers();

describe('AccordionArea', () => {
  it('starts collapsed when expanded is not true', () => {
    const { view } = renderView({ expanded: false });

    expect(view.queryByTestId('contents')).toBeNull();
  });

  it('starts expanded when expanded is true', () => {
    const { view } = renderView({ expanded: true });

    view.getByTestId('contents');
  });

  it('expands when props change to expand', () => {
    const { update, view } = renderView({ expanded: false });

    update({ expanded: true });

    view.getByTestId('contents');
  });

  it('contracts after a delay when set to not expanded after being expanded', async () => {
    const { update, view } = renderView({ expanded: true });

    update({ expanded: false });

    await act(async () => {
      jest.runAllTimers();
    });

    expect(view.queryByTestId('contents')).toBeNull();
  });
});
