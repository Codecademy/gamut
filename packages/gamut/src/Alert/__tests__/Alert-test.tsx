import { setupEnzyme } from '@codecademy/gamut-tests';

import { Alert } from '../Alert';

describe('Alert', () => {
  const onClose = jest.fn();
  const onClick = jest.fn();

  const renderView = setupEnzyme(Alert, {
    onClose,
    children: 'Hello',
    variant: 'general',
  });

  beforeEach(() => {
    jest.resetAllMocks();
  });

  it('renders without exploding', () => {
    const { wrapper } = renderView({});

    expect(wrapper).toBeDefined();
  });

  it('calls the onClose callback when the close button is clicked', () => {
    const { wrapper } = renderView({});

    const buttons = wrapper.find('IconButton');

    expect(buttons.length).toBe(2);

    buttons.at(1).simulate('click');

    expect(onClose).toHaveBeenCalled();
  });

  it('renders a clickable CTA', () => {
    const { wrapper } = renderView({ cta: { onClick, children: 'Click Me!' } });

    const cta = wrapper.find('FillButton');

    expect(cta.text()).toBe('Click Me!');

    cta.simulate('click');

    expect(onClick).toHaveBeenCalled();
  });

  it('renders the cta as a link if configured', () => {
    const { wrapper } = renderView({
      cta: { children: 'Click Me', href: '/hello', onClick },
    });

    const cta = wrapper.find('a').at(0);
    cta.simulate('click');

    expect(cta.prop('href')).toEqual('/hello');
    expect(onClick).toHaveBeenCalled();
  });

  it('renders a clickable button to expand the truncated section', () => {
    const { wrapper } = renderView({});

    const buttons = wrapper.find('IconButton');

    expect(buttons.length).toBe(2);
    expect(wrapper.find('Truncate').prop('expanded')).toBe(false);

    buttons.at(0).simulate('click');

    wrapper.update();

    expect(wrapper.find('Truncate').prop('expanded')).toBe(true);

    buttons.at(0).simulate('click');

    wrapper.update();

    expect(wrapper.find('Truncate').prop('expanded')).toBe(false);
  });
});
