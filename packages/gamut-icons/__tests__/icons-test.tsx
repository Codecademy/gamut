import { setupRtl } from '@codecademy/gamut-tests';

import { AddIcon } from '../dist/index';

const renderView = setupRtl(AddIcon);

describe('Compiled gamut-icons', () => {
  it('hides the icon from screen readers by default', () => {
    const { view } = renderView();

    expect(view.getByRole('img', { hidden: true })).toHaveAttribute(
      'aria-hidden',
      'true'
    );
  });

  it('sets a title and id and uses the appropriate aria label', () => {
    const { view } = renderView({
      size: 1,
      titleId: 'title-id',
    });

    expect(view.getByRole('img', { hidden: true })).toHaveAttribute(
      'aria-labelledby',
      'title-id'
    );
    view.getByTitle('Add Icon');
  });

  it('allows passing a custom title', () => {
    const { view } = renderView({
      title: 'Accessible',
    });

    view.getByTitle('Accessible');
  });

  it('sets a default fill of currentColor', () => {
    const { view } = renderView();

    expect(view.getByRole('img', { hidden: true })).toHaveAttribute(
      'fill',
      'currentColor'
    );
  });
});
