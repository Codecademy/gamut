import {
  ColorMode,
  system,
  useCurrentMode,
  ZIndexValue,
} from '@codecademy/gamut-styles';
import styled from '@emotion/styled';
import { useState } from 'react';
import * as React from 'react';
import ReactDOM from 'react-dom';
import { useIsomorphicLayoutEffect } from 'react-use';

const PortalWrapper = styled
  .div(
    system.css({
      position: 'absolute',
      top: 0,
      left: 0,
      right: 0,
      height: 0,
    })
  )
  .withComponent(ColorMode);

export interface BodyPortalProps {
  zIndex?: ZIndexValue;
}

export const BodyPortal: React.FC<React.PropsWithChildren<BodyPortalProps>> = ({
  children,
  zIndex = 'floating',
}) => {
  const [ready, setReady] = useState(false);
  const mode = useCurrentMode();

  /** Delay initial render once to ensure that rehydration does not conflict with portal mounting */
  useIsomorphicLayoutEffect(() => {
    setReady(typeof document !== 'undefined');
  }, []);

  if (!ready) return null;

  return ReactDOM.createPortal(
    <PortalWrapper alwaysSetVariables mode={mode} zIndex={zIndex}>
      {children}
    </PortalWrapper>,
    document.body
  );
};
