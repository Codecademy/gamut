import { setupRtl } from '@codecademy/gamut-tests';
import { fireEvent, screen } from '@testing-library/react';

import { Toast } from '../Toast';

const onClose = jest.fn();
const renderView = setupRtl(Toast, {
  children: 'I am a toast',
  onClose,
});

describe('Toast', () => {
  it('renders a close button by default', () => {
    renderView();
    fireEvent.click(screen.getByRole('button'));

    expect(onClose).toHaveBeenCalled();
  });

  it('does not provision an icon area by default', () => {
    renderView();
    const toast = screen.getByRole('status');

    expect(toast.childNodes.length).toBe(3);
  });

  it('renders an image as a background when specified', () => {
    renderView({ icon: './myimg.svg' });
    const toast = screen.getByRole('status');

    expect(toast.childNodes.length).toBe(4);
    expect(toast.childNodes[0].childNodes.length).toEqual(0);
  });

  it('wraps any icon element passed when specified', () => {
    renderView({ icon: <div /> });
    const toast = screen.getByRole('status');

    expect(toast.childNodes.length).toBe(4);
    expect(toast.childNodes[0].childNodes.length).toEqual(1);
  });
});
