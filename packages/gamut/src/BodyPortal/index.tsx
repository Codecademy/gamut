import { ColorMode } from '@codecademy/gamut-styles';
import { useTheme } from '@emotion/react';
import React, { useState } from 'react';
import ReactDOM from 'react-dom';
import { useIsomorphicLayoutEffect } from 'react-use';

import { AppWrapper } from '../AppWrapper';

const PortalWrapper = AppWrapper.withComponent(ColorMode);

export const BodyPortal: React.FC = ({ children }) => {
  const [ready, setReady] = useState(false);
  const {
    colorModes: { active },
  } = useTheme();

  /** Delay initial render once to ensure that rehydration does not conflict with portal mounting */
  useIsomorphicLayoutEffect(() => {
    setReady(typeof document !== 'undefined');
  }, []);

  if (!ready) return null;

  return ReactDOM.createPortal(
    <PortalWrapper mode={active} alwaysSetVariables>
      {children}
    </PortalWrapper>,
    document.body
  );
};
