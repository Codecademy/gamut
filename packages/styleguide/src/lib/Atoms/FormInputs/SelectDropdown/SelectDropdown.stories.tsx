import {
  Box,
  DataList,
  FlexBox,
  FormGroup,
  SelectDropdown,
  Text,
} from '@codecademy/gamut';
import { RadarIcon, ResponsiveIcon, RocketIcon } from '@codecademy/gamut-icons';
import type { Meta, StoryObj } from '@storybook/react';
import { useRef, useState } from 'react';
import type { InputActionMeta } from 'react-select';

const fruitOptions = ['Apple', 'Banana', 'Cherry', 'Dragonfruit', 'Eggplant'];

const meta: Meta<typeof SelectDropdown> = {
  component: SelectDropdown,
  args: {
    id: 'example-select',
    name: 'example-select',
    options: fruitOptions,
    disabled: false,
    isSearchable: false,
    value: '',
    'aria-label': 'Select an option',
  },
  argTypes: {
    value: {
      control: 'select',
      options: fruitOptions,
    },
  },
};

export default meta;
type Story = StoryObj<typeof SelectDropdown>;

export const Base: Story = {
  args: {
    name: 'base-dropdown',
    options: [],
    placeholder: 'all about that test',
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

export const FormGroupSelectDropdown: Story = {
  args: {
    options: ['hello', 'hi', 'howdy'],
    value: 'oh no',
    id: 'big-label',
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
    id: 'error-example-unique',
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

export const DisabledOptions: Story = {
  args: {
    id: 'disabled-dropdown',
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
    id: 'subtitles-dropdown',
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
    id: 'right-labels-dropdown',
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

export const Icons: Story = {
  args: {
    id: 'pizzaz-dropdown',
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

export const AbbreviatedInput: Story = {
  args: {
    id: 'abbreviated-dropdown',
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

export const AbbreviatedSmallSize: Story = {
  args: {
    id: 'abbreviated-small',
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

export const AbbreviatedWithSubtitleAndRightLabel: Story = {
  args: {
    id: 'abbreviated-detailed',
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

export const ComplexAbbreviatedOptions: Story = {
  args: {
    id: 'complex-abbreviated-dropdown',
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

export const GroupDividers: Story = {
  args: {
    id: 'dividers-dropdown',
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
    id: 'group-labels-dropdown',
    multiple: true,
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
        htmlFor="group-labels-dropdown"
        isSoloField
        label="I have group labels + multiple select"
      >
        <SelectDropdown {...args} />
      </FormGroup>
    </Box>
  ),
};

export const ShownOptionsDefault: Story = {
  args: {
    id: 'shownOptionsLimit01',
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
    id: 'shownOptionsLimit02',
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

export const IndependentWidths: Story = {
  args: {
    id: 'width-dropdown',
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
    id: 'small-abbreviated-dropdown',
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

export const MenuAlignmentRight: Story = {
  args: {
    id: 'menu-alignment-right',
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

export const zIndexOnMenu: Story = {
  render: (args) => (
    <FlexBox column height="500px">
      <Text mb={16}>Notice how the menu renders based on using zIndex</Text>
      <FlexBox gap={16}>
        <FormGroup
          htmlFor="usesDefaultZIndex"
          isSoloField
          label="This menu is rendered behind the header"
        >
          <SelectDropdown
            id="usesDefaultZIndex"
            name="usesDefaultZIndex"
            options={args.options}
            placeholder="Uses the default zIndex of 2"
          />
        </FormGroup>
        <FormGroup
          htmlFor="hasSetZIndex"
          isSoloField
          label="This menu floats above the table's header"
        >
          <SelectDropdown
            id="hasSetZIndex"
            name="hasSetZIndex"
            options={args.options}
            placeholder="Has a zIndex of 5"
            zIndex={5}
          />
        </FormGroup>
      </FlexBox>
      <DataList
        columns={[
          {
            header: 'Name',
            key: 'name',
            size: 'lg',
            type: 'header',
            sortable: true,
          },
          { header: 'Rank', key: 'role', size: 'lg', sortable: true },
          { header: 'Ship', key: 'ship', size: 'lg', sortable: true },
        ]}
        disableContainerQuery
        id="crew"
        idKey="name"
        rows={[
          {
            name: 'Jean Luc Picard',
            role: 'Captain',
            ship: 'USS Enterprise',
          },
          {
            name: 'Wesley Crusher',
            role: 'Deus Ex Machina',
            ship: 'USS Enterprise',
          },
        ]}
      />
    </FlexBox>
  ),
};

const multiOptions = [
  { label: 'JavaScript', value: 'javascript' },
  { label: 'TypeScript', value: 'typescript' },
  { label: 'Python', value: 'python' },
  { label: 'Rust', value: 'rust' },
  { label: 'Go', value: 'go' },
];

export const MultipleSelect: Story = {
  parameters: {
    docs: {
      description: {
        story: `**Uncontrolled multi-select** — omit \`value\` and SelectDropdown manages selection internally. Use this when you only need the value at form submission (e.g. via a hidden \`<input>\` or \`FormData\`) and no other part of the UI needs to react to selection changes.`,
      },
    },
  },
  args: {
    id: 'multi-dropdown',
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

export const MultipleSelectControlled: Story = {
  parameters: {
    docs: {
      description: {
        story: `**Controlled multi-select** — pass \`value: string[]\` and update it in \`onChange\`. Use this when another part of the UI needs to react to the current selection in real time (e.g. a summary panel, an enabled/disabled submit button, or a filtered list). The live "Selected:" line below shows why you'd reach for controlled state.`,
      },
      source: {
        sourceState: 'shown',
        code: `const [selected, setSelected] = useState<string[]>([]);

<Box height="20rem">
  <FormGroup
    htmlFor="multi-controlled"
    isSoloField
    label="Pick your languages"
  >
    <SelectDropdown
      id="multi-controlled"
      multiple
      name="multi-controlled"
      options={multiOptions}
      placeholder="Select languages…"
      value={selected}
      onChange={(opts) => setSelected(opts.map((o) => o.value))}
    />
  </FormGroup>
  <Box color="text-secondary" mt={8}>
    {selected.length === 0
      ? 'No languages selected yet.'
      : \`Selected: \${selected.join(', ')}\`}
  </Box>
</Box>`,
      },
    },
  },
  render: () => {
    const MultipleSelectControlledContent = () => {
      const [selected, setSelected] = useState<string[]>([]);

      return (
        <Box height="20rem">
          <FormGroup
            htmlFor="multi-controlled"
            isSoloField
            label="Pick your languages"
          >
            <SelectDropdown
              id="multi-controlled"
              multiple
              name="multi-controlled"
              options={multiOptions}
              placeholder="Select languages…"
              value={selected}
              onChange={(opts) => setSelected(opts.map((o) => o.value))}
            />
          </FormGroup>
          <Box color="text-secondary" mt={8}>
            {selected.length === 0
              ? 'No languages selected yet.'
              : `Selected: ${selected.join(', ')}`}
          </Box>
        </Box>
      );
    };

    return <MultipleSelectControlledContent />;
  },
};

export const Creatable: Story = {
  parameters: {
    docs: {
      source: {
        sourceState: 'shown',
        code: `const [options, setOptions] = useState(['Apple', 'Banana', 'Cherry']);

<Box height="15rem">
  <FormGroup
    htmlFor="creatable-dropdown"
    isSoloField
    label="Type a new fruit and press Enter"
  >
    <SelectDropdown
      isCreatable
      name="creatable-dropdown"
      options={options}
      placeholder="Select or type to add…"
      onCreateOption={(inputValue) =>
        setOptions((prev) => [...prev, inputValue])
      }
    />
  </FormGroup>
</Box>`,
      },
    },
  },
  args: {
    name: 'creatable-dropdown',
    isCreatable: true,
    createOptionPosition: 'last',
    placeholder: 'Select or type to add…',
  },
  render: (args) => {
    const CreatableContent = () => {
      const [options, setOptions] = useState(['Apple', 'Banana', 'Cherry']);

      return (
        <Box height="15rem">
          <FormGroup
            htmlFor="creatable-dropdown"
            isSoloField
            label="Type a new fruit and press Enter"
          >
            <SelectDropdown
              {...args}
              id="creatable-dropdown"
              options={options}
              onCreateOption={(inputValue) =>
                setOptions((prev) => [...prev, inputValue])
              }
            />
          </FormGroup>
        </Box>
      );
    };

    return <CreatableContent />;
  },
};

export const CreatableMultiUncontrolled: Story = {
  parameters: {
    docs: {
      description: {
        story: `**Uncontrolled creatable multi-select** — omit \`value\` and use \`onCreateOption\` to append new options. Selection is managed internally, so existing tags stay selected when a new option is created.

Use this when you only need the final value on submit and no other part of the UI reacts to selection changes — for example, a "tags" field on a content creation form where you just want to collect the submitted array.`,
      },
      source: {
        sourceState: 'shown',
        code: `const [options, setOptions] = useState(['Apple', 'Banana', 'Cherry']);

<Box height="18rem">
  <FormGroup
    htmlFor="creatable-multi-uncontrolled"
    isSoloField
    label="Pick fruits or add your own"
  >
    <SelectDropdown
      isCreatable
      multiple
      name="creatable-multi-uncontrolled"
      options={options}
      placeholder="Select or type to add…"
      onCreateOption={(inputValue) =>
        setOptions((prev) => [...prev, inputValue])
      }
    />
  </FormGroup>
</Box>`,
      },
    },
  },
  render: () => {
    const CreatableMultiUncontrolledContent = () => {
      const [options, setOptions] = useState(['Apple', 'Banana', 'Cherry']);

      return (
        <Box height="18rem">
          <FormGroup
            htmlFor="creatable-multi-uncontrolled"
            isSoloField
            label="Pick fruits or add your own"
          >
            <SelectDropdown
              isCreatable
              multiple
              name="creatable-multi-uncontrolled"
              options={options}
              placeholder="Select or type to add…"
              onCreateOption={(inputValue) =>
                setOptions((prev) => [...prev, inputValue])
              }
            />
          </FormGroup>
        </Box>
      );
    };

    return <CreatableMultiUncontrolledContent />;
  },
};

export const CreatableMulti: Story = {
  parameters: {
    docs: {
      description: {
        story: `**Controlled creatable multi-select** — pass \`value: string[]\` and update it in \`onChange\` on every change, including \`create-option\`.

Use this when you need to read or reset the selection from outside the component — for example, a skill-tagging form that pre-populates from an API response, clears on cancel, or syncs to react-hook-form.

**Pitfall:** Updating \`options\` in \`onCreateOption\` without also syncing \`value\` in \`onChange\` will clear the selection when \`options\` re-renders. Always keep both in sync. \`onChange\` receives \`meta.action === 'create-option'\` when the user picks the **Add** row; the first argument is the full selected array including the new entry.`,
      },
      source: {
        sourceState: 'shown',
        code: `const [options, setOptions] = useState(['Apple', 'Banana', 'Cherry']);
const [value, setValue] = useState<string[]>([]);

<Box height="18rem">
  <FormGroup
    htmlFor="creatable-multi-dropdown"
    isSoloField
    label="Pick fruits or add your own"
  >
    <SelectDropdown
      isCreatable
      multiple
      name="creatable-multi-dropdown"
      options={options}
      placeholder="Select or type to add…"
      value={value}
      onChange={(selected, meta) => {
        setValue(selected.map((option) => option.value));

        if (meta.action === 'create-option' && meta.option) {
          setOptions((prev) => [...prev, meta.option.value]);
        }
      }}
    />
  </FormGroup>
</Box>`,
      },
    },
  },
  render: () => {
    const CreatableMultiContent = () => {
      const [options, setOptions] = useState(['Apple', 'Banana', 'Cherry']);
      const [value, setValue] = useState<string[]>([]);

      return (
        <Box height="18rem">
          <FormGroup
            htmlFor="creatable-multi-dropdown"
            isSoloField
            label="Pick fruits or add your own"
          >
            <SelectDropdown
              isCreatable
              multiple
              name="creatable-multi-dropdown"
              options={options}
              placeholder="Select or type to add…"
              value={value}
              onChange={(selected, meta) => {
                setValue(selected.map((option) => option.value));

                if (meta.action === 'create-option' && meta.option) {
                  setOptions((prev) => [...prev, meta.option.value]);
                }
              }}
            />
          </FormGroup>
        </Box>
      );
    };

    return <CreatableMultiContent />;
  },
};

export const CreatableWithValidation: Story = {
  parameters: {
    docs: {
      source: {
        sourceState: 'shown',
        code: `const [options, setOptions] = useState(['Apple', 'Banana', 'Cherry']);
const [error, setError] = useState<string | undefined>();
const lastInputRef = useRef('');

const validate = (inputValue: string) => {
  const trimmed = inputValue.trim();
  if (trimmed.length < 3) return 'Enter at least 3 characters.';
  return undefined;
};

const handleInputChange = (
  inputValue: string,
  { action }: InputActionMeta
) => {
  if (action === 'input-change') {
    lastInputRef.current = inputValue;
    setError(validate(inputValue));
    return;
  }

  if (action === 'input-blur' && lastInputRef.current) {
    setError(validate(lastInputRef.current));
  }
};

<Box height="15rem">
  <FormGroup
    error={error}
    htmlFor="creatable-validated-dropdown"
    isSoloField
    label="Pick a fruit that is at least 3 characters long"
  >
    <SelectDropdown
      error={Boolean(error)}
      isCreatable
      isValidNewOption={(inputValue: string) =>
        !validate(inputValue) && inputValue.trim().length > 0
      }
      name="creatable-validated-dropdown"
      options={options}
      placeholder="Type at least 3 characters to add…"
      validationMessage={({ inputValue }) =>
        validate(inputValue) ?? 'No matching fruit'
      }
      onChange={() => {
        lastInputRef.current = '';
        setError(undefined);
      }}
      onCreateOption={(inputValue) => {
        setOptions((prev) => [...prev, inputValue.trim()]);
        lastInputRef.current = '';
        setError(undefined);
      }}
      onInputChange={handleInputChange}
    />
  </FormGroup>
</Box>`,
      },
    },
  },
  render: () => {
    const CreatableWithValidationContent = () => {
      const [options, setOptions] = useState(['Apple', 'Banana', 'Cherry']);
      const [error, setError] = useState<string | undefined>();
      const lastInputRef = useRef('');

      const validate = (inputValue: string) => {
        const trimmed = inputValue.trim();
        if (trimmed.length < 3) return 'Enter at least 3 characters.';
        return undefined;
      };

      const handleInputChange = (
        inputValue: string,
        { action }: InputActionMeta
      ) => {
        if (action === 'input-change') {
          lastInputRef.current = inputValue;
          setError(validate(inputValue));
          return;
        }

        if (action === 'input-blur' && lastInputRef.current) {
          setError(validate(lastInputRef.current));
        }
      };

      return (
        <Box height="15rem">
          <FormGroup
            error={error}
            htmlFor="creatable-validated-dropdown"
            isSoloField
            label="Pick a fruit that is at least 3 characters long"
          >
            <SelectDropdown
              error={Boolean(error)}
              isCreatable
              isValidNewOption={(inputValue: string) =>
                !validate(inputValue) && inputValue.trim().length > 0
              }
              name="creatable-validated-dropdown"
              options={options}
              placeholder="Type at least 3 characters to add…"
              validationMessage={({ inputValue }) =>
                validate(inputValue) ?? 'No matching fruit'
              }
              onChange={() => {
                lastInputRef.current = '';
                setError(undefined);
              }}
              onCreateOption={(inputValue) => {
                setOptions((prev) => [...prev, inputValue.trim()]);
                lastInputRef.current = '';
                setError(undefined);
              }}
              onInputChange={handleInputChange}
            />
          </FormGroup>
        </Box>
      );
    };

    return <CreatableWithValidationContent />;
  },
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

export const Default: Story = {
  args: {},
  render: (args) => (
    <Box height="18rem">
      <SelectDropdown {...args} />
    </Box>
  ),
};
