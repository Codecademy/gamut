import { setupRtl } from '@codecademy/gamut-tests';

import { Toaster } from '..';

const onClose = jest.fn();
const toasts = [
  {
    id: 'toast-1',
    title: 'Status Toast 1',
  },
  {
    id: 'toast-2',
    title: 'Status Toast 2 ',
  },
  {
    id: 'toast-3',
    title: 'Status Toast 3',
  },
];
const renderView = setupRtl(Toaster, {
  toasts,
  onClose,
});

describe('Toaster', () => {
  it('renders a number of toasts based on toasts length', () => {
    const { view } = renderView();

    expect(view.getAllByText(/Status Toast/i)).toHaveLength(3);
  });

  it('renders the first toast on bottom', () => {
    const { view } = renderView();

    expect(view.getAllByText(/Status Toast/i)[0].innerHTML).toBe(
      'Status Toast 1'
    );
  });

  it('renders the last toast on top', () => {
    const { view } = renderView();

    expect(view.getAllByText(/Status Toast/i)[2].innerHTML).toBe(
      'Status Toast 3'
    );
  });
});
