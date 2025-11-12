import { Box, FlexBox, PreviewTip } from '@codecademy/gamut';
import { SmileyIndifferentIcon } from '@codecademy/gamut-icons';
import type { Meta, StoryObj } from '@storybook/react';
import { useState } from 'react';

const meta: Meta<typeof PreviewTip> = {
  component: PreviewTip,
  args: {
    alignment: 'top-left',
    children: 'PreviewTip Anchor',
    linkDescription: `Include a relevant snippet from the links destination on hover and focus, on click navigates to the page for more details. By default, the snippet will truncate after 4 lines, but the max lines can be set to any number lines fourty three`,
    href: 'https://media0.giphy.com/media/v1.Y2lkPTc5MGI3NjExamp6NDVlZzNpam01NnlhaGRreWMwZGlzZ3Z6bWd2dmtneTJrN3pnZiZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/X5Lta1bjuULTubmGzR/giphy.webp',
  },
};

export default meta;
type Story = StoryObj<typeof PreviewTip>;

const DefaultExample = (args: React.ComponentProps<typeof PreviewTip>) => {
  return (
    <FlexBox center py={96}>
      <PreviewTip {...args} />
    </FlexBox>
  );
};

export const Default: Story = {
  render: (args) => <DefaultExample {...args} />,
};

const AvatarExample = () => {
  return (
    <FlexBox center mt={16} py={96}>
      <PreviewTip
        avatar={
          <Box bg="navy" borderRadius="full" height="100%" width="100%">
            <SmileyIndifferentIcon color="yellow" size="100%" />
          </Box>
        }
        height={32}
        href="https://media3.giphy.com/media/v1.Y2lkPTc5MGI3NjExbGx4aDdoZ3htdm01MjRreTJ2NzZsbXhla2txYmJteGxiZGJ3cTM0bCZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/ToMjGpqisXrK0S9hNoA/giphy.webp"
        linkDescription="# of contributions"
        truncateLines={1}
        username="@coolguy"
        width={32}
      />
    </FlexBox>
  );
};

export const AvatarTip: Story = {
  render: (args) => <AvatarExample {...args} />,
};

export const FloatingPreviewTip: Story = {
  args: {
    placement: 'floating',
    alignment: 'top-right',
  },
};

const LoadingExample = () => {
  const [load, setIsTempLoad] = useState(true);

  const onFocus = () => {
    setTimeout(() => setIsTempLoad(false), 4000);
  };

  return (
    <FlexBox center py={96}>
      <FlexBox justifyContent="space-between" mt={16} py={96} width="100%">
        <PreviewTip href="/test" linkDescription="loading..." loading>
          I am a perpetually loading preview.
        </PreviewTip>
        <PreviewTip
          alignment="bottom-left"
          height={32}
          href="/test"
          linkDescription={load ? 'loading...' : 'test'}
          loading={load}
          truncateLines={1}
          width={32}
          onFocus={onFocus}
        >
          I will show loading for a few seconds on keyboard focus.
        </PreviewTip>
      </FlexBox>
    </FlexBox>
  );
};

export const LoadingTip: Story = {
  render: (args) => <LoadingExample {...args} />,
};

const TruncationExample = (args: React.ComponentProps<typeof PreviewTip>) => {
  return (
    <FlexBox justifyContent="space-around" py={96} width="100%">
      <PreviewTip {...args} alignment="top-right" truncateLines={2} />
      <PreviewTip
        {...args}
        alignment="bottom-left"
        linkDescription="This is a long link description. There is nothing fun or funny in this PreviewTip, and this definitely is way too long to be a 'summary' of anything at all. No one wants to read a preview that's as long as the article, its like a trailer that gives away the whole movie. Be better than that. Be a serious person."
        truncateLines={5}
      />
    </FlexBox>
  );
};

export const Truncation: Story = {
  render: (args) => <TruncationExample {...args} />,
};
