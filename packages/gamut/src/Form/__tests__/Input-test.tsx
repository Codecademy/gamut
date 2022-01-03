import { StreakIcon } from '@codecademy/gamut-icons';
import { setupRtl } from '@codecademy/gamut-tests';

import { Input } from '../Input';

const renderView = setupRtl(Input, {});

describe('Input', () => {
  it('renders a text input type when the type is text', () => {
    const { view } = renderView({ type: 'text' });

    expect(view.container.querySelector('input')).toHaveAttribute(
      'type',
      'text'
    );
  });

  it('renders a number input type', () => {
    const { view } = renderView({ type: 'number' });
    expect(view.container.querySelector('input')).toHaveAttribute(
      'type',
      'number'
    );
  });

  it('renders a file input type', () => {
    const { view } = renderView({ type: 'file' });
    expect(view.container.querySelector('input')).toHaveAttribute(
      'type',
      'file'
    );
  });

  it('renders a correct defaultValue for text', () => {
    const { view } = renderView({
      type: 'text',
      defaultValue: 'default value',
    });

    expect(view.getByRole('textbox')).toHaveValue('default value');
  });

  it('renders a correct defaultValue for numbers', () => {
    const { view } = renderView({
      type: 'number',
      defaultValue: 13,
    });

    expect(view.getByRole('spinbutton')).toHaveValue(13);
  });

  it('renders an AlertIcon when error is true', () => {
    const { view } = renderView({
      type: 'number',
      defaultValue: 13,
      error: true,
    });

    view.getByTitle('Alert Icon');
  });

  it('renders a CheckCircledIcon when valid is true', () => {
    const { view } = renderView({
      type: 'number',
      defaultValue: 13,
      valid: true,
    });

    view.getByTitle('Check Circled Icon');
  });

  it('renders a custom gamut-icon when valid is true', () => {
    const { view } = renderView({
      type: 'number',
      defaultValue: 13,
      icon: StreakIcon,
    });

    view.getByTitle('Streak Icon');
  });
});
