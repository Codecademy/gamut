import { Anchor, Box, FlexBox, InfoTip, Text } from '@codecademy/gamut';
import { useRef } from 'react';

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
