import React, { useEffect, useState } from 'react';

import { WithChildrenProp } from '../utils/types';

interface DelayedRenderWrapperProps extends WithChildrenProp {
  delay: number;
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

    return () => clearTimeout(timer);
  }, [delay]);

  if (delay === 0) return <>{children}</>;

  return shouldRender ? <>{children}</> : null;
};
