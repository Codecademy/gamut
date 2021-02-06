import { getDefaultPropKey } from '..';

describe(getDefaultPropKey, () => {
  const assertions = [
    {
      input: 'key',
      expected: 'key',
    },
    {
      input: 'marginX',
      expected: 'margin',
    },
    {
      input: 'paddingX',
      expected: 'padding',
    },
    {
      input: 'borderStyleTop',
      expected: 'borderStyle',
    },
    {
      input: 'borderColorTop',
      expected: 'borderColor',
    },
    {
      input: 'borderWidthTop',
      expected: 'borderWidth',
    },
  ];

  assertions.forEach(({ input, expected }) => {
    it(`parses ${input} as ${expected}`, () => {
      expect(getDefaultPropKey(input)).toBe(expected);
    });
  });
});
