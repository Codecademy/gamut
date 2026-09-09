import { setupRtl } from '@codecademy/gamut-tests';
import { ComponentProps } from 'react';

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

  it('forwards data-* and aria-* attributes to the container', () => {
    const containerProps = {
      'data-marker': 'toaster',
      'aria-keyshortcuts': 't',
    } as Partial<ComponentProps<typeof Toaster>>;
    const { view } = renderView(containerProps);

    const container = view.baseElement.querySelector('[data-marker="toaster"]');
    expect(container).toHaveAttribute('aria-keyshortcuts', 't');
  });

  it('forwards per-toast data-* and aria-* attributes to the individual toast', () => {
    const toastsWithMarker = [
      {
        id: 'toast-1',
        title: 'Status Toast 1',
        'data-marker': 'toast-1',
        'aria-keyshortcuts': 't1',
      },
    ];
    const { view } = renderView({ toasts: toastsWithMarker });

    const toast = view.baseElement.querySelector('[data-marker="toast-1"]');
    expect(toast).toHaveAttribute('aria-keyshortcuts', 't1');
  });
});
