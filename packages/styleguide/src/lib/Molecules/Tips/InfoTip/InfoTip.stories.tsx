import {
  Anchor,
  Box,
  FillButton,
  FlexBox,
  GridBox,
  InfoTip,
  Modal,
  Text,
} from '@codecademy/gamut';
import type { Meta, StoryObj } from '@storybook/react';
import { useRef, useState } from 'react';

const meta: Meta<typeof InfoTip> = {
  component: InfoTip,
  args: {
    alignment: 'top-left',
    info: `I am additional information about a nearby element or content.`,
  },
};

export default meta;
type Story = StoryObj<typeof InfoTip>;

export const Default: Story = {
  render: (args) => (
    <FlexBox center m={24} py={64}>
      <Text mr={4}>Some text that needs info</Text> <InfoTip {...args} />
    </FlexBox>
  ),
};

export const Emphasis: Story = {
  args: {
    emphasis: 'high',
  },
  render: (args) => (
    <FlexBox center m={24} py={64}>
      <Text mr={4}>Some text that needs info</Text> <InfoTip {...args} />
    </FlexBox>
  ),
};

export const Alignments: Story = {
  render: (args) => (
    <GridBox gap={24} gridTemplateColumns="1fr 1fr" ml={8} py={64}>
      {(['top-right', 'top-left', 'bottom-right', 'bottom-left'] as const).map(
        (alignment) => {
          return (
            <Box key={alignment}>
              <Text>{alignment}</Text>
              <InfoTip {...args} alignment={alignment} />
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
      <Text mr={4}>
        This text is in a small space and needs floating placement
      </Text>{' '}
      <InfoTip {...args} />
    </FlexBox>
  ),
};

export const WithLinksOrButtons: Story = {
  args: {
    placement: 'floating',
  },
  render: function WithLinksOrButtons(args) {
    const ref = useRef<HTMLDivElement>(null);

    const onClick = ({ isTipHidden }: { isTipHidden: boolean }) => {
      if (!isTipHidden) ref.current?.focus();
    };

    return (
      <FlexBox center py={64}>
        <Text mr={4}>This text is in a small space and needs info </Text>{' '}
        <InfoTip
          {...args}
          info={
            <Text ref={ref} tabIndex={-1}>
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
          onClick={onClick}
        />
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
      <InfoTip info="I am inline, cool" />
      <Box bg="paleBlue" zIndex={3}>
        I will be behind the infotip, nice + great
      </Box>
      <InfoTip {...args} />
    </FlexBox>
  ),
};

export const KeyboardNavigation: Story = {
  render: function KeyboardNavigation() {
    const floatingRef = useRef<HTMLDivElement>(null);
    const inlineRef = useRef<HTMLDivElement>(null);

    const examples = [
      {
        title: 'Floating Placement',
        placement: 'floating' as const,
        ref: floatingRef,
        links: ['Link 1', 'Link 2', 'Link 3'],
      },
      {
        title: 'Inline Placement',
        placement: 'inline' as const,
        alignment: 'bottom-right' as const,
        ref: inlineRef,
        links: ['Link A', 'Link B'],
      },
    ];

    return (
      <FlexBox center flexDirection="column" gap={24} py={64}>
        <GridBox gap={16} gridTemplateColumns="1fr 1fr">
          {examples.map(({ title, placement, alignment, ref, links }) => {
            const onClick = ({ isTipHidden }: { isTipHidden: boolean }) => {
              if (!isTipHidden) ref.current?.focus();
            };

            return (
              <FlexBox gap={8} key={placement}>
                <Text fontSize={16} fontWeight="bold">
                  {title}
                </Text>
                <InfoTip
                  alignment={alignment}
                  info={
                    <Text ref={ref} tabIndex={-1}>
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
                  onClick={onClick}
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

export const WithModal: Story = {
  args: {
    placement: 'floating',
    info: 'This InfoTip should not close when you press Escape inside the modal!',
  },
  render: function WithModal(args) {
    const [isModalOpen, setIsModalOpen] = useState(false);

    return (
      <FlexBox center flexDirection="column" gap={16} py={64}>
        <FlexBox alignItems="center" gap={8}>
          <Text>Here is some information</Text>
          <InfoTip {...args} />
        </FlexBox>

        <FillButton onClick={() => setIsModalOpen(true)}>Open Modal</FillButton>

        <Box mt={16}>
          <Text fontSize={14}>
            <strong>Test Escape Key Behavior with Modals: </strong>
          </Text>
          <Box as="ol" fontSize={14}>
            <li>Press enter to open the InfoTip</li>
            <li>Tab to the &quot;Open Modal&quot; button and press enter</li>
            <li>Press Escape - should close modal only (InfoTip stays open)</li>
            <li>Press Escape again - should close InfoTip</li>
            <li>
              <em>
                InfoTip detects when modals are open and defers Escape key
                handling to them.
              </em>
            </li>
          </Box>
        </Box>

        <Modal
          isOpen={isModalOpen}
          size="small"
          title="Test Modal"
          onRequestClose={() => setIsModalOpen(false)}
        >
          <FlexBox column p={16}>
            <Text mb={16}>
              This is a modal. Press Escape to close it. The InfoTip should
              remain open behind this modal.
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

export const InfoTipInsideModal: Story = {
  args: {
    placement: 'inline',
    info: 'This is helpful information about the field. Try pressing Escape!',
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
            <li>Press Escape again - should close Modal</li>
            <li>
              <em>
                Inline InfoTips work correctly inside Modals without z-index
                issues.
              </em>
            </li>
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
              <Text>Field Label</Text>
              <InfoTip {...args} />
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
