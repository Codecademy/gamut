import { WithChildrenProp } from '@codecademy/gamut';
import { colors } from '@codecademy/gamut-styles';
import styled from '@emotion/styled';
import { useEffect, useRef, useState } from 'react';
import * as React from 'react';

export interface InterstitialProps extends WithChildrenProp {
  /** If provided, these buttons will render below the title and children in a column. */
  buttons?: React.ReactNode[];
  className?: string;
  /** An optional image, emoji, or component that will render above the title. */
  decoration?: React.ReactNode;
  /** If enabled, focus will be pulled onto the title of the component upon render. Should be enabled if Interstitial is not the child of a component with focus managment, such as ModalDeprecated. */
  focus?: boolean;
  /** h1 title for the interstitial */
  title: string;
}

const InterstitialWrapper = styled.div`
  align-items: center;
  background: ${colors.navy};
  color: ${colors.white};
  display: flex;
  flex-direction: column;
  height: 100%;
  justify-content: center;
  min-height: 30rem;
  text-align: center;
  width: 100%;
`;

const Content = styled.div`
  max-width: 40rem;
`;

const Decoration = styled.div`
  font-size: 4rem;
  margin-bottom: 1rem;
`;

const Header = styled.h1`
  color: ${colors.white};
  font-size: 2.25rem;
  &:focus {
    outline: none;
  }
  &:focus-visible {
    box-shadow: 0 0 0 3px ${colors.white};
  }
`;

const Children = styled.div`
  margin: 3rem 0;
`;

const Buttons = styled.div`
  display: grid;
  flex-direction: column;
  grid-template-columns: 1;
  row-gap: 1rem;
  width: 12.5rem;
`;

export const Interstitial: React.FC<InterstitialProps> = ({
  buttons,
  children,
  className,
  decoration,
  focus,
  title,
}) => {
  const headerRef = useRef<HTMLHeadingElement>(null);
  const [focusable, setFocusable] = useState(focus);

  useEffect(() => {
    if (focus) {
      headerRef.current?.focus();
    }
  }, [headerRef, focus]);

  return (
    <InterstitialWrapper className={className}>
      <Content>
        <Header
          ref={headerRef}
          tabIndex={focusable ? 0 : -1}
          onBlur={() => setFocusable(false)}
        >
          {decoration && <Decoration>{decoration}</Decoration>}
          {title}
        </Header>
        <Children>{children}</Children>
      </Content>
      {buttons && <Buttons>{buttons}</Buttons>}
    </InterstitialWrapper>
  );
};
