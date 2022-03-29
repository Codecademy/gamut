import {
  MiniChevronLeftIcon,
  MiniChevronRightIcon,
} from '@codecademy/gamut-icons';
import styled from '@emotion/styled';
import React, {
  Children,
  cloneElement,
  JSXElementConstructor,
  ReactElement,
  ReactNode,
  RefObject,
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from 'react';

import { Box, StrokeButton } from '..';

const Container = styled.div`
  width: 700px;
  overflow-x: scroll;
  display: flex;
  padding-top: 16px;
`;

const isHorizontallyIntersecting = (
  xPosition: number,
  elementWidth: number,
  parentWidth: number
) => {
  return xPosition >= 0 - elementWidth && xPosition <= parentWidth;
};

export interface HorizontalScrollBarProps {
  scrollInterval: number;
}

export const HorizontalScrollBar: React.FC<HorizontalScrollBarProps> = ({
  children,
  scrollInterval,
}) => {
  const elementsRef = useRef<ReactNode[]>([]);
  const parentContainerRef = useRef<HTMLElement | null>(null);

  const [showLeftButton, setShowLeftButton] = useState(false);
  const [showRightButton, setShowRightButton] = useState(true);

  // tests?
  // snap scroll styles.
  // documentation
  // TODO figure out setting attributes so TS doesn't complain on clone element
  // TODO figure out ssr crash shit

  const handleScroll = (forward?: boolean) => {
    if (parentContainerRef.current) {
      const interval = forward ? scrollInterval : -scrollInterval;
      parentContainerRef.current.scrollTo({
        left: parentContainerRef.current.scrollLeft + interval,
      });
    }
  };

  const toggleButtonStates = useCallback(
    (
      index: number,
      elementIsHorizontallyIntersecting: boolean,
      numberOfChildElements: number
    ) => {
      // TODO this can be probably be simplified
      const shouldToggleOnShowLeftButton =
        index === 0 && !elementIsHorizontallyIntersecting && !showLeftButton;
      const shouldToggleOffShowLeftButton =
        index === 0 && elementIsHorizontallyIntersecting && showLeftButton;
      const shouldToggleOnShowRightButton =
        index === numberOfChildElements - 1 &&
        !elementIsHorizontallyIntersecting &&
        !showRightButton;
      const shouldToggleOffShowRightButton =
        index === numberOfChildElements - 1 &&
        elementIsHorizontallyIntersecting &&
        showRightButton;

      if (shouldToggleOnShowLeftButton) {
        setShowLeftButton(true);
      }
      if (shouldToggleOffShowLeftButton) {
        setShowLeftButton(false);
      }
      if (shouldToggleOnShowRightButton) {
        setShowRightButton(true);
      }
      if (shouldToggleOffShowRightButton) {
        setShowRightButton(false);
      }
    },
    [showLeftButton, showRightButton]
  );

  const intersectionObserver = useMemo(() => {
    if (!window) return null;
    return new IntersectionObserver((entries: IntersectionObserverEntry[]) => {
      entries.forEach((entry) => {
        const containerWidth = parentContainerRef.current
          ? parentContainerRef.current.clientWidth
          : 711;

        const { x, width } = entry.boundingClientRect;

        const elementIsHorizontallyIntersecting = isHorizontallyIntersecting(
          x,
          width,
          containerWidth
        );

        const elementIndex = parseInt(
          entry.target.getAttribute('data-observerindex') || '',
          10
        );

        const elementIsFirstIndex = elementIndex === 0;
        const elementIsLastIndex =
          elementIndex === elementsRef.current.length - 1;
        if (elementIsFirstIndex || elementIsLastIndex) {
          toggleButtonStates(
            elementIndex,
            elementIsHorizontallyIntersecting,
            elementsRef.current.length
          );
        }
        entry.target.ariaHidden = elementIsHorizontallyIntersecting
          ? 'false'
          : 'true';
      });
    });
  }, [parentContainerRef, toggleButtonStates]);

  useEffect(() => {
    const numberOfChildElements = Children.toArray(children).length;
    if (elementsRef.current.length === numberOfChildElements) {
      elementsRef.current.forEach((entry: HTMLElement) =>
        intersectionObserver?.observe(entry)
      );
    }
  }, [elementsRef, intersectionObserver, children]);

  //   <StrokeButton
  //   onClick={() => handleScroll()}
  //   zIndex={2}
  //   left={-16}
  //   top="1rem"
  //   height="calc(100% - 2rem)"
  //   px={4}
  //   position="absolute"
  //   variant="secondary"
  //   tabIndex={0}
  //   aria-label="See previous content"
  // >

  return (
    <>
      <Box position="relative" display="inline-block">
        <Container ref={parentContainerRef as RefObject<HTMLDivElement>}>
          <StrokeButton
            position="absolute"
            variant="secondary"
            display={showLeftButton ? 'block ' : 'none'}
            height="100%"
            onClick={() => handleScroll()}
            aria-label="show previous content"
          >
            <MiniChevronLeftIcon size={24} />
          </StrokeButton>
          {/* to do figure out how to float this to the right of the parent container */}
          <StrokeButton
            variant="secondary"
            right={0}
            height="100%"
            position="absolute"
            display={showRightButton ? 'block' : 'none'}
            onClick={() => handleScroll(true)}
          >
            <MiniChevronRightIcon size={24} />
          </StrokeButton>
          {Children.map(
            children,
            (
              child: ReactElement<
                { ref: (element: HTMLElement) => HTMLElement },
                string | JSXElementConstructor<any>
              >,
              index
            ) =>
              cloneElement(child, {
                ref: (element: HTMLElement) =>
                  (elementsRef.current[index] = element),
                'data-observerindex': index,
              })
          )}
        </Container>
      </Box>
    </>
  );
};
