import { createStandardStyleTemplate } from '..';
describe(createStandardStyleTemplate, function () {
  it('creates a property function', function () {
    var styleTemplate = createStandardStyleTemplate({
      propName: 'display',
      transformValue: function transformValue(val) {
        return val;
      }
    });
    var templatedStyles = styleTemplate({
      display: 'block'
    });
    expect(templatedStyles).toEqual({
      display: 'block'
    });
  });
  it('accepts a custom transform function', function () {
    var doubleMargin = createStandardStyleTemplate({
      propName: 'margin',
      transformValue: function transformValue(val) {
        return "".concat(val * 2, "px");
      }
    });
    var templatedStyles = doubleMargin({
      margin: 4
    });
    expect(templatedStyles).toEqual({
      margin: '8px'
    });
  });
  it('does not return a rule if not given a a value', function () {
    var styleTemplate = createStandardStyleTemplate({
      propName: 'display',
      transformValue: function transformValue(val) {
        return val;
      }
    });
    var templatedStyles = styleTemplate({
      display: undefined
    });
    expect(templatedStyles).toBe(undefined);
    var emptyPropsStyles = styleTemplate({});
    expect(emptyPropsStyles).toBe(undefined);
  });
  it('returns a rule if prop value is falsy', function () {
    var styleTemplate = createStandardStyleTemplate({
      propName: 'margin',
      transformValue: function transformValue(val) {
        return val;
      }
    });
    var falsyValueStyles = styleTemplate({
      margin: 0
    });
    expect(falsyValueStyles).toEqual({
      margin: 0
    });
  });
  it('looks up literal map scale values when configured', function () {
    var styleTemplate = createStandardStyleTemplate({
      propName: 'margin',
      transformValue: function transformValue(val) {
        return val;
      },
      scale: {
        sm: '10px'
      }
    });
    var themeValues = styleTemplate({
      margin: 'sm'
    });
    expect(themeValues).toEqual({
      margin: '10px'
    });
  });
  it('if literal map scale values cannot be found it returns the the original value', function () {
    var styleTemplate = createStandardStyleTemplate({
      propName: 'margin',
      transformValue: function transformValue(val) {
        return val;
      },
      scale: {
        sm: '10px'
      }
    });
    var themeValues = styleTemplate({
      margin: 'notSm'
    });
    expect(themeValues).toEqual({
      margin: 'notSm'
    });
  });
  it('returns the original value if array scale values are provided', function () {
    var styleTemplate = createStandardStyleTemplate({
      propName: 'margin',
      transformValue: function transformValue(val) {
        return val;
      },
      scale: [10, 20]
    });
    var themeValues = styleTemplate({
      margin: 'sms'
    });
    expect(themeValues).toEqual({
      margin: 'sms'
    });
  });
  it('looks up theme map scale values when configured with a theme scale', function () {
    var theme = {
      spacing: {
        sm: '10px',
        md: '20px'
      }
    };
    var styleTemplate = createStandardStyleTemplate({
      propName: 'margin',
      transformValue: function transformValue(val) {
        return val;
      },
      scale: 'spacing'
    });
    var themeValues = styleTemplate({
      margin: 'sm',
      theme: theme
    });
    expect(themeValues).toEqual({
      margin: '10px'
    });
  });
  it('if theme map scale values cannot be found it returns the the original value, when configured with a theme scale', function () {
    var theme = {
      spacing: {
        sm: '10px',
        md: '20px'
      }
    };
    var styleTemplate = createStandardStyleTemplate({
      propName: 'margin',
      transformValue: function transformValue(val) {
        return val;
      },
      scale: 'spacing'
    });
    var themeValues = styleTemplate({
      margin: 'sms',
      theme: theme
    });
    expect(themeValues).toEqual({
      margin: 'sms'
    });
  });
  it('returns the original value if array scale values are provided', function () {
    var theme = {
      spacing: [10, 20]
    };
    var styleTemplate = createStandardStyleTemplate({
      propName: 'margin',
      transformValue: function transformValue(val) {
        return val;
      },
      scale: 'spacing'
    });
    var themeValues = styleTemplate({
      margin: 'sms',
      theme: theme
    });
    expect(themeValues).toEqual({
      margin: 'sms'
    });
  });
  it('can have a property used instead of propName', function () {
    var styleTemplate = createStandardStyleTemplate({
      propName: 'textColor',
      property: 'color',
      transformValue: function transformValue(val) {
        return val;
      }
    });
    var themeValues = styleTemplate({
      textColor: 'green'
    });
    expect(themeValues).toEqual({
      color: 'green'
    });
  });
});