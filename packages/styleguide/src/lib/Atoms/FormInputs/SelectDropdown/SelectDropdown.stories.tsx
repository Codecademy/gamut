import { Box, FormGroup, SelectDropdown } from '@codecademy/gamut';
import { RadarIcon, ResponsiveIcon, RocketIcon } from '@codecademy/gamut-icons';
import type { Meta, StoryObj } from '@storybook/react';

export const fruitOptions = [
  'Apple',
  'Banana',
  'Cherry',
  'Dragonfruit',
  'Eggplant',
];

const meta: Meta<typeof SelectDropdown> = {
  component: SelectDropdown,
  args: {
    htmlFor: 'example-select',
    options: fruitOptions,
  },
  argTypes: {
    value: {
      control: {
        type: 'select',
        options: fruitOptions,
      },
    },
  },
};

export default meta;
type Story = StoryObj<typeof SelectDropdown>;

export const Default: Story = {
  args: {},
  render: (args) => (
    <Box height="18rem">
      <SelectDropdown {...args} />
    </Box>
  ),
};

export const Base: Story = {
  args: {
    options: ['Based', 'Regular Size', 'Normal'],
    placeholder: 'all about that',
  },
  render: (args) => (
    <Box height="12rem">
      <SelectDropdown {...args} />
    </Box>
  ),
};

export const Searchable: Story = {
  args: {
    isSearchable: true,
    options: ['wow', 'wowee', 'wooooooow'],
    placeholder: 'i am searchable, it is cool',
    id: 'searchable-dropdown',
  },
  render: (args) => (
    <Box height="12rem">
      <SelectDropdown {...args} />
    </Box>
  ),
};

export const Disabled: Story = {
  args: {
    options: ['Disabled'],
    disabled: true,
    placeholder: 'Disabled',
  },
};

export const Error: Story = {
  args: {
    options: ['Small', 'Quite little'],
    value: 'Quite little',
    error: true,
  },
  render: (args) => (
    <Box height="10rem">
      <SelectDropdown {...args} />
    </Box>
  ),
};

export const Small: Story = {
  args: {
    options: ['i am smol', 'yes I am!', ':)', 'a', 'b', 'c'],
    name: 'size-no-search',
    size: 'small',
    placeholder: 'click here!',
  },
  render: (args) => (
    <Box height="15rem">
      <SelectDropdown {...args} />
    </Box>
  ),
};

export const SmallSearchable: Story = {
  args: {
    options: [
      'i am also smol',
      ':)',
      'a',
      'b',
      'g',
      'v',
      'g',
      'asdf',
      'fasdfas;',
      'sdfasdgwrewg',
      'asdfsadf',
    ],
    name: 'size-search',
    isSearchable: true,
    size: 'small',
    placeholder: 'no type here instead!',
  },
  render: (args) => (
    <Box height="15rem">
      <SelectDropdown {...args} />
    </Box>
  ),
};

export const ShownOptionsDefault: Story = {
  args: {
    options: [
      'i am not small',
      ':)',
      'a',
      'b',
      'g',
      'v',
      'g',
      'asdf',
      'fasdfas;',
      'hi',
      'asdfsadf',
    ],
    name: 'shownOptionsLimit01',
    placeholder: 'six is the magic number',
  },
  render: (args) => (
    <Box height="22rem">
      <FormGroup
        label="i have the default shownOptionsLimit"
        htmlFor="shownOptionsLimit01"
        isSoloField
      >
        <SelectDropdown {...args} />
      </FormGroup>
    </Box>
  ),
};

export const ShownOptionsThree: Story = {
  args: {
    options: [
      'i am not small',
      ':)',
      'a',
      'b',
      'g',
      'v',
      'g',
      'asdf',
      'fasdfas;',
      'hi',
      'asdfsadf',
    ],
    name: 'shownOptionsLimit02',
    placeholder: 'three is the magic number',
    shownOptionsLimit: 3,
  },
  render: (args) => (
    <Box height="15rem">
      <FormGroup
        label="i have three shownOptionsLimit"
        htmlFor="shownOptionsLimit02"
        isSoloField
      >
        <SelectDropdown {...args} />
      </FormGroup>
    </Box>
  ),
};

export const DisabledOptions: Story = {
  args: {
    name: 'disabled-dropdown',
    options: [
      {
        label: 'I am disabled',
        value: 'xxx',
        disabled: true,
      },
      {
        label: 'I am not',
        value: 'yyy',
      },
      {
        label: `Nor am I`,
        value: 'zzz',
        disabled: false,
      },
    ],
  },
  render: (args) => (
    <Box height="15rem">
      <FormGroup
        label="I might have disabled options"
        htmlFor="disabled-dropdown"
        isSoloField
      >
        <SelectDropdown {...args} />
      </FormGroup>
    </Box>
  ),
};

export const Subtitles: Story = {
  args: {
    name: 'subtitles-dropdown',
    options: [
      {
        label: 'king@chess.com',
        subtitle: 'The King of Chess',
        value: 'king',
      },
      {
        label: 'queen@chess.com',
        subtitle: 'The Queen of Chess',
        value: 'queen',
      },
      {
        label: 'bishop@chess.com',
        subtitle: 'Bishop Chess',
        value: 'bishop',
        disabled: true,
      },
    ],
  },
  render: (args) => (
    <Box height="18rem">
      <FormGroup
        label="I have subtitle options"
        htmlFor="subtitles-dropdown"
        isSoloField
      >
        <SelectDropdown {...args} />
      </FormGroup>
    </Box>
  ),
};

export const RightLabels: Story = {
  args: {
    name: 'right-labels-dropdown',
    options: [
      {
        label: 'king@chess.com',
        rightLabel: 'The King of Chess',
        value: 'king',
      },
      {
        label: 'queen@chess.com',
        rightLabel: 'The Queen of Chess',
        value: 'queen',
      },
      {
        label: 'bishop@chess.com',
        rightLabel: 'Bishop Chess',
        value: 'bishop',
        disabled: true,
      },
    ],
  },
  render: (args) => (
    <Box height="15rem">
      <FormGroup
        label="I have right label options"
        htmlFor="right-labels-dropdown"
        isSoloField
      >
        <SelectDropdown {...args} />
      </FormGroup>
    </Box>
  ),
};

export const GroupDividers: Story = {
  args: {
    name: 'dividers-dropdown',
    options: [
      {
        options: [
          {
            label: 'king@chess.com',
            subtitle: 'The King of Chess',
            value: 'king',
            disabled: true,
          },
          {
            label: 'queen@chess.com',
            rightLabel: 'The Queen of Chess',
            value: 'queen',
          },
          {
            label: 'bishop@chess.com',
            subtitle: 'Bishop Chess',
            rightLabel: 'I can move diagonally',
            value: 'bishop',
            disabled: false,
          },
        ],
      },
      {
        divider: true,
        options: [
          {
            label: 'knight@chess.com',
            subtitle: 'Sir Chess',
            rightLabel: 'By leaps and bounds',
            value: 'chess',
            disabled: true,
          },
          {
            label: 'pawn@chess.com',
            value: 'pawn',
            disabled: false,
          },
        ],
      },
    ],
  },
  render: (args) => (
    <Box height="24rem">
      <FormGroup
        label="I have group dividers"
        htmlFor="dividers-dropdown"
        isSoloField
      >
        <SelectDropdown {...args} />
      </FormGroup>
    </Box>
  ),
};

export const GroupLabels: Story = {
  args: {
    name: 'group-labels-dropdown',
    options: [
      {
        label: 'Group 1',
        options: [
          {
            label: 'king@chess.com',
            subtitle: 'The King of Chess',
            value: 'king',
            disabled: true,
          },
          {
            label: 'queen@chess.com',
            rightLabel: 'The Queen of Chess',
            value: 'queen',
          },
          {
            label: 'bishop@chess.com',
            subtitle: 'Bishop Chess',
            rightLabel: 'I can move diagonally',
            value: 'bishop',
            disabled: false,
          },
        ],
      },
      {
        label: 'Group 2',
        options: [
          {
            label: 'knight@chess.com',
            subtitle: 'Sir Chess',
            rightLabel: 'By leaps and bounds',
            value: 'chess',
            disabled: true,
          },
          {
            label: 'pawn@chess.com',
            value: 'pawn',
            disabled: false,
          },
        ],
      },
    ],
  },
  render: (args) => (
    <Box height="24rem">
      <FormGroup
        label="I have group labels"
        htmlFor="group-labels-dropdown"
        isSoloField
      >
        <SelectDropdown {...args} />
      </FormGroup>
    </Box>
  ),
};

export const Icons: Story = {
  args: {
    name: 'pizzaz-dropdown',
    options: [
      {
        label: 'ohai',
        value: 'ohai',
        icon: RocketIcon,
      },
      {
        label: 'surprise pacman',
        value: 'pacman',
        icon: RadarIcon,
      },
      {
        label: `who's that pokemon?`,
        value: 'what',
        icon: ResponsiveIcon,
      },
    ],
  },
  render: (args) => (
    <Box height="15rem">
      <FormGroup label="i have pizzazz" htmlFor="pizzaz-dropdown" isSoloField>
        <SelectDropdown {...args} />
      </FormGroup>
    </Box>
  ),
};

export const CustomInputProps: Story = {
  args: {
    options: ['inspect me to see my inputProps', 'yes I am!', ':)'],
    inputProps: { hello: 'updog' },
    name: 'what',
    isSearchable: true,
  },
  render: (args) => (
    <Box height="15rem">
      <FormGroup label="i am ~styled" htmlFor="what" isSoloField>
        <SelectDropdown {...args} />
      </FormGroup>
    </Box>
  ),
};

export const MultipleSelect: Story = {
  args: {
    name: 'multi-dropdown',
    multiple: true,
    options: [
      {
        label: 'Select Me',
        value: 'xxx',
      },
      {
        label: 'Multi Select',
        value: 'yyy',
      },
      {
        label: `Select All?`,
        value: 'zzz',
      },
    ],
  },
  render: (args) => (
    <Box height="15rem">
      <FormGroup
        label="I have multiple select options"
        htmlFor="multi-dropdown"
        isSoloField
      >
        <SelectDropdown {...args} />
      </FormGroup>
    </Box>
  ),
};

export const FormGroupSelectDropdown: Story = {
  args: {
    options: ['hello', 'hi', 'howdy'],
    value: 'oh no',
    name: 'big-label',
  },
  render: (args) => (
    <Box height="15rem">
      <FormGroup
        label="i am big label"
        labelSize="large"
        htmlFor="big-label"
        isSoloField
      >
        <SelectDropdown {...args} />
      </FormGroup>
    </Box>
  ),
};

export const FormGroupError: Story = {
  args: {
    options: ['Error', 'oh no', ':('],
    placeholder: 'cry cry cry',
    name: 'error',
  },
  render: (args) => (
    <Box height="15rem">
      <FormGroup
        label="i am ~styled... but something is wrong"
        error="error message!! no :'("
        htmlFor="error"
        isSoloField
      >
        <SelectDropdown error {...args} />
      </FormGroup>
    </Box>
  ),
};
