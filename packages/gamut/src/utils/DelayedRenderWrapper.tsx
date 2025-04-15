import React, { useEffect, useState } from 'react';

import { WithChildrenProp } from './types';

interface DelayedRenderWrapperProps extends WithChildrenProp {
  delay: number;
  children: React.ReactNode;
}

export const DelayedRenderWrapper: React.FC<DelayedRenderWrapperProps> = ({
  delay,
  children,
}) => {
  const [shouldRender, setShouldRender] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setShouldRender(true);
    }, delay);

    return () => clearTimeout(timer); // Cleanup the timer on unmount
  }, [delay]);

  return shouldRender ? <>{children}</> : null;
};
