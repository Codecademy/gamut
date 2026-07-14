import {
  ColorMode,
  system,
  useCurrentMode,
  zIndexes,
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

interface BodyPortalProps {
  /**
   * Stacking layer for the portaled content. Pass a `zIndexes` token
   * (e.g. `zIndexes.modal`) or a raw number as an escape hatch. Defaults to
   * `zIndexes.floating` — the floor of the portal band — so un-tokenized portal content
   * stays above local page content instead of silently landing at a low value.
   */
  zIndex?: number;
}

export const BodyPortal: React.FC<React.PropsWithChildren<BodyPortalProps>> = ({
  children,
  zIndex = zIndexes.floating,
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
