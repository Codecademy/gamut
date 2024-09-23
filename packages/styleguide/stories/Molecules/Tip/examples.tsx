import {
  Anchor,
  Box,
  FlexBox,
  InfoTip,
  PreviewTip,
  Text,
} from '@codecademy/gamut';
import { SmileyIndifferentIcon } from '@codecademy/gamut-icons';
import { useRef, useState } from 'react';

export const InfoTipLinkExample = () => {
  const ref = useRef<HTMLButtonElement>(null);

  const onClick = ({ isTipHidden }: { isTipHidden: boolean }) => {
    if (!isTipHidden) ref.current?.focus();
  };

  return (
    <InfoTip
      placement="floating"
      onClick={onClick}
      info={
        <Text>
          Hey! Here is a{' '}
          <Anchor ref={ref} href="https://giphy.com/search/nichijou">
            cool link
          </Anchor>{' '}
          that is super important.
        </Text>
      }
    />
  );
};

export const AvatarExample = () => {
  return (
    <FlexBox center py={96} mt={16}>
      <PreviewTip
        avatar={
          <Box bg="navy" height="100%" borderRadius="full" width="100%">
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

export const LoadingTip = () => {
  const [load, setIsTempLoad] = useState(false);

  const onFocus = () => {
    setIsTempLoad(true);
    setTimeout(() => setIsTempLoad(false), 4000);
  };

  return (
    <FlexBox justifyContent="space-between" py={96} mt={16} width="100%">
      <PreviewTip linkDescription="loading..." loading href="/test">
        I am a perpetually loading preview.
      </PreviewTip>
      <PreviewTip
        alignment="bottom-left"
        height={32}
        href="/test"
        linkDescription={load ? 'loading...' : 'test'}
        loading={load}
        onFocus={onFocus}
        overline="overline"
        truncateLines={1}
        width={32}
      >
        I will show loading for a few seconds on keyboard focus.
      </PreviewTip>
    </FlexBox>
  );
};
