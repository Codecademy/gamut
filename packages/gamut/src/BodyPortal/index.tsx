import { ColorMode, system } from '@codecademy/gamut-styles';
import { useTheme } from '@emotion/react';
import styled from '@emotion/styled';
import React, { useState } from 'react';
import ReactDOM from 'react-dom';
import { useIsomorphicLayoutEffect } from 'react-use';

const PortalWrapper = styled
  .div(system.css({ position: 'absolute', zIndex: 1, inset: 0, bottom: 1 }))
  .withComponent(ColorMode);

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
