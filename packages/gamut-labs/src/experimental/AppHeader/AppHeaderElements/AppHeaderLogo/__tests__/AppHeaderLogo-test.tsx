import { setupEnzyme } from '@codecademy/gamut-tests';

import { AppHeaderLogo, AppHeaderLogoProps } from '..';

const testUrl = 'https://codecademy.com';
const action = jest.fn();

const props: AppHeaderLogoProps = {
  action,
  item: {
    id: '1dfa',
    href: testUrl,
    type: 'logo',
    pro: false,
    trackingTarget: 'tracking target',
  },
};

const renderWrapper = setupEnzyme(AppHeaderLogo, props);

describe('AppHeaderLogo', () => {
  it('renders a logo', () => {
    const { wrapper } = renderWrapper();
    const icon = wrapper.find('svg');
    expect(icon.find('title').text()).toContain('Codecademy Logo');
  });

  it('shows the pro logo when user has pro subscription', () => {
    const { wrapper } = renderWrapper({ item: { ...props.item, pro: true } });
    const icon = wrapper.find('svg');
    expect(icon.find('title').text()).toEqual('Codecademy Pro Logo');
  });

  it('links to the provided href', () => {
    const { wrapper } = renderWrapper();
    const href = wrapper.find('a').prop('href');
    expect(href).toEqual(testUrl);
  });

  it('calls action() when clicked', () => {
    const { wrapper } = renderWrapper();
    wrapper.find('a').simulate('click');
    expect(action).toHaveBeenCalled();
  });
});
