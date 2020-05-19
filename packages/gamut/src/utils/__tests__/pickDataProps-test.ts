import { pickDataProps } from '../pickDataProps';

describe('pickDataProps', () => {
  it('should return an object with keys beginning with "data-"', () => {
    const expected = {
      'data-testid': 'mock-data-testid',
      'data-someOtherDataAttr': 'mock-data-attribute',
    };

    expect(
      pickDataProps({
        disabled: false,
        'some-disallowed-prop': 'Toy Story 2 was ok',
        'sneaky-data-attr': 'Nuh uh!',
        'data-testid': 'mock-data-testid',
        'data-someOtherDataAttr': 'mock-data-attribute',
      })
    ).toEqual(expected);
  });
});
