import React, { useState } from 'react';
import ReactDOM from 'react-dom';
import { useIsomorphicLayoutEffect } from 'react-use';

import { AppWrapper } from '../AppWrapper';

export const BodyPortal: React.FC = ({ children }) => {
  const [ready, setReady] = useState(false);

  /** Delay initial render once to ensure that rehydration does not conflict with portal mounting */
  useIsomorphicLayoutEffect(() => {
    setReady(typeof document !== 'undefined');
  }, []);

  if (!ready) return null;

  return ReactDOM.createPortal(
    <AppWrapper>{children}</AppWrapper>,
    document.body
  );
};
