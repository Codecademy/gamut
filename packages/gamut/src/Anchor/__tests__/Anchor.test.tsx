import { MiniWarningTriangleIcon } from '@codecademy/gamut-icons';
import { setupRtl } from '@codecademy/gamut-tests';
import { screen } from '@testing-library/react';

import { Anchor } from '..';

const anchorText = 'I am an anchor';
const href = 'https://example.com';
const renderView = setupRtl(Anchor, { children: anchorText, href });

describe('Anchor', () => {
  it('renders an anchor with the href', () => {
    const { view } = renderView();
    const anchorElement = view.getByRole('link');

    expect(anchorElement).toHaveAttribute('href', 'https://example.com');
  });

  it('renders an anchor with an icon and href', () => {
    const { view } = renderView({ icon: MiniWarningTriangleIcon });
    const anchorElement = view.getByRole('link');
    screen.getByRole('img', { hidden: true });

    expect(anchorElement).toHaveAttribute('href', 'https://example.com');
  });

  it('renders an anchor without an href as a button', () => {
    const { view } = renderView({ href: undefined });
    const buttonElement = view.getByRole('button');

    expect(buttonElement).toHaveTextContent(anchorText);
  });
});
