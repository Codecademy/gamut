import { setupRtl } from '@codecademy/gamut-tests';
import { screen } from '@testing-library/react';

import { AddIcon } from '../src/index';

const renderView = setupRtl(AddIcon);

describe('Compiled gamut-icons:', () => {
  it('Hides the icon from screen readers by default', async () => {
    renderView();

    const svgEl = screen.getByRole('img', { hidden: true });
    expect(svgEl.getAttribute('aria-hidden')).toEqual('true');
  });

  it('Sets a mask and maskid automatically', () => {
    renderView({
      size: 1,
    });

    const svgEl = screen.getByRole('img', { hidden: true });
    const maskEl = svgEl.querySelector('mask');

    expect(maskEl?.getAttribute('id')).toMatch(/.*?AddIcon(.*)/);
  });

  it('Allows passing a custom title', () => {
    renderView({
      title: 'Accessible',
    });

    const svgEl = screen.getByRole('img', { hidden: true });
    const titleEl = svgEl.querySelector('title');

    expect(titleEl?.innerHTML).toEqual('Accessible');
  });

  it('Sets a default fill of #fff', () => {
    renderView();

    const svgEl = screen.getByRole('img', { hidden: true });
    expect(svgEl.getAttribute('fill')).toEqual('#fff');
  });
});
