import { getDefaultPropKey } from '..';
describe(getDefaultPropKey, function () {
  var assertions = [{
    input: 'key',
    expected: 'key'
  }, {
    input: 'marginX',
    expected: 'margin'
  }, {
    input: 'paddingX',
    expected: 'padding'
  }, {
    input: 'borderStyleTop',
    expected: 'borderStyle'
  }, {
    input: 'borderColorTop',
    expected: 'borderColor'
  }, {
    input: 'borderWidthTop',
    expected: 'borderWidth'
  }];
  assertions.forEach(function (_ref) {
    var input = _ref.input,
        expected = _ref.expected;
    it("parses ".concat(input, " as ").concat(expected), function () {
      expect(getDefaultPropKey(input)).toBe(expected);
    });
  });
});