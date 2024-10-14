import { StarIcon } from '@codecademy/gamut-icons';
import userEvent from '@testing-library/user-event';
import { setupRtl } from 'component-test-setup';

import { IconButton } from '../IconButton';
import { IconButtonFloatingMock } from './mocks';

const label = 'Click';
const tip = 'Click this button';
const tipText = 'this button';
const uniqueTip = 'I am not repetitive text';

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

  // TO-DO: When we upgrade jest, we can use `description` in the tests below to make sure they are semantically connected to buttons.
  it('renders a tip with repetition removed', async () => {
    const { view } = renderView({});

    const button = view.getByRole('button', { name: label });

    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore: We need to update the rest of the testing suite to use the correct types (which are reliant on upgrading Node)
    expect(button).toHaveAccessibleDescription(tipText);
    expect(view.getByRole('tooltip', { hidden: true })).toHaveTextContent(
      tipText
    );
  });

  it('renders a tip with both labels when they are not repetitive', async () => {
    const { view } = renderView({ tip: uniqueTip });

    view.getByRole('button', { name: label });
    expect(view.getByRole('tooltip', { hidden: true })).toHaveTextContent(
      uniqueTip
    );
  });

  it('renders a true aria-label based on tip when aria-label is not defined', async () => {
    const { view } = renderView({ 'aria-label': undefined });

    view.getByRole('button', { name: label });
    expect(view.getByRole('tooltip', { hidden: true })).toHaveTextContent(
      tipText
    );
  });

  it('renders a floating tip', async () => {
    const { view } = renderFloatingView({});

    expect(view.getByRole('tooltip', { hidden: true })).toHaveTextContent(
      tipText
    );

    expect(view.queryByText(tip)).toBeNull();

    const cta = view.getByRole('button', { name: label });

    expect(view.queryByText('tooltip')).toBeNull();

    await userEvent.hover(cta);

    view.getByText(tip);
  });
});
