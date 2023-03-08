import { setupRtl } from '@codecademy/gamut-tests';
import { screen } from '@testing-library/react';

import { AddIcon } from '../dist/index';

const renderView = setupRtl(AddIcon);

describe('Compiled gamut-icons:', () => {
  it('Hides the icon from screen readers by default', async () => {
    renderView();

    const svgEl = screen.getByRole('img', { hidden: true });
    expect(svgEl.getAttribute('aria-hidden')).toEqual('true');
  });

  it('Sets a title and id automatically and uses the appropriate aria label', () => {
    renderView({
      size: 1,
    });

    const svgEl = screen.getByRole('img', { hidden: true });
    const titleEl = svgEl.querySelector('title');

    expect(svgEl.getAttribute('aria-labelledby')).toEqual(
      titleEl?.getAttribute('id')
    );
    expect(titleEl?.innerHTML).toEqual('Add Icon');
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
