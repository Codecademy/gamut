import { zIndexes } from '@codecademy/gamut-styles';
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
      zIndex: zIndexes.floating,
    });
  });

  it('applies a custom zIndex when provided', () => {
    const { view } = renderView({ zIndex: zIndexes.modal });

    const content = view.getByTestId('portal-content');
    expect(content.parentElement).toHaveStyle({
      zIndex: zIndexes.modal,
    });
  });
});
