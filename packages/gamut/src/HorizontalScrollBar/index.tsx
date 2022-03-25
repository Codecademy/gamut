import styled from '@emotion/styled';
import React, {
  Children,
  cloneElement,
  JSXElementConstructor,
  ReactElement,
  ReactNode,
  useEffect,
  useMemo,
  useRef,
  useState,
} from 'react';

import { Text } from '../Typography';

const Container = styled.div`
  height: 500px;
  width: 700px;
  overflow-x: scroll;
  display: flex;
  padding-top: 16px;
`;

export const HorizontalScrollBar: React.FC = ({ children }) => {
  const elementsRef = useRef<ReactNode[]>([]);

  const [showLeftButton, setShowLeftButton] = useState<boolean>(false);
  const [showRightButton, setShowRightButton] = useState<boolean>(true);

  const intersectionObserver = useMemo(
    () =>
      new IntersectionObserver((entries: IntersectionObserverEntry[]) => {
        entries.forEach((entry, index) => {
          const shouldToggleOnShowLeftButton =
            index === 0 && !entry.isIntersecting && !showLeftButton;
          const shouldToggleOffShowLeftButton =
            index === 0 && entry.isIntersecting && showLeftButton;
          const shouldToggleOnShowRightButton =
            index === entries.length - 1 &&
            !entry.isIntersecting &&
            !showRightButton;
          const shouldToggleOffShowRightButton =
            index === entries.length - 1 &&
            entry.isIntersecting &&
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

          entry.target.ariaHidden = entry.isIntersecting ? 'false' : 'true';
        });
      }),
    [showLeftButton, showRightButton]
  );

  useEffect(() => {
    if (elementsRef.current.length) {
      elementsRef.current.forEach((entry: HTMLElement) =>
        intersectionObserver.observe(entry)
      );
    }
  }, [elementsRef, intersectionObserver]);

  return (
    <>
      <Text display={showLeftButton ? 'block ' : 'none'}>Left Button</Text>
      <Text display={showRightButton ? 'block' : 'none'}>Right Button</Text>
      <Container>
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
            })
        )}
      </Container>
    </>
  );
};
