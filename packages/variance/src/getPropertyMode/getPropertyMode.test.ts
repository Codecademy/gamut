import { getPropertyMode } from './getPropertyMode';

describe('getPropertyMode', () => {
  it.each([
    { useLogicalProperties: true, expected: 'logical' },
    { useLogicalProperties: false, expected: 'physical' },
  ])(
    'returns "$expected" when useLogicalProperties is $useLogicalProperties',
    ({ useLogicalProperties, expected }) => {
      expect(getPropertyMode(useLogicalProperties)).toBe(expected);
    }
  );
});

