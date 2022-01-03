import { setupRtl } from '@codecademy/gamut-tests';
import userEvent from '@testing-library/user-event';
import React from 'react';

import { Accordion } from '..';

const renderView = setupRtl(Accordion, {
  children: <div data-testid="contents" />,
  top: 'Click me!',
});

jest.useFakeTimers();

describe('Accordion', () => {
  it('starts collapsed when initiallyExpanded is not true', () => {
    const { view } = renderView({ initiallyExpanded: false });

    expect(view.queryByTestId('contents')).toBeNull();
  });

  it('starts expanded when initiallyExpanded is true', () => {
    const { view } = renderView({ initiallyExpanded: true });

    view.getByTestId('contents');
  });

  it('expands when its button is clicked', () => {
    const { view } = renderView({ initiallyExpanded: true });

    userEvent.click(view.getByRole('button'));

    view.getByTestId('contents');
  });

  it('calls onClick when its button is clicked and onClick is provided', () => {
    const onClick = jest.fn();
    const { view } = renderView({ onClick });

    userEvent.click(view.getByRole('button'));

    expect(onClick).toHaveBeenCalledWith(true);
  });
});
