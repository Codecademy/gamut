import { GamutProvider, theme } from '@codecademy/gamut-styles';
import {
  setupEnzyme as setupEnzymeBase,
  setupRtl as setupRtlBase,
} from 'component-test-setup';
import { overArgs } from 'lodash';
import React from 'react';

// See https://www.notion.so/codecademy/Frontend-Unit-Tests-1cbf4e078a6647559b4583dfb6d3cb18

export const MockGamutProvider: React.FC = ({ children }) => {
  return (
    <GamutProvider useGlobals={false} useCache={false} theme={theme}>
      {children}
    </GamutProvider>
  );
};

function withMockGamutProvider<Props>(
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
