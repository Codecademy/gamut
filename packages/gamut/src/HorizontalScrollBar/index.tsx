import React, { Children, cloneElement, ReactNode, useRef } from 'react';

import { FlexBox } from '../Box';

export const HorizontalScrollBar: React.FC = ({ children }) => {
  // HOW to get all elements into a single observer

  const elementsRef = useRef<ReactNode[]>([]);

  // useEffect(() => {
  //   if (!elementsRef.current.length) {
  //     Children.map<ReactNode, ReactNode>(
  //       children,
  //       (child, index) =>{
  //         elementsRef.current[index] = child

  //         console.log(elementsRef.current[index])
  //         return null
  //       }
  //     );
  //   }
  // }, [elementsRef, children]);

  console.log(elementsRef);

  return (
    <FlexBox>
      {/* this needs some work  */}
      {Children.map<any, any>(children, (child, index) => {
        // elementsRef.current[index] = child

        // console.log(elementsRef.current[index])
        return cloneElement(child, {
          ref: (element: ReactNode) => (elementsRef.current[index] = element),
        });
      })}
    </FlexBox>
  );
};
