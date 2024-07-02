import { ColorMode, system, useCurrentMode } from '@codecademy/gamut-styles';
import styled from '@emotion/styled';
import { useState } from 'react';
import * as React from 'react';
import ReactDOM from 'react-dom';
import { useIsomorphicLayoutEffect } from 'react-use';

const PortalWrapper = styled
  .div(
    system.css({
      position: 'absolute',
      zIndex: 1,
      top: 0,
      left: 0,
      right: 0,
      height: 0,
    })
  )
  .withComponent(ColorMode);

export const BodyPortal = ({ children }: React.PropsWithChildren) => {
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
