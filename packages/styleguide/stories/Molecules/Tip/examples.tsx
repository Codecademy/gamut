import { Anchor, FillButton, InfoTip } from '@codecademy/gamut';
import { css } from '@codecademy/gamut-styles';
import styled from '@emotion/styled';
import { useEffect, useRef, useState } from 'react';

const StyledButton = styled.button(
  css({
    '&:focus': { outline: 'red solid 2px' },
    '&:focus-within': { outline: 'blue solid 3px' },
    '&:focus-visible': { outline: 'green solid 4px' },
  })
);
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
        <>
          Hey! Here is a cool link:{' '}
          <Anchor ref={ref} href="https://giphy.com/search/nichijou">
            click me
          </Anchor>
        </>
      }
    />
  );
};
