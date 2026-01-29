import { setupRtl } from '@codecademy/gamut-tests';
import { act } from 'react';

import { AccordionAreaDeprecated } from '..';

const defaultProps = {
  children: <div data-testid="contents" />,
  top: 'Click me!',
};
const renderView = setupRtl(AccordionAreaDeprecated, defaultProps);
jest.useFakeTimers();

describe('AccordionAreaDeprecated', () => {
  it('starts collapsed when expanded is not true', () => {
    const { view } = renderView({ expanded: false });

    expect(view.queryByTestId('contents')).toBeNull();
  });

  it('starts expanded when expanded is true', () => {
    const { view } = renderView({ expanded: true });
    view.getByTestId('contents');
  });

  it('expands when props change to expand', () => {
    const { view } = renderView({ expanded: false });
    view.rerender(<AccordionAreaDeprecated {...defaultProps} expanded />);
    view.getByTestId('contents');
  });

  it('contracts after a delay when set to not expanded after being expanded', async () => {
    const { view } = renderView({ expanded: true });
    view.rerender(
      <AccordionAreaDeprecated {...defaultProps} expanded={false} />
    );
    await act(async () => {
      jest.runAllTimers();
    });

    expect(view.queryByTestId('contents')).toBeNull();
  });
});
