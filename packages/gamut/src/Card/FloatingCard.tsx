import { system } from '@codecademy/gamut-styles';
import styled from '@emotion/styled';
import React, { ComponentProps, forwardRef, HTMLProps } from 'react';

import { Pattern } from '../Pattern';

const Wrapper = styled.div(
  system.css({
    maxWidth: 'cac(100vw - 2rem)',
    position: 'relative',
    display: 'inline-block',
    textColor: 'text',
    zIndex: 1,
  })
);

const Shadow = styled(Pattern)(
  system.css({
    width: 1,
    height: 1,
    position: 'absolute',
    top: '.5rem',
    left: '-.5rem',
  })
);

const Body = styled.div(
  system.css({
    zIndex: 1,
    position: 'relative',
    bg: 'background',
    borderRadius: '2px',
    border: 1,
  })
);

export type FloatingCard = {
  className?: string;
  pattern: ComponentProps<typeof Pattern>['name'];
};

export const FloatingCard = forwardRef<
  HTMLDivElement,
  FloatingCard & Omit<HTMLProps<HTMLDivElement>, 'as' | 'size'>
>(({ children, className, pattern, ...rest }, ref) => (
  <Wrapper>
    <Shadow name={pattern} />
    <Body className={className} {...rest} ref={ref}>
      {children}
    </Body>
  </Wrapper>
));
