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

import { Box, FillButton } from '..';
import { Text } from '../Typography';

const Container = styled.div`
  height: 500px;
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

export const HorizontalScrollBar: React.FC = ({ children }) => {
  const elementsRef = useRef<ReactNode[]>([]);
  const parentContainerRef = useRef<ReactNode | null>(null);

  const [showLeftButton, setShowLeftButton] = useState<boolean>(false);
  const [showRightButton, setShowRightButton] = useState<boolean>(true);

  const toggleButtonStates = useCallback(
    (
      index: number,
      elementIsHorizontallyIntersecting: boolean,
      numberOfChildElements: number
    ) => {
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
    return new IntersectionObserver((entries: IntersectionObserverEntry[]) => {
      entries.forEach((entry) => {
        const containerWidth = parentContainerRef.current
          ? parentContainerRef.current.clientWidth
          : 711;

        const { x, width } = entry.boundingClientRect;

        // console.log(
        //   `index: ${index} xposition:${x},  width:${width} entriesLength: ${entries.length}`
        // );
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
        intersectionObserver.observe(entry)
      );
    }
  }, [elementsRef, intersectionObserver, children]);

  return (
    <>
      <Box position="relative">
        <Container ref={parentContainerRef as RefObject<HTMLDivElement>}>
          <FillButton
            position="absolute"
            display={showLeftButton ? 'block ' : 'none'}
          >
            Left Button
          </FillButton>
          <FillButton
            right={0}
            position="absolute"
            display={showRightButton ? 'block' : 'none'}
          >
            Right Button
          </FillButton>
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
                'data-observerIndex': index,
              })
          )}
        </Container>
      </Box>
    </>
  );
};
