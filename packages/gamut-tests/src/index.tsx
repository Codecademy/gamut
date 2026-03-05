import { GamutProvider, theme } from '@codecademy/gamut-styles';
import {
  setupEnzyme as setupEnzymeBase,
  setupRtl as setupRtlBase,
} from 'component-test-setup';
import overArgs from 'lodash/overArgs';
import * as React from 'react';

// See https://skillsoftdev.atlassian.net/wiki/spaces/779a16d9c7ea452eab11b39cbbe771ce/pages/4441315387/Frontend+Unit+Tests for more info

export const MockGamutProvider: React.FC<{
  children?: React.ReactNode;
  useLogicalProperties?: boolean;
}> = ({ children, useLogicalProperties }) => {
  return (
    <GamutProvider
      theme={theme}
      useCache={false}
      useGlobals={false}
      useLogicalProperties={useLogicalProperties}
    >
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
