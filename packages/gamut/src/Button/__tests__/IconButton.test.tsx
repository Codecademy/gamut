import { StarIcon } from '@codecademy/gamut-icons';
import { waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { setupRtl } from 'component-test-setup';

import { IconButton } from '../IconButton';
import { IconButtonFloatingMock } from './mocks';

const label = 'Aria gonna click this button?';
const tip = 'Click this button';
const onClick = jest.fn();
const buttonProps = {
  'aria-label': label,
  icon: StarIcon,
  onClick,
  tip,
};
const renderView = setupRtl(IconButton, buttonProps);
const renderFloatingView = setupRtl(IconButtonFloatingMock, buttonProps);

describe('IconButton', () => {
  it('renders a clickable button', async () => {
    const { view } = renderView();
    const cta = view.getByRole('button', { name: label });
    await userEvent.click(cta);

    expect(onClick).toHaveBeenCalled();
  });

  it('renders a decorative icon', () => {
    const { view } = renderView();
    view.getByRole('img', { hidden: true });
  });

  it('renders the tip text from the tip prop', async () => {
    const { view } = renderView({});
    view.getByRole('button', { name: label });

    expect(view.getByRole('tooltip', { hidden: true })).toHaveTextContent(tip);
  });

  it('sets the aria-label as the tip when only the tip prop is provided', async () => {
    const { view } = renderView({ 'aria-label': '' });
    view.getByRole('button', { name: tip });

    expect(view.getByRole('tooltip', { hidden: true })).toHaveTextContent(tip);
  });

  it('sets the aria-label text from the aria-label prop when both the tip and aria-label is provided', async () => {
    const { view } = renderView({ 'aria-label': '' });
    view.getByRole('button', { name: tip });

    expect(view.getByRole('tooltip', { hidden: true })).toHaveTextContent(tip);
  });

  it('renders a floating tip', async () => {
    const { view } = renderFloatingView({});

    expect(view.queryAllByText(tip).length).toBe(1);

    const cta = view.getByRole('button', { name: label });
    await userEvent.hover(cta);
    await waitFor(() => expect(view.queryAllByText(tip).length).toBe(2));
  });
});
