import { setupRtl } from '@codecademy/gamut-tests';

import { Text } from '..';

const renderView = setupRtl(Text, { children: 'text content' });

describe('Text', () => {
  it('renders children', () => {
    const { view } = renderView();

    view.getByText('text content');
  });

  it('renders as a span by default', () => {
    const { view } = renderView();

    expect(view.getByText('text content').tagName.toLowerCase()).toBe('span');
  });

  it('renders as a heading when as="h1"', () => {
    const { view } = renderView({ as: 'h1' });

    view.getByRole('heading', { level: 1, name: 'text content' });
  });

  it('renders as a paragraph when as="p"', () => {
    const { view } = renderView({ as: 'p' });

    expect(view.getByText('text content').tagName.toLowerCase()).toBe('p');
  });

  it('renders as a div when as="div"', () => {
    const { view } = renderView({ as: 'div' });

    expect(view.getByText('text content').tagName.toLowerCase()).toBe('div');
  });

  it('renders with a display variant', () => {
    const { view } = renderView({ variant: 'title-lg' });

    view.getByText('text content');
  });
});
