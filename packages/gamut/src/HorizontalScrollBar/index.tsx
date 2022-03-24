import React, {
  Children,
  cloneElement,
  ReactElement,
  ReactNode,
  useRef,
  useState,
} from 'react';

import { FlexBox } from '../Box';

export const HorizontalScrollBar: React.FC = ({ children }) => {
  // HOW to get all elements into a single observer

  const elementsRef = useRef<ReactNode[]>([]);

  const [visibilityStates, setVisibilityStates] = useState([]);

  return (
    <FlexBox>
      {/* this needs some work  */}
      {Children.map<ReactNode, ReactElement>(children, (child, index) => {
        // elementsRef.current[index] = child

        // console.log(elementsRef.current[index])
        return cloneElement(child, {
          ref: (element: ReactNode) => (elementsRef.current[index] = element),
        });
      })}
    </FlexBox>
  );
};
