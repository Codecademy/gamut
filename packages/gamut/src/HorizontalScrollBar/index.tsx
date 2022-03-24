import React, {
  Children,
  cloneElement,
  forwardRef,
  ReactElement,
  ReactNode,
  useEffect,
  useMemo,
  useRef,
  useState,
} from 'react';

import { FlexBox } from '../Box';

type VisibilityControllerProps = {
  visible?: boolean;
};

// export const VisibilityController: React.FC<VisibilityControllerProps> = ({
//   visible,
//   children,
// }) => {
//   const child = Children.toArray(children)[0];
//   return <>{cloneElement(child, { 'aria-hidden': !visible })}</>;
// };

const VisibilityController = forwardRef<HTMLElement, VisibilityControllerProps>(
  ({ visible, children }, ref) => {
    const child = Children.toArray(children)[0];
    return <>{cloneElement(child, { 'aria-hidden': visible })}</>;
  }
);

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

  const scrollBarElements = Children.map<ReactNode, ReactElement>(
    children,
    (child, index) => {
      return (
        <VisibilityController
          ref={(element: HTMLElement) => (elementsRef.current[index] = element)}
          visible={!!visibilityStates[index]}
        >
          {child}
        </VisibilityController>
      );
    }
  );

  return <FlexBox>{scrollBarElements}</FlexBox>;
};
