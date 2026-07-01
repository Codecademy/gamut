import { FlexBox, IconButton } from '@codecademy/gamut';
import { SparkleIcon } from '@codecademy/gamut-icons';
import * as icons from '@codecademy/gamut-icons';
import type { Meta, StoryObj } from '@storybook/react';
import type { TypeWithDeepControls } from 'storybook-addon-deep-controls';

const meta: TypeWithDeepControls<Meta<typeof IconButton>> = {
  component: IconButton,
  args: {
    disabled: false,
    size: 'normal',
    icon: icons.SearchIcon,
    tip: 'ToolTip',
    tipProps: { placement: 'floating', alignment: 'top-center' },
  },
  argTypes: {
    href: {
      description: 'If defined, component will use an anchor tag',
      type: 'string',
    },
    size: {
      control: 'radio',
      options: ['normal', 'small', 'large'],
    },
    icon: {
      control: 'select',
      options: Object.keys(icons),
      mapping: icons,
    },
    as: {
      table: {
        disable: true,
      },
    },
    'tipProps.placement': {
      control: 'radio',
      options: ['floating', 'inline'],
    },
    'tipProps.alignment': {
      control: 'radio',
      options: ['top-center', 'bottom-center', 'left-center', 'right-center'],
    },
  },
};

export default meta;
type Story = StoryObj<typeof IconButton>;

export const Default: Story = {
  args: {},
};

// eslint-disable-next-line no-console
const logClick = () => console.log('button onClick fired');

export const PersistTooltip: Story = {
  args: {
    tip: 'Tooltip stays open on click',
    tipProps: {
      placement: 'floating',
      alignment: 'top-center',
      closeOnClick: false,
    },
    onClick: logClick,
  },
};

export const CloseOnClick: Story = {
  render: () => (
    <FlexBox center justifyContent="space-around" pt={48}>
      <IconButton
        icon={SparkleIcon}
        tip="Closes on click (floating)"
        tipProps={{ placement: 'floating', alignment: 'top-center' }}
        onClick={logClick}
      />
      <IconButton
        icon={SparkleIcon}
        tip="Closes on click (inline)"
        tipProps={{ placement: 'inline', alignment: 'top-center' }}
        onClick={logClick}
      />
      <IconButton
        icon={SparkleIcon}
        tip="Stays open on click (floating)"
        tipProps={{
          placement: 'floating',
          alignment: 'top-center',
          closeOnClick: false,
        }}
        onClick={logClick}
      />
      <IconButton
        icon={SparkleIcon}
        tip="Stays open on click (inline)"
        tipProps={{
          placement: 'inline',
          alignment: 'top-center',
          closeOnClick: false,
        }}
        onClick={logClick}
      />
    </FlexBox>
  ),
};
