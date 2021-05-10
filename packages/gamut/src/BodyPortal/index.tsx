import { ColorMode } from '@codecademy/gamut-styles';
import { useTheme } from '@emotion/react';
import React, { useState } from 'react';
import ReactDOM from 'react-dom';
import { useIsomorphicLayoutEffect } from 'react-use';

const PortalWrapper = ColorMode;

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
    <PortalWrapper
      position="absolute"
      top={0}
      left={0}
      right={0}
      bottom={1}
      mode={active}
      zIndex={1}
      alwaysSetVariables
    >
      {children}
    </PortalWrapper>,
    document.body
  );
};
