import { StarIcon } from '@codecademy/gamut-icons';
import userEvent from '@testing-library/user-event';
import { setupRtl } from 'component-test-setup';
import { ComponentProps } from 'react';

import { FillButton } from '../FillButton';
import { TextButton } from '../TextButton';

const onClick = jest.fn();

const renderView = setupRtl(TextButton, {
  children: 'Click me!',
  onClick,
});

describe('TextButton', () => {
  it('renders a clickable button', async () => {
    const { view } = renderView();

    const cta = view.getByRole('button', { name: 'Click me!' });

    await userEvent.click(cta);

    expect(onClick).toHaveBeenCalled();
  });
  it('renders an leading decorative icon when an icon is provided', () => {
    const { view } = renderView({ icon: StarIcon });

    view.getByRole('img', { hidden: true });
  });

  it('resolves aria-label by name off ComponentProps<typeof FillButton> (compile-time only)', () => {
    /*
     * `ButtonBaseProps` extends `Omit<ComponentPropsWithoutRef<'button'>,
     * 'size' | 'onClick'>`, so named access to `aria-label` here would be a
     * TS2339 error if that type regressed.
     */
    const ariaLabel: ComponentProps<typeof FillButton>['aria-label'] = 'Submit';

    expect(ariaLabel).toBe('Submit');
  });
});
