import { theme } from '@codecademy/gamut-styles';
import { ThemeProvider } from '@emotion/react';
import {
  setupEnzyme as setupEnzymeBase,
  setupRtl as setupRtlBase,
} from 'component-test-setup';
import { overArgs } from 'lodash';
import React from 'react';

// See https://www.notion.so/codecademy/Frontend-Unit-Tests-1cbf4e078a6647559b4583dfb6d3cb18

function withThemeProvider<Props>(
  WrappedComponent: React.ComponentType<Props>
) {
  const WithBoundaryComponent: React.FC<Props> = (props) => (
    <ThemeProvider theme={theme}>
      <WrappedComponent {...props} />
    </ThemeProvider>
  );

  return WithBoundaryComponent;
}

// overArgs isn't fully typed yet for lack of curried generics, so we have to cast it...

export const setupEnzyme = overArgs(
  setupEnzymeBase,
  withThemeProvider
) as typeof setupEnzymeBase;

export const setupRtl = overArgs(
  setupRtlBase,
  withThemeProvider
) as typeof setupRtlBase;
