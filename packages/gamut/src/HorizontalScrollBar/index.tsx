import React from 'react';

import { FlexBox } from '../Box';

export const HorizontalScrollBar: React.FC = ({ children }) => {
  // HOW to get all elements into a single observer

  // const elementsRef = useRef<HTMLBaseElement[] | null>([])

  // if(!ref.current) return null

  return <FlexBox>{children}</FlexBox>;
};
