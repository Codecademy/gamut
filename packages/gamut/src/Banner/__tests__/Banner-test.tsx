import { setupEnzyme } from '@codecademy/gamut-tests';

import { IconButton, TextButton } from '../../Button';
import { Banner } from '..';

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
    expect(CTA).toHaveLength(2);

    expect(CTA.at(0).text()).toEqual('Hello');
    CTA.at(0).simulate('click');

    expect(onCtaClick).toHaveBeenCalled();
  });
  it('calls the onClose callback when the close icon is clicked', () => {
    const { wrapper } = renderWrapper({});

    wrapper.find(IconButton).simulate('click');

    expect(onClose).toHaveBeenCalled();
  });
});
