import {
  Anchor,
  Box,
  FillButton,
  FlexBox,
  GridBox,
  IconButton,
  InfoTip,
  Modal,
  Text,
} from '@codecademy/gamut';
import { SparkleIcon } from '@codecademy/gamut-icons';
import type { Meta, StoryObj } from '@storybook/react';
import { useState } from 'react';

const meta: Meta<typeof InfoTip> = {
  component: InfoTip,
  args: {
    alignment: 'top-left',
    ariaLabel: 'More information',
    info: `I am additional information about a nearby element or content.`,
  },
};

export default meta;
type Story = StoryObj<typeof InfoTip>;

export const Emphasis: Story = {
  args: {
    emphasis: 'high',
  },
  render: (args) => (
    <FlexBox center m={24} py={64}>
      <Text id="emphasis-text" mr={4}>
        Some text that needs info
      </Text>
      <InfoTip {...args} ariaLabelledby="emphasis-text" />
    </FlexBox>
  ),
};

export const Alignments: Story = {
  render: (args) => (
    <GridBox gap={24} gridTemplateColumns="1fr 1fr" ml={8} py={64}>
      {(['top-right', 'top-left', 'bottom-right', 'bottom-left'] as const).map(
        (alignment) => {
          const labelId = `alignment-${alignment}`;
          return (
            <Box key={alignment}>
              <Text id={labelId}>{alignment}</Text>
              <InfoTip
                {...args}
                alignment={alignment}
                ariaLabelledby={labelId}
              />
            </Box>
          );
        }
      )}
    </GridBox>
  ),
};

export const Placement: Story = {
  args: {
    placement: 'floating',
  },
  render: (args) => (
    <FlexBox center>
      <Text id="placement-text" mr={4}>
        This text is in a small space and needs floating placement
      </Text>{' '}
      <InfoTip {...args} ariaLabelledby="placement-text" />
    </FlexBox>
  ),
};

export const AriaLabel: Story = {
  render: (args) => (
    <FlexBox center column gap={24} my={48} width={1}>
      <FlexBox alignItems="center" gap={8}>
        <Text fontSize={16} fontWeight="bold">
          Using ariaLabel (no visible label text):
        </Text>
      </FlexBox>
      <FlexBox alignItems="center" gap={8}>
        <IconButton
          icon={SparkleIcon}
          tip="This tool needs to be explained in the InfoTip"
          tipProps={{ placement: 'floating' }}
          onClick={() => null}
        />
        <InfoTip
          {...args}
          ariaLabel="Learn more about this tool"
          info="This is some helpful info about the tool represented by the IconButton"
        />
      </FlexBox>

      <FlexBox alignItems="center" gap={8}>
        <Text fontSize={16} fontWeight="bold">
          Using ariaLabelledby (references visible text):
        </Text>
      </FlexBox>
      <FlexBox alignItems="center" gap={8}>
        <Text id="custom-info-id">
          I am some helpful yet concise text that needs more explanation
        </Text>
        <InfoTip
          {...args}
          alignment="bottom-left"
          ariaLabelledby="custom-info-id"
          info="I am clarifying information related to the concise text."
        />
      </FlexBox>
    </FlexBox>
  ),
};

export const WithLinksOrButtons: Story = {
  args: {
    placement: 'floating',
  },
  render: function WithLinksOrButtons(args) {
    return (
      <FlexBox center py={64}>
        <Text id="links-text" mr={4}>
          This text is in a small space and needs info
        </Text>{' '}
        <InfoTip
          {...args}
          ariaLabelledby="links-text"
          info={
            <Text tabIndex={-1}>
              Hey! Here is a{' '}
              <Anchor href="https://giphy.com/search/nichijou">
                cool link
              </Anchor>{' '}
              that is super important. This is a{' '}
              <Anchor href="https://giphy.com/search/nichijou">
                second cool link
              </Anchor>{' '}
              that is also super important.
            </Text>
          }
        />
      </FlexBox>
    );
  },
};

export const KeyboardNavigation: Story = {
  render: function KeyboardNavigation() {
    const examples = [
      {
        title: 'Floating Placement',
        placement: 'floating' as const,
        links: ['Link 1', 'Link 2', 'Link 3'],
      },
      {
        title: 'Inline Placement',
        placement: 'inline' as const,
        alignment: 'bottom-right' as const,
        links: ['Link A', 'Link B'],
      },
    ];

    return (
      <FlexBox center flexDirection="column" gap={24} py={64}>
        <GridBox gap={16} gridTemplateColumns="1fr 1fr">
          {examples.map(({ title, placement, alignment, links }) => {
            const labelId = `keyboard-nav-${placement}`;
            return (
              <FlexBox gap={8} key={placement}>
                <Text fontSize={16} fontWeight="bold" id={labelId}>
                  {title}
                </Text>
                <InfoTip
                  alignment={alignment}
                  ariaLabelledby={labelId}
                  info={
                    <Text>
                      {links.map((label, idx) => (
                        <>
                          {idx > 0 && ', '}
                          <Anchor href="https://example.com" key={label}>
                            {label}
                          </Anchor>
                          {idx < links.length - 1 && ' '}
                        </>
                      ))}
                    </Text>
                  }
                  placement={placement}
                />
              </FlexBox>
            );
          })}
        </GridBox>

        <Box maxWidth={700}>
          <Text fontSize={14} fontWeight="bold" mb={8}>
            Keyboard Navigation:
          </Text>
          <Box as="ul" fontSize={14} pl={16}>
            <li>
              <strong>Opening:</strong> Focus automatically moves to the tip
              content when opened
            </li>
            <li>
              <strong>Floating - Tab:</strong> Navigates forward through links,
              then wraps to button (contained)
            </li>
            <li>
              <strong>Floating - Shift+Tab:</strong> Natural backward navigation
              (exits to page)
            </li>
            <li>
              <strong>Inline:</strong> Tab/Shift+Tab follows normal document
              flow
            </li>
            <li>
              <strong>Escape (both):</strong> Closes tip and returns focus to
              button
            </li>
            <li>
              Escape works even when focus is on links or outside elements
            </li>
          </Box>
        </Box>
      </FlexBox>
    );
  },
};

export const InfoTipInsideModal: Story = {
  args: {
    placement: 'inline',
    info: 'This is helpful information about the Modal. Try pressing Escape!',
  },
  render: function InfoTipInsideModal(args) {
    const [isModalOpen, setIsModalOpen] = useState(false);

    return (
      <FlexBox center flexDirection="column" gap={16} py={64}>
        <FillButton onClick={() => setIsModalOpen(true)}>
          Open Modal with InfoTip Inside
        </FillButton>

        <Box mt={16}>
          <Text fontSize={14}>
            <strong>Test InfoTip Inside Modal (Inline): </strong>
          </Text>
          <Box as="ol" fontSize={14}>
            <li>Click &quot;Open Modal with InfoTip Inside&quot;</li>
            <li>Click or press Enter on the InfoTip button (ⓘ icon)</li>
            <li>Press Escape - should close InfoTip (Modal stays open)</li>
            <li>Press Escape again - should close Modal</li>{' '}
          </Box>
        </Box>

        <Modal
          isOpen={isModalOpen}
          size="medium"
          title="Modal with InfoTip"
          onRequestClose={() => setIsModalOpen(false)}
        >
          <FlexBox flexDirection="column" gap={16} p={16}>
            <Text>This modal contains an InfoTip below:</Text>

            <FlexBox alignItems="center" gap={8}>
              <Text id="modal-infotip-text">
                Some text that needs explanation
              </Text>
              <InfoTip {...args} ariaLabelledby="modal-infotip-text" />
            </FlexBox>

            <Text color="text-disabled" fontSize={14}>
              The InfoTip inside this modal can be closed with Escape without
              closing the modal itself. Inline placement works correctly.
            </Text>

            <FillButton onClick={() => setIsModalOpen(false)}>
              Close Modal
            </FillButton>
          </FlexBox>
        </Modal>
      </FlexBox>
    );
  },
};

export const ZIndex: Story = {
  args: {
    info: 'I am inline, cool',
    zIndex: 5,
  },
  render: (args) => (
    <FlexBox center flexDirection="column" m={24} py={64}>
      <Box bg="paleBlue" zIndex={3}>
        I will not be behind the infotip, sad + unreadable
      </Box>
      <InfoTip
        ariaLabel="z-index example without override"
        info="I am inline, cool"
      />
      <Box bg="paleBlue" zIndex={3}>
        I will be behind the infotip, nice + great
      </Box>
      <InfoTip {...args} ariaLabel="z-index example with override" />
    </FlexBox>
  ),
};

export const Default: Story = {
  render: (args) => (
    <FlexBox center m={24} py={64}>
      <Text id="default-text" mr={4}>
        Some text that needs info
      </Text>
      <InfoTip {...args} ariaLabelledby="default-text" />
    </FlexBox>
  ),
};
