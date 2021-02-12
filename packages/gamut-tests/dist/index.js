import { theme } from '@codecademy/gamut-styles';
import { ThemeProvider } from '@emotion/react';
import { setupEnzyme as setupEnzymeBase, setupRtl as setupRtlBase } from 'component-test-setup';
import { overArgs } from 'lodash';
import React from 'react'; // See https://www.notion.so/codecademy/Frontend-Unit-Tests-1cbf4e078a6647559b4583dfb6d3cb18

function withThemeProvider(WrappedComponent) {
  var WithBoundaryComponent = function WithBoundaryComponent(props) {
    return /*#__PURE__*/React.createElement(ThemeProvider, {
      theme: theme
    }, /*#__PURE__*/React.createElement(WrappedComponent, props));
  };

  return WithBoundaryComponent;
} // overArgs isn't fully typed yet for lack of curried generics, so we have to cast it...


export var setupEnzyme = overArgs(setupEnzymeBase, withThemeProvider);
export var setupRtl = overArgs(setupRtlBase, withThemeProvider);