import { Box, FlexBox, Radio, RadioGroup, Text } from '@codecademy/gamut';
import styled from '@emotion/styled';
import type { Meta, StoryObj } from '@storybook/react';
import { useState } from 'react';
import type { TypeWithDeepControls } from 'storybook-addon-deep-controls';

import { infotipNestedArgTypes } from '~styleguide/argTypes';

const meta: TypeWithDeepControls<Meta<typeof Radio>> = {
  component: Radio,
  args: {
    htmlFor: 'example-radio',
    label: 'Option 1',
    name: 'example-radio',
  },
  argTypes: {
    ...infotipNestedArgTypes,
  },
};

export default meta;
type Story = StoryObj<typeof Radio>;

export const Default: Story = {
  args: {},
};

export const RadioGroupComponent: Story = {
  render: () => (
    <RadioGroup htmlForPrefix="example-radio">
      <Radio htmlFor="example-radio" label="Radio 1" name="example-radio-1" />
      <Radio htmlFor="example-radio" label="Radio 2" name="example-radio-2" />
    </RadioGroup>
  ),
};

export const Checked: Story = {
  args: {
    htmlFor: 'example-checked',
    name: 'example-checked',
    label: 'Checked',
    checked: true,
  },
};

export const Disabled: Story = {
  args: {
    htmlFor: 'example-disabled',
    name: 'example-disabled',
    label: 'Disabled',
    disabled: true,
  },
};

export const DisabledChecked: Story = {
  args: {
    htmlFor: 'example-disabled-checked',
    name: 'example-disabled-checked',
    label: 'Disabled and Checked',
    disabled: true,
    checked: true,
  },
};

export const Error: Story = {
  args: {
    htmlFor: 'example-error',
    label: 'Error',
    name: 'example-error',
    error: true,
  },
};

export const CustomLabel: Story = {
  args: {
    infotip: {
      emphasis: 'high',
      info: 'This is an infotip',
      placement: 'floating',
    },
    htmlFor: 'example-custom',
    name: 'example-custom',
    label: 'Option with infotip',
  },
};

const PadlessBoldedRadio = styled(Radio)`
  label {
    padding: 0;
    font-weight: bold;
  }
`;

const KnowledgeSourceSelectionComponent = () => {
  const [selectedType, setSelectedType] = useState<
    'workspace' | 'project' | 'content'
  >('project');

  const workspaceName = 'workspace name';
  const projectName = 'project name';
  const contentName = 'content name';

  const options = [
    {
      type: 'workspace' as const,
      label: `Workspace: ${workspaceName}`,
      bullets: [
        `Accessible across all projects in your "${workspaceName}" workspace.`,
        'Can be shared to other projects or workspaces later if needed.',
        'Best for broad references like brand, legal, or voice guidelines.',
      ],
    },
    {
      type: 'project' as const,
      label: `Project: ${projectName}`,
      bullets: [
        `Accessible to all content items within your "${projectName}" project.`,
        'Can be shared to other projects or workspaces later if needed.',
        'Ideal for project‑specific datasets, briefs, or design standards.',
      ],
    },
    {
      type: 'content' as const,
      label: `Content item: ${contentName}`,
      bullets: [
        `Applied only to "${contentName}".`,
        "Won't surface in search or be discoverable elsewhere.",
        'Best for highly tailored or one‑off content.',
      ],
    },
  ];

  return (
    <FlexBox column gap={16} maxWidth={600}>
      <Text as="h3" fontSize={20} fontWeight="title" lineHeight="title">
        Select where this knowledge source will be available
      </Text>
      <FlexBox column gap={16}>
        {options.map((option) => (
          <Box
            border={selectedType === option.type ? 2 : 1}
            borderColor={
              selectedType === option.type ? 'hyper-500' : 'border-primary'
            }
            borderRadius="md"
            key={option.type}
            p={16}
            pt={12}
          >
            <PadlessBoldedRadio
              checked={selectedType === option.type}
              htmlFor={`knowledge-source-${option.type}`}
              label={option.label}
              name="knowledge-source"
              value={option.type}
              onChange={() => setSelectedType(option.type)}
            />
            <Box pl={28 as any}>
              <Box as="ul" color="text-secondary" fontSize={14}>
                {option.bullets.map((bullet) => (
                  <li key={bullet} style={{ marginBottom: 0 }}>
                    {bullet}
                  </li>
                ))}
              </Box>
            </Box>
          </Box>
        ))}
      </FlexBox>
    </FlexBox>
  );
};

export const KnowledgeSourceSelection: Story = {
  render: () => <KnowledgeSourceSelectionComponent />,
};
