import { ColorMode, useCurrentMode } from '@codecademy/gamut-styles';
import React, { useState } from 'react';
import ReactDOM from 'react-dom';
import { useIsomorphicLayoutEffect } from 'react-use';

import { AppWrapper } from '../AppWrapper';

const PortalWrapper = AppWrapper.withComponent(ColorMode);

export const BodyPortal: React.FC = ({ children }) => {
  const [ready, setReady] = useState(false);
  const mode = useCurrentMode();

  /** Delay initial render once to ensure that rehydration does not conflict with portal mounting */
  useIsomorphicLayoutEffect(() => {
    setReady(typeof document !== 'undefined');
  }, []);

  if (!ready) return null;

  return ReactDOM.createPortal(
    <PortalWrapper mode={mode} alwaysSetVariables>
      {children}
    </PortalWrapper>,
    document.body
  );
};
