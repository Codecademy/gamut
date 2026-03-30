import { setupRtl as setupRtlBase } from 'component-test-setup';
import overArgs from 'lodash/overArgs';
import * as React from 'react';

import { GamutProvider } from '../GamutProvider';
import { coreTheme as theme } from '../themes';

/**
 * This is effectively a duplicate of the `MockGamutProvider` in `gamut-tests`.
 * Because gamut-tests depends on gamut-styles, it creates a circular dependency.
 */
function withMockGamutProvider<Props extends JSX.IntrinsicAttributes>(
  WrappedComponent: React.ComponentType<Props>
) {
  const WithBoundaryComponent: React.FC<Props> = (props) => (
    <GamutProvider theme={theme} useCache={false} useGlobals={false}>
      <WrappedComponent {...props} />
    </GamutProvider>
  );

  return WithBoundaryComponent;
}

export const setupRtl = overArgs(
  setupRtlBase,
  withMockGamutProvider
) as typeof setupRtlBase;
