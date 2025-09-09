import { Disclosure, FlexBox, Text, WithChildrenProp } from '@codecademy/gamut';
import { Background, BackgroundProps } from '@codecademy/gamut-styles';
import type { Meta, StoryObj } from '@storybook/react';

const meta: Meta<typeof Disclosure> = {
  component: Disclosure,
  args: {},
};

export default meta;
type Story = StoryObj<typeof Disclosure>;

const BackgroundWithPadding = ({
  bg,
  children,
}: Pick<BackgroundProps, 'bg'> & WithChildrenProp) => {
  return (
    <Background bg={bg}>
      <FlexBox p={16}>{children}</FlexBox>
    </Background>
  );
};

export const Default: Story = {
  args: {
    heading: 'All the options',
    body: (
      <Text maxWidth="600px">
        Lorem ipsum dolor sit, amet consectetur adipisicing elit. Quis tempore
        voluptatum, hic ipsum cum commodi laudantium? Mollitia quod totam
        consequuntur facere, praesentium cumque nesciunt debitis officiis, ipsa
        sapiente recusandae iusto.
      </Text>
    ),
    overline: 'overline is text-secondary and fontFamily: accent',
    subheading: 'subheading is text-secondary',
    ctaText: 'Optional button - must include a callback!',
    ctaCallback: () => {},
    hasPanelBg: true,
    initiallyExpanded: true,
  },
};

export const DefaultBackground: Story = {
  render: () => (
    <BackgroundWithPadding bg="background-primary">
      <Disclosure body="Uses `background`" heading="default" />
    </BackgroundWithPadding>
  ),
};

export const SubtleBgBordered: Story = {
  render: () => (
    <BackgroundWithPadding bg="background-primary">
      <Disclosure
        body='Uses `background-selected`. For this example there is a `<Background>` set to `"background-primary"`.'
        heading="subtle"
        variant="subtle"
      />
    </BackgroundWithPadding>
  ),
};

export const Transparent: Story = {
  render: () => (
    <BackgroundWithPadding bg="background-primary">
      <Disclosure
        body="Notice the border and it uses `background-current` to inherit the existing background color."
        heading="transparent"
        variant="transparent"
      />
    </BackgroundWithPadding>
  ),
};

export const HasBorder: Story = {
  render: () => (
    <BackgroundWithPadding bg="background-primary">
      <Disclosure
        body="This is a `default` variant without a border."
        hasBorder={false}
        heading="hasBorder (set to false)"
      />
    </BackgroundWithPadding>
  ),
};

export const Normal: Story = {
  args: {
    heading: 'Normal',
    body: 'Lorem ipsum dolor sit amet consectetur. Ut consectetur adipiscing a donec sed volutpat. Tempor risus rhoncus quisque vel sit mattis. Accumsan vel posuere tortor sit mattis augue congue sit.',
  },
};

export const Condensed: Story = {
  args: {
    heading: 'Condensed spacing',
    body: 'Lorem ipsum dolor sit amet consectetur. Ut consectetur adipiscing a donec sed volutpat. Tempor risus rhoncus quisque vel sit mattis. Accumsan vel posuere tortor sit mattis augue congue sit.',
    spacing: 'condensed',
  },
};

export const Compact: Story = {
  args: {
    heading: 'Compact spacing',
    body: 'Lorem ipsum dolor sit amet consectetur. Ut consectetur adipiscing a donec sed volutpat. Tempor risus rhoncus quisque vel sit mattis. Accumsan vel posuere tortor sit mattis augue congue sit.',
    spacing: 'compact',
  },
};
