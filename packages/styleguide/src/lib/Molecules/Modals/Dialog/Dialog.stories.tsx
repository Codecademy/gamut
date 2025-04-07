import {   ContentContainer,
  DataList,
Dialog, FillButton ,
  IconButton,
} from '@codecademy/gamut';
import { MiniKebabMenuIcon } from '@codecademy/gamut-icons'
import { ColorMode } from '@codecademy/gamut-styles';
import type { Meta, StoryObj } from '@storybook/react';
import React, { useState } from 'react';

const meta: Meta<typeof Dialog> = {
  component: Dialog,
  args: {
    title: 'Depeche Modal',
    children: 'All I ever wanted, all I ever needed is here in my',
    confirmCta: { children: 'Arms!' },
    cancelCta: { children: 'Heart?' },
  },
};

export default meta;
type Story = StoryObj<typeof Dialog>;

const DialogExample = (args: React.ComponentProps<typeof Dialog>) => {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <>
      <FillButton onClick={() => setIsOpen(true)}>Open Dialog</FillButton>
      <Dialog isOpen={isOpen} {...args} onRequestClose={() => setIsOpen(false)}>
        Close the Dialog!
      </Dialog>
    </>
  );
};

export const Default: Story = {
  render: (args) => <DialogExample {...args} />,
};

export const Danger: Story = {
  args: {
    variant: 'danger',
  },
  render: (args) => <DialogExample {...args} />,
};

export const LightMode: Story = {
  render: (args) => <DialogExample {...args} />,
};

const DarkModeExample = (args: React.ComponentProps<typeof Dialog>) => {
  return (
    <ColorMode mode="dark">
      <DialogExample {...args} />
    </ColorMode>
  );
};

export const DarkMode: Story = {
  render: (args) => <DarkModeExample {...args} />,
};

export const TestingZindex: Story = {
  render: () => <TestComponent />,
}

export const TestingZindexComparison: Story = {
  render: () => <TestComponentWithoutZIndex />,
}

const TestComponent = () => {
  const [isOpen, setIsOpen] = useState(false)
  const rows = [
    { title: 'Title 1', option: '1' },
    { title: 'Title 2', option: '2' },
    { title: 'Title 3', option: '3' },
    { title: 'Title 4', option: '4' },
  ]

  const cols = [
    {
      header: 'Title',
      key: 'title' as String,
      size: 'lg',
      fill: true,
      sortable: true,
      // id: 'testing' as const,
    },
    {
      header: '\xA0',
      key: 'option' as String,
      size: 'lg',
      type: 'control',
      render: () => (
        <IconButton
          icon={MiniKebabMenuIcon}
          tip="More actions"
          tipProps={{
            placement: 'floating',
            alignment: 'bottom-center',
          }}
          dimensions={24}
          display="flex"
        />
      ),
    },
  ]

  return (
    <ContentContainer size="medium">
      <FillButton onClick={() => setIsOpen(true)}>Open dialog</FillButton>
      <DataList
        id="scenario-list"
        // idKey="id"
        rows={rows}
        columns={cols}
        selected={[]}
        onRowSelect={undefined}
        expanded={[]}
        onRowExpand={undefined}
        // expandedContent={<Text>Expanded content</Text>}
        query={{ sort: {}, filter: {} }}
        onQueryChange={() => {}}
        scrollable={false}
        height="auto"
        spacing="normal"
      />
      <Dialog
        title="Title"
        isOpen={isOpen}
        confirmCta={{ children: 'confirm' }}
        cancelCta={{ children: 'cancel' }}
        onRequestClose={() => setIsOpen(false)}
        zIndex={10}
      >
        Text
      </Dialog>
    </ContentContainer>
  )
}


const TestComponentWithoutZIndex = () => {
  const [isOpen, setIsOpen] = useState(false)
  const rows = [
    { title: 'Title 1', option: '1' },
    { title: 'Title 2', option: '2' },
    { title: 'Title 3', option: '3' },
    { title: 'Title 4', option: '4' },
  ]

  const cols = [
    {
      header: 'Title',
      key: 'title' as String,
      size: 'lg',
      fill: true,
      sortable: true,
      // id: 'testing' as const,
    },
    {
      header: '\xA0',
      key: 'option' as String,
      size: 'lg',
      type: 'control',
      render: () => (
        <IconButton
          icon={MiniKebabMenuIcon}
          tip="More actions"
          tipProps={{
            placement: 'floating',
            alignment: 'bottom-center',
          }}
          dimensions={24}
          display="flex"
        />
      ),
    },
  ]

  return (
    <ContentContainer size="medium">
      <FillButton onClick={() => setIsOpen(true)}>Open dialog</FillButton>
      <DataList
        id="scenario-list"
        // idKey="id"
        rows={rows}
        columns={cols}
        selected={[]}
        onRowSelect={undefined}
        expanded={[]}
        onRowExpand={undefined}
        // expandedContent={<Text>Expanded content</Text>}
        query={{ sort: {}, filter: {} }}
        onQueryChange={() => {}}
        scrollable={false}
        height="auto"
        spacing="normal"
      />
      <Dialog
        title="Title"
        isOpen={isOpen}
        confirmCta={{ children: 'confirm' }}
        cancelCta={{ children: 'cancel' }}
        onRequestClose={() => setIsOpen(false)}
      >
        Text
      </Dialog>
    </ContentContainer>
  )
}
