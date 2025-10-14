import { Box, FlexBox, FormGroup, SelectDropdown } from '@codecademy/gamut';
import { RadarIcon, ResponsiveIcon, RocketIcon } from '@codecademy/gamut-icons';
import type { Meta, StoryObj } from '@storybook/react';

const fruitOptions = ['Apple', 'Banana', 'Cherry', 'Dragonfruit', 'Eggplant'];

const meta: Meta<typeof SelectDropdown> = {
  component: SelectDropdown,
  args: {
    htmlFor: 'example-select',
    options: fruitOptions,
    disabled: false,
    isSearchable: false,
    value: '',
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
    name: 'base-dropdown',
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
    name: 'searchable-dropdown',
    isSearchable: true,
    options: ['wow', 'wowee', 'wooooooow'],
    placeholder: 'i am searchable, it is cool',
  },
  render: (args) => (
    <Box height="12rem">
      <SelectDropdown {...args} />
    </Box>
  ),
};

export const Disabled: Story = {
  args: {
    name: 'disabled-dropdown-standalone',
    options: ['Disabled'],
    disabled: true,
    placeholder: 'Disabled',
  },
};

export const Error: Story = {
  args: {
    name: 'error-dropdown-standalone',
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
        htmlFor="shownOptionsLimit01"
        isSoloField
        label="i have the default shownOptionsLimit"
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
        htmlFor="shownOptionsLimit02"
        isSoloField
        label="i have three shownOptionsLimit"
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
        htmlFor="disabled-dropdown"
        isSoloField
        label="I might have disabled options"
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
        htmlFor="subtitles-dropdown"
        isSoloField
        label="I have subtitle options"
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
        htmlFor="right-labels-dropdown"
        isSoloField
        label="I have right label options"
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
        htmlFor="dividers-dropdown"
        isSoloField
        label="I have group dividers"
      >
        <SelectDropdown {...args} />
      </FormGroup>
    </Box>
  ),
};

export const GroupLabels: Story = {
  args: {
    name: 'group-labels-dropdown',
    multiple: true,
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
        htmlFor="group-labels-dropdown"
        isSoloField
        label="I have group labels + multiple select"
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
      <FormGroup htmlFor="pizzaz-dropdown" isSoloField label="i have pizzazz">
        <SelectDropdown {...args} />
      </FormGroup>
    </Box>
  ),
};

export const CustomInputProps: Story = {
  args: {
    options: ['inspect me to see my inputProps', 'yes I am!', ':)'],
    inputProps: {
      hidden: { 'data-form-field': 'what' },
      combobox: {
        'data-testid': 'custom-select',
        'data-cy': 'custom-dropdown',
      },
    },
    name: 'what',
  },
  render: (args) => (
    <Box height="15rem">
      <FormGroup htmlFor="what" isSoloField label="i am ~styled">
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
        htmlFor="multi-dropdown"
        isSoloField
        label="I have multiple select options"
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
        htmlFor="big-label"
        isSoloField
        label="i am big label"
        labelSize="large"
      >
        <SelectDropdown {...args} />
      </FormGroup>
    </Box>
  ),
};

export const FormGroupError: Story = {
  args: {
    options: ['Error', 'oh no', ':('],
    name: 'error-example-unique',
    placeholder: 'cry cry cry',
  },
  render: (args) => (
    <Box height="15rem">
      <FormGroup
        error="error message!! no :'("
        htmlFor="error-example-unique"
        isSoloField
        label="i am ~styled... but something is wrong"
      >
        <SelectDropdown error {...args} />
      </FormGroup>
    </Box>
  ),
};

export const AbbreviatedInput: Story = {
  args: {
    name: 'abbreviated-dropdown',
    options: [
      {
        label: 'United States of America',
        abbreviation: 'USA',
        value: 'us',
      },
      {
        label: 'United Kingdom',
        abbreviation: 'UK',
        value: 'uk',
      },
      {
        label: 'Canada',
        abbreviation: 'CA',
        value: 'ca',
      },
      {
        label: 'Australia',
        abbreviation: 'AU',
        value: 'au',
      },
      {
        label: 'Germany',
        abbreviation: 'DE',
        value: 'de',
      },
    ],
  },
  render: (args) => (
    <Box height="18rem">
      <FormGroup
        htmlFor="abbreviated-dropdown"
        isSoloField
        label="Abbreviated Input Display"
      >
        <SelectDropdown {...args} />
      </FormGroup>
      <Box color="text-secondary" mt={4}>
        Input shows &quot;USA&quot; but dropdown shows &quot;United States of
        America&quot;
      </Box>
    </Box>
  ),
};

export const IndependentWidths: Story = {
  args: {
    name: 'width-dropdown',
    options: [
      {
        label: 'Machine Learning Engineer',
        abbreviation: 'ML Eng',
        value: 'ml-engineer',
        subtitle: 'Build AI/ML systems',
      },
      {
        label: 'Frontend Developer',
        abbreviation: 'FE Dev',
        value: 'frontend-dev',
        subtitle: 'React, Vue, Angular',
      },
      {
        label: 'Backend Developer',
        abbreviation: 'BE Dev',
        value: 'backend-dev',
        subtitle: 'Node.js, Python, Java',
      },
      {
        label: 'Full Stack Developer',
        abbreviation: 'FS Dev',
        value: 'fullstack-dev',
        subtitle: 'End-to-end development',
      },
    ],
    inputWidth: '150px',
    dropdownWidth: '350px',

    placeholder: 'Select a role',
  },
  render: (args) => (
    <Box height="20rem">
      <FormGroup
        htmlFor="width-dropdown"
        isSoloField
        label="Independent Width Control"
      >
        <SelectDropdown {...args} />
      </FormGroup>
      <Box color="text-secondary" mt={4}>
        Input is 150px wide, dropdown is 350px wide
      </Box>
    </Box>
  ),
};

export const SmallWithAbbreviations: Story = {
  args: {
    name: 'small-abbreviated-dropdown',
    options: [
      {
        label: 'JavaScript',
        abbreviation: 'JS',
        value: 'javascript',
      },
      {
        label: 'TypeScript',
        abbreviation: 'TS',
        value: 'typescript',
      },
      {
        label: 'Python',
        abbreviation: 'PY',
        value: 'python',
      },
      {
        label: 'Java',
        abbreviation: 'Java',
        value: 'java',
      },
      {
        label: 'C++',
        abbreviation: 'C++',
        value: 'cpp',
      },
    ],
    size: 'small',
    inputWidth: '80px',
    dropdownWidth: '200px',
    placeholder: 'Select JScript',
  },
  render: (args) => (
    <Box height="15rem">
      <FormGroup
        htmlFor="small-abbreviated-dropdown"
        isSoloField
        label="Small Size with Abbreviations"
      >
        <SelectDropdown {...args} />
      </FormGroup>
      <Box color="text-secondary" mt={4}>
        Small size, input shows &quot;JS&quot; but dropdown shows
        &quot;JavaScript&quot;
      </Box>
    </Box>
  ),
};

export const ComplexAbbreviatedOptions: Story = {
  args: {
    name: 'complex-abbreviated-dropdown',
    options: [
      {
        label: 'Senior Software Engineer',
        abbreviation: 'Sr SWE',
        value: 'senior-swe',
        subtitle: '5+ years experience',
        rightLabel: 'Senior',
      },
      {
        label: 'Principal Software Engineer',
        abbreviation: 'Principal SWE',
        value: 'principal-swe',
        subtitle: '10+ years experience',
        rightLabel: 'Principal',
      },
      {
        label: 'Staff Software Engineer',
        abbreviation: 'Staff SWE',
        value: 'staff-swe',
        subtitle: '8+ years experience',
        rightLabel: 'Staff',
      },
      {
        label: 'Distinguished Engineer',
        abbreviation: 'Distinguished Eng',
        value: 'distinguished-eng',
        subtitle: '15+ years experience',
        rightLabel: 'Distinguished',
      },
    ],
    inputWidth: '80px',
    dropdownWidth: '400px',
    placeholder: 'Select seniority level',
  },
  render: (args) => (
    <Box height="22rem">
      <FormGroup
        htmlFor="complex-abbreviated-dropdown"
        isSoloField
        label="Complex Options with Abbreviations"
      >
        <SelectDropdown {...args} />
      </FormGroup>
      <Box color="text-secondary" mt={4}>
        Shows abbreviated text in input, full details in dropdown
      </Box>
    </Box>
  ),
};

export const AbbreviatedWithSubtitleAndRightLabel: Story = {
  args: {
    name: 'abbreviated-detailed',
    options: [
      {
        label: 'Senior Software Engineer',
        abbreviation: 'Sr SWE',
        value: 'senior-swe',
        subtitle: '5+ years experience',
        rightLabel: 'Senior',
      },
      {
        label: 'Principal Software Engineer',
        abbreviation: 'Principal SWE',
        value: 'principal-swe',
        subtitle: '10+ years experience',
        rightLabel: 'Principal',
      },
      {
        label: 'Staff Software Engineer',
        abbreviation: 'Staff SWE',
        value: 'staff-swe',
        subtitle: '8+ years experience',
        rightLabel: 'Staff',
      },
    ],
  },
  render: (args) => (
    <Box height="22rem">
      <FormGroup
        htmlFor="abbreviated-detailed"
        isSoloField
        label="Abbreviated with Additional Details"
      >
        <SelectDropdown {...args} />
      </FormGroup>
    </Box>
  ),
};

export const AbbreviatedSmallSize: Story = {
  args: {
    name: 'abbreviated-small',
    options: [
      {
        label: 'JavaScript',
        abbreviation: 'JS',
        value: 'javascript',
      },
      {
        label: 'TypeScript',
        abbreviation: 'TS',
        value: 'typescript',
      },
      {
        label: 'Python',
        abbreviation: 'PY',
        value: 'python',
      },
      {
        label: 'Java',
        abbreviation: 'Java',
        value: 'java',
      },
    ],
    size: 'small',
    inputWidth: '80px',
    dropdownWidth: '200px',
  },
  render: (args) => (
    <Box height="15rem">
      <FormGroup
        htmlFor="abbreviated-small"
        isSoloField
        label="Small Size with Abbreviations"
      >
        <SelectDropdown {...args} />
      </FormGroup>
    </Box>
  ),
};
export const MenuAlignmentRight: Story = {
  args: {
    name: 'menu-alignment-right',
    options: [
      {
        label: 'Frontend Developer',
        abbreviation: 'FE Dev',
        value: 'frontend-dev',
        subtitle: 'React, Vue, Angular',
      },
      {
        label: 'Backend Developer',
        abbreviation: 'BE Dev',
        value: 'backend-dev',
        subtitle: 'Node.js, Python, Java',
      },
      {
        label: 'Full Stack Developer',
        abbreviation: 'FS Dev',
        value: 'fullstack-dev',
        subtitle: 'End-to-end development',
      },
    ],
    inputWidth: '150px',
    dropdownWidth: '300px',
    menuAlignment: 'right',
    placeholder: 'Select a role',
  },
  render: (args) => (
    <FlexBox
      alignItems="center"
      flexDirection="column"
      height="20rem"
      width={1}
    >
      <FormGroup
        htmlFor="menu-alignment-right"
        isSoloField
        label="Menu Alignment: Right"
        width="150px"
      >
        <SelectDropdown {...args} />
      </FormGroup>
      <Box color="text-secondary" mt={4}>
        Dropdown aligns to the right edge of the input
      </Box>
    </FlexBox>
  ),
};

// These are for testing, I will delete before shipping

export const DisabledMultiValue: Story = {
  args: {
    name: 'disabled-small-multi',
    options: [
      {
        label: 'JavaScript',
        abbreviation: 'JS',
        value: 'javascript',
      },
      {
        label: 'TypeScript',
        abbreviation: 'TS',
        value: 'typescript',
      },
      {
        label: 'Python',
        abbreviation: 'PY',
        value: 'python',
      },
      {
        label: 'Java',
        abbreviation: 'Java',
        value: 'java',
      },
    ],
    placeholder: 'Long truncated placeholder',
    size: 'small',
    inputWidth: '100px',
    dropdownWidth: '200px',
    multiple: true,
    value: ['python', 'java'],
    disabled: true,
  },
  render: (args) => (
    <Box height="15rem">
      <FormGroup
        htmlFor="abbreviated-small"
        isSoloField
        label="Small Size with Abbreviations"
      >
        <SelectDropdown {...args} />
      </FormGroup>
    </Box>
  ),
};

export const LongPlaceholder: Story = {
  args: {
    name: 'long-placeholder',
    options: [
      {
        label: 'JavaScript',
        abbreviation: 'JS',
        value: 'javascript',
      },
      {
        label: 'TypeScript',
        abbreviation: 'TS',
        value: 'typescript',
      },
      {
        label: 'Python',
        abbreviation: 'PY',
        value: 'python',
      },
      {
        label: 'Java',
        abbreviation: 'Java',
        value: 'java',
      },
    ],
    placeholder: 'Long truncated placeholder',
    size: 'small',
    inputWidth: '300px',
    dropdownWidth: '400px',
    multiple: true,
    menuAlignment: 'right',
  },
  render: (args) => (
    <Box height="15rem" ml={8}>
      <FormGroup
        htmlFor="long-placeholder"
        isSoloField
        label="Small Size with Abbreviations"
      >
        <SelectDropdown {...args} />
      </FormGroup>
    </Box>
  ),
};
export const LongPlaceholderAgain: Story = {
  args: {
    name: 'long-placeholder-again',
    options: [
      {
        label: 'JavaScript',
        abbreviation: 'JS',
        value: 'javascript',
      },
      {
        label: 'TypeScript',
        abbreviation: 'TS',
        value: 'typescript',
      },
      {
        label: 'Python',
        abbreviation: 'PY',
        value: 'python',
      },
      {
        label: 'Java',
        abbreviation: 'Java',
        value: 'java',
      },
    ],
    placeholder: 'Long truncated placeholder',
    size: 'small',
    inputWidth: '400px',
    dropdownWidth: '200px',
    multiple: true,
    menuAlignment: 'right',
  },
  render: (args) => (
    <Box height="15rem">
      <FormGroup
        htmlFor="long-placeholder-again"
        isSoloField
        label="Small Size with Abbreviations"
      >
        <SelectDropdown {...args} />
      </FormGroup>
    </Box>
  ),
};
