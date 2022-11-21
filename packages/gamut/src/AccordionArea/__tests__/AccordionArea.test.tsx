import { setupRtl } from '@codecademy/gamut-tests';
import React from 'react';
import { act } from 'react-dom/test-utils';

import { AccordionArea } from '..';

const defaultProps = {
  children: <div data-testid="contents" />,
  top: 'Click me!',
};
const renderView = setupRtl(AccordionArea, defaultProps);

jest.useFakeTimers();

describe('AccordionArea', () => {
  it('starts collapsed when expanded is not true', () => {
    const { view } = renderView({ expanded: false });

    expect(view.queryByTestId('contents')).toBeNull();
  });

  it('starts expanded when expanded is true', () => {
    const { view } = renderView({ expanded: true });

    expect(view.getAllByTestId('contents')).toHaveLength(1);
  });

  it('expands when props change to expand', () => {
    const { view } = renderView({ expanded: false });

    view.rerender(<AccordionArea {...defaultProps} expanded />);

    expect(view.getAllByTestId('contents')).toHaveLength(1);
  });

  it('contracts after a delay when set to not expanded after being expanded', async () => {
    const { view } = renderView({ expanded: true });

    view.rerender(<AccordionArea {...defaultProps} expanded={false} />);

    await act(async () => {
      jest.runAllTimers();
    });

    expect(view.queryByTestId('contents')).toBeNull();
  });
});
