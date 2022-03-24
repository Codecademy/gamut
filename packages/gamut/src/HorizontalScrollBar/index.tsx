import React, {
  Children,
  cloneElement,
  ReactElement,
  ReactNode,
  useEffect,
  useMemo,
  useRef,
  useState,
} from 'react';

import { FlexBox } from '../Box';

type VisibilityControllerProps = {
  visible: boolean;
};

export const VisibilityController: React.FC<VisibilityControllerProps> = ({
  visible,
  children,
}) => {
  console.log(visible);
  return <>{children}</>;
};

export const HorizontalScrollBar: React.FC = ({ children }) => {
  // HOW to get all elements into a single observer

  const elementsRef = useRef<ReactNode[]>([]);
  const [visibilityStates, setVisibilityStates] = useState<boolean[]>([]);

  const intersectionObserver = useMemo(
    () =>
      new IntersectionObserver((entries: IntersectionObserverEntry[]) => {
        entries.forEach((entry, index) => {
          const newVisibilityStates = [...visibilityStates];

          if (visibilityStates[index] !== entry.isIntersecting) {
            newVisibilityStates[index] = entry.isIntersecting;
            setVisibilityStates(newVisibilityStates);
          }
        });
      }),
    [visibilityStates]
  );

  useEffect(() => {
    if (elementsRef.current.length) {
      elementsRef.current.forEach((entry) =>
        intersectionObserver.observe(entry)
      );
    }
  }, [elementsRef, intersectionObserver]);

  const stuff = Children.map<ReactNode, ReactElement>(
    children,
    (child, index) => {
      // elementsRef.current[index] = child

      // console.log(elementsRef.current[index])
      return (
        <VisibilityController visible={visibilityStates[index]}>
          {cloneElement(child, {
            ref: (element: ReactNode) => (elementsRef.current[index] = element),
          })}
        </VisibilityController>
      );
    }
  );

  console.log(stuff);

  return <FlexBox>{stuff}</FlexBox>;
};
