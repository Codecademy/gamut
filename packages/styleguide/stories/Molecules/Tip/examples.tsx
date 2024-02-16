import { Anchor, InfoTip } from '@codecademy/gamut';
import { useRef } from 'react';

export const InfoTipLinkExample = () => {
  const ref = useRef<HTMLAnchorElement>(null);

  const onClick = ({ isTipHidden }: { isTipHidden: boolean }) => {
    console.log('Tip is hidden:', isTipHidden);
    if (isTipHidden) {
      console.log('Focusing on ref', ref);
      ref.current?.focus();
    }
  };

  return (
    <InfoTip
      onClick={onClick}
      info={
        <>
          Hey! Here is a cool link:{' '}
          <Anchor href="https://giphy.com/search/hamtaro" ref={ref}>
            click me
          </Anchor>
        </>
      }
    />
  );
};
