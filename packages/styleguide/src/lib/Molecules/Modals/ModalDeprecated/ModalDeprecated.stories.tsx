import { FillButton, ModalDeprecated } from '@codecademy/gamut';
import type { Meta, StoryObj } from '@storybook/react';
import { useState } from 'react';

const meta: Meta<typeof ModalDeprecated> = {
  component: ModalDeprecated,
  args: {},
};

export default meta;
type Story = StoryObj<typeof ModalDeprecated>;

const DefaultExample =() => {
  const [isOpen, setIsOpen] = useState(false);
    return (
      <>
        <FillButton onClick={() => setIsOpen(true)}>Open</FillButton>
        <ModalDeprecated
          isOpen={isOpen}
          onRequestClose={() => setIsOpen(false)}
        >
          Close the ModalDeprecated!
        </ModalDeprecated>
      </>
    )
};
export const Default: Story = {
  render: () => <DefaultExample />,
};

const CustomCloseExample = () => {
  const [isOpen, setIsOpen] = useState(false);
    return (
      <>
        <FillButton onClick={() => setIsOpen(true)}>Open</FillButton>
        <ModalDeprecated
          isOpen={isOpen}
          hideDefaultCloseButton
          onRequestClose={() => setIsOpen(false)}
        >
          <p>Close the ModalDeprecated...</p>
          <FillButton onClick={() => setIsOpen(false)}>
            with this button instead
          </FillButton>
        </ModalDeprecated>
      </>
    );
}

export const CustomClose: Story = {
  render: () => <CustomCloseExample  />,
};

const ClickOutsideExample = () => {
    const [isOpen, setIsOpen] = useState(false);
      return (
        <>
          <FillButton onClick={() => setIsOpen(true)}>Open</FillButton>
          <ModalDeprecated
            isOpen={isOpen}
            hideDefaultCloseButton
            onRequestClose={() => setIsOpen(false)}
          >
            <p>
              Close this ModalDeprecated by clicking the page outside of the
              ModalDeprecated content, or by clicking the escape key.
            </p>
          </ModalDeprecated>
        </>
      );
}

export const ClickOutside: Story = {
  render: () => <ClickOutsideExample />,
};


