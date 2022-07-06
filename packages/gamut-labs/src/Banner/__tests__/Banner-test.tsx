import { IconButton, TextButton } from '@codecademy/gamut';
import { Background } from '@codecademy/gamut-styles';
import { setupEnzyme } from '@codecademy/gamut-tests';

import { Banner, BannerVariant } from '..';

const onClose = jest.fn();
const onCtaClick = jest.fn();

describe('Banner', () => {
  const renderWrapper = setupEnzyme(Banner, {
    onClose,
    children: 'Hello world',
  });

  beforeEach(() => {
    jest.resetAllMocks();
  });

  it('renders children markdown children', () => {
    const { wrapper } = renderWrapper({});

    expect(wrapper.find('p').text()).toEqual('Hello world');
  });

  it('renders a button when a cta is provided in markdown', () => {
    const { wrapper } = renderWrapper({
      onCtaClick,
      children: '[Hello](/)',
    });

    const CTA = wrapper.find(TextButton);
    expect(CTA).toHaveLength(1);

    expect(CTA.at(0).text()).toEqual('Hello');
    CTA.at(0).simulate('click');

    expect(onCtaClick).toHaveBeenCalled();
  });

  it('calls the onClose callback when the close icon is clicked', () => {
    const { wrapper } = renderWrapper({});

    wrapper.find(IconButton).simulate('click');

    expect(onClose).toHaveBeenCalled();
  });

  test.each([
    ['undefined', undefined],
    ['null', null],
    ['not a banner variant', ('test' as unknown) as BannerVariant],
    ['navy', 'navy' as const],
  ])('renders navy background when variant is %s', (_, bannerVariant) => {
    const { wrapper } = renderWrapper({ variant: bannerVariant });

    expect(wrapper.find(Background).props().bg).toEqual('navy');
  });

  it('renders yellow background when variant is yellow', () => {
    const { wrapper } = renderWrapper({
      variant: 'yellow',
    });

    expect(wrapper.find(Background).props().bg).toEqual('yellow');
  });
});
