import 'intersection-observer';

import { Box, FlexBox, WithChildrenProp } from '@codecademy/gamut';
import styled from '@emotion/styled';
import { Children, useEffect, useMemo, useRef } from 'react';
import * as React from 'react';

const ScrollContainer = styled(FlexBox)`
  scroll-snap-type: x mandatory;
  ::-webkit-scrollbar {
    display: none;
  }
`;

const ScrollItemWrapper = styled(Box)`
  scroll-snap-align: start;
  &[aria-hidden='true'] {
    visibility: hidden;
  }
`;

export interface HorizontalScrollMenuProps extends WithChildrenProp {
  className?: string;
}

export const HorizontalScrollMenu: React.FC<HorizontalScrollMenuProps> = ({
  children,
  className,
}) => {
  const elementsRef = useRef<HTMLElement[]>([]);
  const parentContainerRef = useRef<HTMLDivElement | null>(null);

  const intersectionObserver = useMemo(() => {
    if (typeof window === 'undefined') return null;
    return new IntersectionObserver(
      (entries: IntersectionObserverEntry[]) => {
        entries.forEach((entry) => {
          entry.target.ariaHidden = entry.isIntersecting ? 'false' : 'true';
        });
      },
      {
        root: parentContainerRef.current?.querySelector(
          '[data-observerroot="true"]'
        ),
        rootMargin: '100% 0% 100% 0%',
      }
    );
  }, []);

  useEffect(() => {
    const numberOfChildElements = Children.toArray(children).length;

    if (elementsRef.current.length === numberOfChildElements) {
      elementsRef.current.forEach((entry: HTMLElement) =>
        intersectionObserver?.observe(entry)
      );
    }
    return () => {
      intersectionObserver?.disconnect();
    };
  }, [elementsRef, intersectionObserver, children]);

  return (
    <Box position="relative">
      <ScrollContainer
        data-observerroot="true"
        ref={parentContainerRef}
        className={className}
        pr={16}
        overflowX="scroll"
        tabIndex={0}
      >
        {Children.map(children, (child, index) => (
          <ScrollItemWrapper
            ref={(element) => {
              if (element) {
                elementsRef.current[index] = element;
              }
            }}
          >
            {child}
          </ScrollItemWrapper>
        ))}
      </ScrollContainer>
    </Box>
  );
};
