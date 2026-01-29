/* eslint-disable jsx-a11y/no-distracting-elements */
import { setupRtl } from '@codecademy/gamut-tests';

import { MarkdownAnchor } from '../index';

const renderView = setupRtl(MarkdownAnchor);

describe('MarkdownAnchor', () => {
  it('Adds target _blank to external links', () => {
    const { view } = renderView({ href: 'http://google.com' });
    const link = view.getByRole('link');

    expect(link).toHaveAttribute('target', '_blank');
  });

  it('Adds target _blank to same-origin links', () => {
    const { view } = renderView({
      href: `${window.location.origin}/search`,
    });
    const link = view.getByRole('link');

    expect(link).toHaveAttribute('target', '_blank');
  });

  it('Adds rel="noopener" to external links', () => {
    const { view } = renderView({ href: 'http://google.com' });
    const link = view.getByRole('link');

    expect(link).toHaveAttribute('rel', 'noopener');
  });

  it('Doesn\'t add rel="noopener" to relative links', () => {
    const { view } = renderView({ href: '/search' });
    const link = view.getByRole('link');

    expect(link).not.toHaveAttribute('rel');
  });

  it('Doesn\'t add rel="noopener" to same-origin links', () => {
    const { view } = renderView({
      href: `${window.location.origin}/search`,
    });
    const link = view.getByRole('link');

    expect(link).not.toHaveAttribute('rel');
  });

  it("Doesn't throw an error on an invalid URL", () => {
    const { view } = renderView({ href: 'www.codecademy.com' });
    const link = view.getByRole('link');

    expect(link).toHaveAttribute('href', 'www.codecademy.com');
  });

  it('renders its children', () => {
    const text = 'natalie rulez';
    const { view } = renderView({ href: '/', children: text });
    const link = view.getByRole('link');

    expect(link).toHaveTextContent(text);
  });
});
