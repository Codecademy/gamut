import { StreakIcon } from '@codecademy/gamut-icons';
import { setupRtl } from '@codecademy/gamut-tests';

import { Input } from '../inputs/Input';

jest.mock('@codecademy/gamut-icons', () => ({
  AlertIcon: () => (
    <svg>
      <title>Alert Icon</title>
    </svg>
  ),
  CheckCircledIcon: () => (
    <svg>
      <title>Check Circled Icon</title>
    </svg>
  ),
  StreakIcon: () => (
    <svg>
      <title>Streak Icon </title>
    </svg>
  ),
}));
const renderView = setupRtl(Input, { 'aria-label': 'input' });

describe('Input', () => {
  it('renders a text input type when the type is text', () => {
    const { view } = renderView({ type: 'text' });
    view.getByRole('textbox');
  });

  it('renders a number input type', () => {
    const { view } = renderView({ type: 'number' });

    expect(view.getByLabelText('input')).toHaveAttribute('type', 'number');
  });

  it('renders a file input type', () => {
    const { view } = renderView({ type: 'file' });

    expect(view.getByLabelText('input')).toHaveAttribute('type', 'file');
  });

  it('renders a correct defaultValue for text', () => {
    const { view } = renderView({
      type: 'text',
      defaultValue: 'default value',
    });
    view.getByDisplayValue('default value');
  });

  it('renders a correct defaultValue for numbers', () => {
    const { view } = renderView({
      type: 'number',
      defaultValue: 13,
    });
    view.getByDisplayValue(13);
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
