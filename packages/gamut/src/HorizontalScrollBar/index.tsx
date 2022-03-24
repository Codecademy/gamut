import React, {
  Children,
  cloneElement,
  ReactElement,
  ReactNode,
  useEffect,
  useRef,
  useState,
} from 'react';

import { FlexBox } from '../Box';

export const HorizontalScrollBar: React.FC = ({ children }) => {
  // HOW to get all elements into a single observer

  const elementsRef = useRef<ReactNode[]>([]);
  const intersectionObserver = new IntersectionObserver(
    (entries: IntersectionObserverEntry[]) => {
      entries.forEach((entry) => console.log(entry));
    }
  );

  useEffect(() => {
    if (elementsRef.current.length) {
      elementsRef.current.forEach((entry) =>
        intersectionObserver.observe(entry)
      );
    }
  }, [elementsRef, intersectionObserver]);

  const [visibilityStates, setVisibilityStates] = useState([]);

  return (
    <FlexBox>
      {/* this needs some work  */}
      {Children.map<ReactNode, ReactElement>(children, (child, index) => {
        // elementsRef.current[index] = child

        // console.log(elementsRef.current[index])
        return cloneElement(child, {
          'aria-hidden': false,
          ref: (element: ReactNode) => (elementsRef.current[index] = element),
        });
      })}
    </FlexBox>
  );
};
