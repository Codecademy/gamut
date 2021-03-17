import { StreakIcon } from '@codecademy/gamut-icons';
import { setupEnzyme } from '@codecademy/gamut-tests';

import { Input } from '../Input';

const renderWrapper = setupEnzyme(Input, {});

describe('Input', () => {
  it('renders a text input type', () => {
    const { wrapper } = renderWrapper({ type: 'text' });
    expect(wrapper.find('input').props().type).toBe('text');
  });

  it('renders a number input type', () => {
    const { wrapper } = renderWrapper({ type: 'number' });
    expect(wrapper.find('input').props().type).toBe('number');
  });

  it('renders a file input type', () => {
    const { wrapper } = renderWrapper({ type: 'file' });
    expect(wrapper.find('input').props().type).toBe('file');
  });

  it('renders a correct defaultValue for text', () => {
    const { wrapper } = renderWrapper({
      type: 'text',
      defaultValue: 'default value',
    });

    expect(wrapper.find('input').props().defaultValue).toBe('default value');
  });

  it('renders a correct defaultValue for numbers', () => {
    const { wrapper } = renderWrapper({
      type: 'number',
      defaultValue: 13,
    });
    expect(wrapper.find('input').props().defaultValue).toBe(13);
  });

  it('renders an AlertIcon when error is true', () => {
    const { wrapper } = renderWrapper({
      type: 'number',
      defaultValue: 13,
      error: true,
    });
    const iconTitle = wrapper.find('svg').find('title');
    expect(iconTitle.text()).toBe('Alert Icon');
  });

  it('renders a CheckCircledIcon when valid is true', () => {
    const { wrapper } = renderWrapper({
      type: 'number',
      defaultValue: 13,
      valid: true,
    });
    const iconTitle = wrapper.find('svg').find('title');
    expect(iconTitle.text()).toBe('Check Circled Icon');
  });

  it('renders a custom gamut-icon when valid is true', () => {
    const { wrapper } = renderWrapper({
      type: 'number',
      defaultValue: 13,
      icon: StreakIcon,
    });
    const iconTitle = wrapper.find('svg').find('title');
    expect(iconTitle.text()).toBe('Streak Icon');
  });
});
