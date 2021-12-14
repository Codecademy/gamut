function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

import { identity } from 'lodash';
import { createDirectionalStyleTemplate, createStandardStyleTemplate } from '../../../styleTemplates';
import { DEFAULT_MEDIA_QUERIES } from '../../../styleTemplates/createResponsiveStyleTemplate/constants';
import { createHandler } from '..';
describe(createHandler, function () {
  it('creates a style function', function () {
    var styleFunction = createHandler({
      propName: 'height'
    });
    expect(styleFunction({
      height: 'auto'
    })).toEqual({
      height: 'auto'
    });
  });
  it('adds prop names the function is responsible for as a key on the function object', function () {
    var styleFunction = createHandler({
      propName: 'height'
    });
    expect(styleFunction.propNames).toEqual(['height']);
  });
  it('adds dependentProps to the propName array', function () {
    var styleFunction = createHandler({
      propName: 'height',
      dependentProps: ['maxHeight', 'minHeight']
    });
    expect(styleFunction.propNames).toEqual(['height', 'maxHeight', 'minHeight']);
  });
  it('adds the the template functions to the styleTemplates key on the function object', function () {
    var _styleTemplates$heigh;

    var _createHandler = createHandler({
      propName: 'height'
    }),
        styleTemplates = _createHandler.styleTemplates;

    expect(Object.keys(styleTemplates)).toEqual(['height']);
    expect((_styleTemplates$heigh = styleTemplates.height) === null || _styleTemplates$heigh === void 0 ? void 0 : _styleTemplates$heigh.toString()).toEqual(createStandardStyleTemplate({
      propName: 'height',
      transformValue: identity
    }).toString());
  });
  it('creates a directional style template if type is specified', function () {
    var _styleTemplates$heigh2;

    var _createHandler2 = createHandler({
      propName: 'height',
      type: 'directional'
    }),
        styleTemplates = _createHandler2.styleTemplates;

    expect((_styleTemplates$heigh2 = styleTemplates.height) === null || _styleTemplates$heigh2 === void 0 ? void 0 : _styleTemplates$heigh2.toString()).toEqual(createDirectionalStyleTemplate({
      propName: 'height',
      transformValue: identity
    }).toString());
  });
  it('returns a responsive style template to handle media queries', function () {
    var styleFunction = createHandler({
      propName: 'height'
    });
    expect(styleFunction({
      height: [, 'auto']
    })).toEqual(_defineProperty({}, DEFAULT_MEDIA_QUERIES.xs, {
      height: 'auto'
    }));
  });
});