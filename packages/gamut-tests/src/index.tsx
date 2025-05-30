import { GamutProvider, theme } from '@codecademy/gamut-styles';
import {
  setupEnzyme as setupEnzymeBase,
  setupRtl as setupRtlBase,
} from 'component-test-setup';
import overArgs from 'lodash/overArgs';
import * as React from 'react';

// See https://www.notion.so/codecademy/Frontend-Unit-Tests-1cbf4e078a6647559b4583dfb6d3cb18 for more info

export const MockGamutProvider: React.FC<{ children?: React.ReactNode }> = ({
  children,
}) => {
  return (
    <GamutProvider theme={theme} useCache={false} useGlobals={false}>
      {children}
    </GamutProvider>
  );
};

function withMockGamutProvider<Props extends JSX.IntrinsicAttributes>(
  WrappedComponent: React.ComponentType<Props>
) {
  const WithBoundaryComponent: React.FC<Props> = (props) => (
    <MockGamutProvider>
      <WrappedComponent {...props} />
    </MockGamutProvider>
  );

  return WithBoundaryComponent;
}

// overArgs isn't fully typed yet for lack of curried generics, so we have to cast it...

/**
 * @deprecated Enzyme is no longer being maintained. Use RTL instead.
 */
export const setupEnzyme = overArgs(
  setupEnzymeBase,
  withMockGamutProvider
) as typeof setupEnzymeBase;

export const setupRtl = overArgs(
  setupRtlBase,
  withMockGamutProvider
) as typeof setupRtlBase;
