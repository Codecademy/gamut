import { sanitizeHexString } from '@codecademy/gamut-labs/src/experimental/PixelBox/getPixelPattern';

describe('santizeHexString', () => {
  test('should escape # with %23', () => {
    const testSanitizedColor = sanitizeHexString('#F5FCFF');
    expect(testSanitizedColor).toBe('%23F5FCFF');
  });
  test('should return string when # is not present', () => {
    const testSanitizedColor = sanitizeHexString('white');
    expect(testSanitizedColor).toBe('white');
  });
});
