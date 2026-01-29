import { setupRtl } from '@codecademy/gamut-tests';
import { fireEvent } from '@testing-library/dom';
import { act } from 'react';

import { AccordionDeprecated } from '..';

const renderView = setupRtl(AccordionDeprecated, {
  children: <div data-testid="contents" />,
  top: 'Click me!',
});
jest.useFakeTimers();

describe('AccordionDeprecated', () => {
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
    act(() => {
      fireEvent.click(view.getByRole('button'));
    });
    view.getByTestId('contents');
  });

  it('calls onClick when its button is clicked and onClick is provided', () => {
    const onClick = jest.fn();
    const { view } = renderView({ onClick });
    act(() => {
      fireEvent.click(view.getByRole('button'));
    });

    expect(onClick).toHaveBeenCalledWith(true);
  });
});
