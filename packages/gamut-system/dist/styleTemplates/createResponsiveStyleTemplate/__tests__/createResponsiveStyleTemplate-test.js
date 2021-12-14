function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

import { createStandardStyleTemplate } from '../../createStandardStyleTemplate';
import { createResponsiveStyleTemplate } from '..';
import { DEFAULT_MEDIA_QUERIES } from '../constants';
describe(createResponsiveStyleTemplate, function () {
  var styleTemplates = {
    display: createStandardStyleTemplate({
      propName: 'display',
      transformValue: function transformValue(val) {
        return val;
      }
    }),
    height: createStandardStyleTemplate({
      propName: 'height',
      transformValue: function transformValue(val) {
        return val;
      }
    }),
    width: createStandardStyleTemplate({
      propName: 'width',
      transformValue: function transformValue(val) {
        return val;
      }
    })
  };
  var propFunction = createResponsiveStyleTemplate({
    propNames: ['display', 'width', 'height'],
    styleTemplates: styleTemplates
  });
  it('returns empty object if styles are undefined', function () {
    var outputStyles = propFunction({
      display: undefined
    });
    expect(outputStyles).toEqual({});
  });
  it('returns primitive prop values on the lowest breakpoint', function () {
    var outputStyles = propFunction({
      display: 'block'
    });
    expect(outputStyles).toEqual({
      display: 'block'
    });
  });
  it('Creates the correct breapoint with object syntax', function () {
    var outputStyles = propFunction({
      display: {
        xs: 'block'
      }
    });
    expect(outputStyles).toEqual(_defineProperty({}, DEFAULT_MEDIA_QUERIES.xs, {
      display: 'block'
    }));
  });
  it('Creates the correct breapoint with array syntax', function () {
    var outputStyles = propFunction({
      display: [, 'block']
    });
    expect(outputStyles).toEqual(_defineProperty({}, DEFAULT_MEDIA_QUERIES.xs, {
      display: 'block'
    }));
  });
  it('merges smallest breakpoints with the primitive values on the lowest breakpoint', function () {
    var outputStyles = propFunction({
      display: 'block',
      width: ['5px'],
      height: {
        base: '5px'
      }
    });
    expect(outputStyles).toEqual({
      height: '5px',
      width: '5px',
      display: 'block'
    });
  });
  it('merges higher breakpoints with different props', function () {
    var outputStyles = propFunction({
      display: 'block',
      width: [,,, '5px'],
      height: {
        md: '5px'
      }
    });
    expect(outputStyles).toEqual(_defineProperty({
      display: 'block'
    }, DEFAULT_MEDIA_QUERIES.md, {
      width: '5px',
      height: '5px'
    }));
  });
});