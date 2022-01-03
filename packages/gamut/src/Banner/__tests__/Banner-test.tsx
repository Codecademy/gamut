import { BackgroundProps } from '@codecademy/gamut-styles';
import { setupRtl } from '@codecademy/gamut-tests';
import userEvent from '@testing-library/user-event';
import React from 'react';

import { Box as MockBox } from '../../Box';
import { Banner, BannerVariant } from '..';

jest.mock('@codecademy/gamut-styles', () => ({
  ...jest.requireActual<{}>('@codecademy/gamut-styles'),
  Background: (props: BackgroundProps) => (
    <MockBox {...props} data-bg={props.bg} data-testid="mock-background" />
  ),
}));

const onClose = jest.fn();
const onCtaClick = jest.fn();

describe('Banner', () => {
  const renderView = setupRtl(Banner, {
    onClose,
    children: 'Hello world',
  });

  beforeEach(() => {
    jest.resetAllMocks();
  });

  it('renders children markdown children', () => {
    const { view } = renderView({});

    view.getByText('Hello world');
  });

  it('renders a button when a cta is provided in markdown', () => {
    const { view } = renderView({
      onCtaClick,
      children: '[Hello](/)',
    });

    const button = view.getByText('Hello');

    userEvent.click(button);

    expect(onCtaClick).toHaveBeenCalled();
  });

  it('calls the onClose callback when the close icon is clicked', () => {
    const { view } = renderView({});

    userEvent.click(view.getByRole('button'));

    expect(onClose).toHaveBeenCalled();
  });

  test.each([
    ['undefined', undefined],
    ['null', null],
    ['not a banner variant', ('test' as unknown) as BannerVariant],
    ['navy', 'navy' as const],
  ])('renders navy background when variant is %s', (_, variant) => {
    const { view } = renderView({ variant });

    expect(view.getByTestId('mock-background')).toHaveAttribute(
      'data-bg',
      'navy'
    );
  });

  it('renders yellow background when variant is yellow', () => {
    const { view } = renderView({ variant: 'yellow' });

    expect(view.getByTestId('mock-background')).toHaveAttribute(
      'data-bg',
      'yellow'
    );
  });
});
