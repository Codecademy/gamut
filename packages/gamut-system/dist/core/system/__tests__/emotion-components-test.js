var _templateObject, _templateObject2;

function _taggedTemplateLiteral(strings, raw) { if (!raw) { raw = strings.slice(0); } return Object.freeze(Object.defineProperties(strings, { raw: { value: Object.freeze(raw) } })); }

import { matchers } from '@emotion/jest';
import { ThemeProvider } from '@emotion/react';
import styled from '@emotion/styled';
import React from 'react';
import render from 'react-test-renderer';
import { DEFAULT_MEDIA_QUERIES } from '../../../styleTemplates/createResponsiveStyleTemplate/constants';
import { system } from '..';
expect.extend(matchers);
describe('Styled components integration', function () {
  describe('base components', function () {
    var _system$create = system.create({}),
        variant = _system$create.variant,
        typography = _system$create.typography;

    var textVariants = variant({
      primary: {
        fontSize: '1rem',
        textColor: 'blue'
      },
      secondary: {
        fontSize: '0.85rem'
      }
    });
    var MyComponent = styled.div(_templateObject || (_templateObject = _taggedTemplateLiteral(["\n      ", "\n      ", "\n    "])), textVariants, typography);
    it('creates a basic style rule on an emotion component', function () {
      var view = render.create( /*#__PURE__*/React.createElement(MyComponent, {
        fontSize: "1rem"
      })).toJSON();
      expect(view).toHaveStyleRule('font-size', '1rem');
    });
    it('adds breakpoints when configured', function () {
      var view = render.create( /*#__PURE__*/React.createElement(MyComponent, {
        fontSize: ['1rem', '2rem']
      })).toJSON();
      expect(view).toHaveStyleRule('font-size', '1rem');
      expect(view).toHaveStyleRule('font-size', '2rem', {
        media: DEFAULT_MEDIA_QUERIES.xs.replace('@media ', '')
      });
    });
    it('last function used overwrites earlier styles', function () {
      var noOverride = render.create( /*#__PURE__*/React.createElement(MyComponent, {
        variant: "primary"
      })).toJSON();
      expect(noOverride).toHaveStyleRule('font-size', '1rem');
      expect(noOverride).toHaveStyleRule('color', 'blue');
      var withOverride = render.create( /*#__PURE__*/React.createElement(MyComponent, {
        variant: "primary",
        fontSize: "50rem"
      })).toJSON();
      expect(withOverride).toHaveStyleRule('font-size', '50rem');
      expect(withOverride).toHaveStyleRule('color', 'blue');
    });
  });
  describe('themed components', function () {
    var theme = {
      fontSizes: {
        xs: '1rem',
        md: '2rem'
      }
    };

    var Theme = function Theme(_ref) {
      var children = _ref.children;
      return /*#__PURE__*/React.createElement(ThemeProvider, {
        theme: theme
      }, children);
    };

    var _system$withTheme$cre = system.withTheme().create({
      typography: {
        fontSize: {
          propName: 'fontSize',
          scale: 'fontSizes'
        }
      }
    }),
        variant = _system$withTheme$cre.variant,
        typography = _system$withTheme$cre.typography;

    var textVariants = variant({
      primary: {
        fontSize: 'xs',
        textColor: 'blue'
      },
      secondary: {
        fontSize: 'md'
      }
    });
    var MyComponent = styled.div(_templateObject2 || (_templateObject2 = _taggedTemplateLiteral(["\n      ", "\n      ", "\n    "])), textVariants, typography);
    it('creates a basic style rule on an emotion with a theme look up', function () {
      var view = render.create( /*#__PURE__*/React.createElement(Theme, null, /*#__PURE__*/React.createElement(MyComponent, {
        fontSize: "xs"
      }))).toJSON();
      expect(view).toHaveStyleRule('font-size', theme.fontSizes.xs);
    });
    it('adds breakpoints when configured', function () {
      var view = render.create( /*#__PURE__*/React.createElement(Theme, null, /*#__PURE__*/React.createElement(MyComponent, {
        fontSize: ['xs', 'md']
      }))).toJSON();
      expect(view).toHaveStyleRule('font-size', theme.fontSizes.xs);
      expect(view).toHaveStyleRule('font-size', theme.fontSizes.md, {
        media: DEFAULT_MEDIA_QUERIES.xs.replace('@media ', '')
      });
    });
    it('last function used overwrites earlier styles', function () {
      var noOverride = render.create( /*#__PURE__*/React.createElement(Theme, null, /*#__PURE__*/React.createElement(MyComponent, {
        variant: "primary"
      }))).toJSON();
      expect(noOverride).toHaveStyleRule('font-size', theme.fontSizes.xs);
      expect(noOverride).toHaveStyleRule('color', 'blue');
      var withOverride = render.create( /*#__PURE__*/React.createElement(Theme, null, /*#__PURE__*/React.createElement(MyComponent, {
        variant: "primary",
        fontSize: "md"
      }))).toJSON();
      expect(withOverride).toHaveStyleRule('font-size', theme.fontSizes.md);
      expect(withOverride).toHaveStyleRule('color', 'blue');
    });
    it('returns the original value if no theme exists', function () {
      var view = render.create( /*#__PURE__*/React.createElement(MyComponent, {
        fontSize: "xs"
      })).toJSON();
      expect(view).toHaveStyleRule('font-size', 'xs');
    });
  });
});