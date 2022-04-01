import {
  MiniChevronLeftIcon,
  MiniChevronRightIcon,
} from '@codecademy/gamut-icons';
import styled from '@emotion/styled';
import React, { Children, useEffect, useMemo, useRef, useState } from 'react';

import { Box, FillButton, FlexBox } from '..';

const ScrollContainer = styled(FlexBox)`
  overflow-x: scroll;
  scroll-snap-type: x mandatory;
  ::-webkit-scrollbar {
    display: none;
  }
`;

const ScrollButton = styled(FillButton)`
  opacity: 0;
  :focus {
    opacity: 1;
  }
`;

export interface HorizontalScrollBarProps {
  scrollInterval: number;
  className?: string;
}

export const HorizontalScrollBar: React.FC<HorizontalScrollBarProps> = ({
  children,
  scrollInterval,
  className,
}) => {
  const elementsRef = useRef<HTMLElement[]>([]);
  const parentContainerRef = useRef<HTMLDivElement | null>(null);

  const [showLeftButton, setShowLeftButton] = useState(false);
  const [showRightButton, setShowRightButton] = useState(true);

  const handleScroll = (forward?: boolean) => {
    if (parentContainerRef.current && elementsRef.current) {
      const interval = forward ? scrollInterval : -scrollInterval;

      const nextScrollPosition =
        parentContainerRef.current.scrollLeft + interval;

      const lastElementWidth =
        elementsRef.current[elementsRef.current.length - 1].clientWidth;
      const firstElementWidth = elementsRef.current[0].clientWidth;
      const maxScrollPosition =
        parentContainerRef.current.scrollWidth -
        parentContainerRef.current.clientWidth;

      const shouldScrollToBeginning = nextScrollPosition < firstElementWidth;
      const shouldScrollToEnd =
        nextScrollPosition > maxScrollPosition - lastElementWidth && forward;

      const calculatedScrollPosition = shouldScrollToEnd
        ? maxScrollPosition
        : shouldScrollToBeginning
        ? 0
        : nextScrollPosition;

      parentContainerRef.current.scrollTo({
        left: calculatedScrollPosition,
      });
    }
  };

  const toggleButton = (
    setButtonValueCallback: CallableFunction,
    buttonShouldBeVisible: boolean
  ) => {
    setButtonValueCallback(buttonShouldBeVisible);
  };

  const intersectionObserver = useMemo(() => {
    if (typeof window === 'undefined') return null;
    return new IntersectionObserver(
      (entries: IntersectionObserverEntry[]) => {
        entries.forEach((entry) => {
          const elementIndex = parseInt(
            entry.target.getAttribute('data-observerindex') || '',
            10
          );
          const elementIsFirstIndex = elementIndex === 0;
          const elementIsLastIndex =
            elementIndex === elementsRef.current.length - 1;
          if (elementIsFirstIndex)
            toggleButton(setShowLeftButton, !entry.isIntersecting);
          if (elementIsLastIndex)
            toggleButton(setShowRightButton, !entry.isIntersecting);

          entry.target.ariaHidden = entry.isIntersecting ? 'false' : 'true';
        });
      },
      {
        root: document.querySelector('[data-observerroot=true]'),
        rootMargin: '100% 0% 100% 0%',
        threshold: 0.2,
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
    <>
      <Box position="relative">
        <ScrollContainer
          data-observerroot="true"
          ref={parentContainerRef}
          className={className}
          pr={16}
        >
          <ScrollButton
            zIndex={2}
            position="absolute"
            variant="secondary"
            display={showLeftButton ? 'block ' : 'none'}
            height="100%"
            onClick={() => handleScroll()}
            aria-label="show previous content"
          >
            <MiniChevronLeftIcon size={24} />
          </ScrollButton>
          {Children.map(children, (child, index) => (
            <Box
              ref={(element) => {
                if (element) {
                  elementsRef.current[index] = element;
                }
              }}
              data-observerindex={index}
            >
              {child}
            </Box>
          ))}
          <ScrollButton
            variant="secondary"
            right={0}
            height="100%"
            position="absolute"
            display={showRightButton ? 'block' : 'none'}
            onClick={() => handleScroll(true)}
            aria-label="show more content"
          >
            <MiniChevronRightIcon size={24} />
          </ScrollButton>
        </ScrollContainer>
      </Box>
    </>
  );
};
