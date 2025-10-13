import {
  Box,
  Checkbox,
  FillButton,
  FlexBox,
  Modal,
  Text,
} from '@codecademy/gamut';
import { CodeCelebration } from '@codecademy/gamut-illustrations';
import type { Meta } from '@storybook/react';
import React, { ComponentProps, useEffect, useState } from 'react';

const meta: Meta<typeof Modal> = {
  component: Modal,
  args: {
    title: 'Modal Modality',
    size: 'small',
    children: 'Close the Modal!',
    isOpen: false,
  },
  argTypes: {
    size: {
      control: 'radio',
      options: ['small', 'medium', 'large', 'fluid'],
    },
  },
};

export default meta;

export const Default: React.FC<ComponentProps<typeof Modal>> = (args) => {
  const [isOpen, setIsOpen] = useState(args.isOpen);

  useEffect(() => {
    setIsOpen(args.isOpen);
  }, [args.isOpen]);

  return (
    <>
      <FillButton onClick={() => setIsOpen(true)}>Open Modal</FillButton>
      <Modal
        {...args}
        isOpen={isOpen}
        onRequestClose={() => setIsOpen(false)}
      />
    </>
  );
};

export const CustomClose: React.FC = (args) => {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <>
      <FillButton onClick={() => setIsOpen(true)}>Open Modal</FillButton>
      <Modal
        {...args}
        hideCloseButton
        isOpen={isOpen}
        onRequestClose={() => setIsOpen(false)}
      />
    </>
  );
};

export const ClickOutside: React.FC = (args) => {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <>
      <FillButton onClick={() => setIsOpen(true)}>Open Modal</FillButton>
      <Modal
        {...args}
        hideCloseButton
        isOpen={isOpen}
        onRequestClose={() => setIsOpen(false)}
      >
        <FlexBox center fit>
          <FillButton onClick={() => setIsOpen(false)}>
            You can also control the state with this button
          </FillButton>
        </FlexBox>
      </Modal>
    </>
  );
};

type StringOrNumber = string | number;

const GridContentPlaceholder = ({
  height = 'auto',
  width = 'auto',
}: {
  height: StringOrNumber;
  width: StringOrNumber;
}) => {
  return (
    <FlexBox flexDirection="column">
      <FlexBox
        height="2rem"
        justifyContent="space-between"
        mb={12}
        width="100%"
      >
        <Box bg="beige" height="inherit" width="85%" />
        <Box bg="beige" height="inherit" width="10%" />
      </FlexBox>
      <Box bg="beige" height={height} width={width} />
    </FlexBox>
  );
};

export const Fluid: React.FC = (args) => {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <>
      <FillButton onClick={() => setIsOpen(true)}>Open Modal</FillButton>
      <Modal
        {...args}
        isOpen={isOpen}
        size="fluid"
        onRequestClose={() => setIsOpen(false)}
      >
        <GridContentPlaceholder height="350px" width="540px" />
      </Modal>
    </>
  );
};

export const Large: React.FC = (args) => {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <>
      <FillButton onClick={() => setIsOpen(true)}>Open Modal</FillButton>
      <Modal
        {...args}
        isOpen={isOpen}
        size="large"
        onRequestClose={() => setIsOpen(false)}
      >
        <GridContentPlaceholder height="300px" width="auto" />
      </Modal>
    </>
  );
};

export const Medium: React.FC = (args) => {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <>
      <FillButton onClick={() => setIsOpen(true)}>Open Modal</FillButton>
      <Modal
        {...args}
        isOpen={isOpen}
        size="medium"
        onRequestClose={() => setIsOpen(false)}
      >
        <GridContentPlaceholder height="240px" width="auto" />
      </Modal>
    </>
  );
};

export const Small: React.FC = (args) => {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <>
      <FillButton onClick={() => setIsOpen(true)}>Open Modal</FillButton>
      <Modal
        {...args}
        isOpen={isOpen}
        size="small"
        onRequestClose={() => setIsOpen(false)}
      >
        <GridContentPlaceholder height="240px" width="auto" />
      </Modal>
    </>
  );
};

export const Scrollable: React.FC = (args) => {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <>
      <FillButton onClick={() => setIsOpen(true)}>Open Modal</FillButton>
      <Modal
        {...args}
        hideCloseButton
        isOpen={isOpen}
        scrollable
        size="medium"
        title={undefined}
        onRequestClose={() => setIsOpen(false)}
      >
        <FlexBox flexDirection="column">
          <Box height="600px">
            Hello, I&apos;m a very large box... Try zooming in and you&apos;ll
            be able to scroll down to the button!
          </Box>
          <FillButton>Better remember to put me in!</FillButton>
        </FlexBox>
      </Modal>
    </>
  );
};

const ImageComponent = () => {
  return (
    <FlexBox bg="background-primary" center height="100%" p={4} width="100%">
      <CodeCelebration height="100%" />
    </FlexBox>
  );
};

export const WithImage: React.FC = (args) => {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <>
      <FillButton onClick={() => setIsOpen(true)}>Open Modal</FillButton>
      <Modal
        {...args}
        image={<ImageComponent />}
        isOpen={isOpen}
        onRequestClose={() => setIsOpen(false)}
      >
        <Text fontSize={14} my={12} smooth>
          Optional 1-2 lines of explanation that provides relevant details.
          Lorem ipsum cras nulla massa odio ligula.
        </Text>
      </Modal>
    </>
  );
};

export const MultipleViews: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <FillButton onClick={() => setIsOpen(true)}>Open Modal</FillButton>
      <Modal
        isOpen={isOpen}
        size="medium"
        views={[
          {
            title: 'First view',
            primaryCta: {
              actionType: 'next',
              children: 'Next',
            },
            secondaryCta: { actionType: 'cancel', children: 'Cancel' },
            children: <>Hey for the first time</>,
          },
          {
            title: 'Second view',
            primaryCta: { actionType: 'next', children: 'Next' },
            secondaryCta: { actionType: 'back', children: 'Back' },
            children: <>Hey for the second time</>,
          },
          {
            title: 'Third view',
            primaryCta: {
              actionType: 'confirm',
              children: 'Done',
              onClick: () => setIsOpen(false),
            },
            secondaryCta: { actionType: 'back', children: 'Back' },
            children: <>Last one</>,
          },
        ]}
        onRequestClose={() => setIsOpen(false)}
      />
    </>
  );
};

export const MultipleViewsDanger: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <FillButton onClick={() => setIsOpen(true)}>Open Modal</FillButton>
      <Modal
        isOpen={isOpen}
        size="medium"
        title="Danger!!"
        views={[
          {
            title: 'First view',
            primaryCta: {
              actionType: 'confirm',
              children: 'Delete',
              variant: 'danger',
              onClick: () => setIsOpen(false),
            },
            secondaryCta: { actionType: 'cancel', children: 'Cancel' },
            children: <>I use the danger variant for the confirm button</>,
          },
        ]}
        onRequestClose={() => setIsOpen(false)}
      />
    </>
  );
};

export const MultipleViewsDisabled: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isChecked, setIsChecked] = useState(false);

  return (
    <>
      <FillButton onClick={() => setIsOpen(true)}>Open Modal</FillButton>
      <Modal
        isOpen={isOpen}
        size="medium"
        views={[
          {
            title: 'First view',
            primaryCta: {
              actionType: 'next',
              children: 'Next',
              disabled: !isChecked,
            },
            secondaryCta: { actionType: 'cancel', children: 'Cancel' },
            children: (
              <>
                <Checkbox
                  aria-label="I am a checkbox"
                  checked={isChecked}
                  htmlFor="checkbox"
                  label="Check me to enable the Next button"
                  onChange={() => setIsChecked(!isChecked)}
                />
              </>
            ),
          },
          {
            title: 'Second view',
            primaryCta: {
              actionType: 'confirm',
              children: 'Done',
              onClick: () => setIsOpen(false),
            },
            secondaryCta: { actionType: 'back', children: 'Back' },
            children: <>Last one</>,
          },
        ]}
        onRequestClose={() => setIsOpen(false)}
      />
    </>
  );
};
