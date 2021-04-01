import React, { useEffect, useState } from 'react';

export type DeferredRenderProps = {
  fallback?: React.ReactNode;
};

/**
 * DeferredRender
 *
 * This is a simple component that just ensures that it's children don't render
 * until this component is mounted.
 *
 * This is mainly used to prevent a component from rendering serverside.
 */
export const DeferredRender: React.FC<DeferredRenderProps> = ({
  children,
  fallback,
}) => {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  return <>{mounted ? children : fallback || null}</>;
};
