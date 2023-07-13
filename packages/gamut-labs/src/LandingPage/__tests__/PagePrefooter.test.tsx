import { setupRtl } from '@codecademy/gamut-tests';

import { PagePrefooter } from '..';

const renderView = setupRtl(PagePrefooter);

describe('PagePrefooter', () => {
  it('should render a title when one is provided', () => {
    const { view } = renderView({ title: 'title' });

    view.getByText('title');
  });

  it('should render a description when one is provided', () => {
    const { view } = renderView({ desc: 'desc' });

    view.getByText('desc');
  });

  it('should render a button when cta prop is provided', () => {
    const { view } = renderView({
      cta: { text: 'cta', href: 'https://codecademy.com' },
    });

    view.getByRole('link', { name: 'cta' });
  });

  it('should not render anything when no props are provided', () => {
    const { view } = renderView();

    expect(view.queryByText(/.+/)).not.toBeInTheDocument();
  });
});
