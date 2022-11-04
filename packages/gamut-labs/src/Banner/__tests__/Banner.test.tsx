import { theme } from '@codecademy/gamut-styles';
import { setupRtl } from '@codecademy/gamut-tests';
import { fireEvent, queryByAttribute } from '@testing-library/dom';

import { Banner, BannerVariant } from '..';

const getById = queryByAttribute.bind(null, 'id');

const onClose = jest.fn();
const onCtaClick = jest.fn();

const renderView = setupRtl(Banner, {
  onClose,
  children: 'Hello world',
  id: 'banner',
});

describe('Banner', () => {
  it('renders children markdown children', () => {
    const { view } = renderView();

    view.getByText('Hello world');
  });

  it('renders a button when a cta is provided in markdown', () => {
    const { view } = renderView({
      onCtaClick,
      children: '[Hello](/)',
    });

    const button = view.getByRole('link', { name: 'Hello' });

    fireEvent.click(button);

    expect(onCtaClick).toHaveBeenCalled();
  });

  it('calls the onClose callback when the close icon is clicked', () => {
    const { view } = renderView();

    fireEvent.click(view.getByLabelText('dismiss'));

    expect(onClose).toHaveBeenCalled();
  });

  test.each([
    ['undefined', undefined],
    ['null', null],
    ['not a banner variant', ('test' as unknown) as BannerVariant],
    ['navy', 'navy' as const],
  ])('renders navy background when variant is %s', (_, bannerVariant) => {
    const { view } = renderView({ variant: bannerVariant });

    const background = getById(view.container, 'banner');
    expect(background).toHaveStyle(
      `--color-background-current: ${theme.colors.navy}`
    );
  });

  it('renders yellow background when variant is yellow', () => {
    const { view } = renderView({
      variant: 'yellow',
    });

    const background = getById(view.container, 'banner');
    expect(background).toHaveStyle(
      `--color-background-current: ${theme.colors.yellow}`
    );
  });
});
