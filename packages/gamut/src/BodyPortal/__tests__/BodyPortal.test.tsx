import { setupRtl } from '@codecademy/gamut-tests';

import { BodyPortal, BodyPortalProps } from '..';

const BodyPortalTest = (props?: Partial<BodyPortalProps>) => (
  <main>
    <BodyPortal {...props}>
      <div data-testid="portal-content">Howdy!</div>
    </BodyPortal>
  </main>
);

const renderView = setupRtl(BodyPortalTest, {});

describe('BodyPortal', () => {
  it('renders children outside its mounting container', () => {
    const { view } = renderView();

    const content = view.getByTestId('portal-content');
    expect(content.closest('main')).toBe(null);
    expect(document.body).toContainElement(content);
  });

  it('applies the floating z-index token by default', () => {
    const { view } = renderView();

    const content = view.getByTestId('portal-content');
    expect(content.parentElement).toHaveStyle({
      zIndex: 'var(--zIndexes-floating)',
    });
  });

  it('resolves a custom z-index token to its CSS variable', () => {
    const { view } = renderView({ zIndex: 'modal' });

    const content = view.getByTestId('portal-content');
    expect(content.parentElement).toHaveStyle({
      zIndex: 'var(--zIndexes-modal)',
    });
  });

  it('passes through a raw numeric z-index escape hatch', () => {
    const { view } = renderView({ zIndex: 550 });

    const content = view.getByTestId('portal-content');
    expect(content.parentElement).toHaveStyle({
      zIndex: 550,
    });
  });
});
