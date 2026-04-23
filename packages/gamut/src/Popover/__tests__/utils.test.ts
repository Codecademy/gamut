import { resolveHorizontalSideForRtl } from '../utils';

describe('resolveHorizontalSideForRtl', () => {
  it.each([
    {
      side: 'left' as const,
      isRtl: false,
      useLogicalProperties: false,
      expected: 'left',
    },
    {
      side: 'right' as const,
      isRtl: false,
      useLogicalProperties: false,
      expected: 'right',
    },
    {
      side: 'left' as const,
      isRtl: true,
      useLogicalProperties: false,
      expected: 'left',
    },
    {
      side: 'right' as const,
      isRtl: true,
      useLogicalProperties: false,
      expected: 'right',
    },
    {
      side: 'left' as const,
      isRtl: false,
      useLogicalProperties: true,
      expected: 'left',
    },
    {
      side: 'right' as const,
      isRtl: false,
      useLogicalProperties: true,
      expected: 'right',
    },
    {
      side: 'left' as const,
      isRtl: true,
      useLogicalProperties: true,
      expected: 'right',
    },
    {
      side: 'right' as const,
      isRtl: true,
      useLogicalProperties: true,
      expected: 'left',
    },
  ])(
    '$side when isRtl=$isRtl useLogicalProperties=$useLogicalProperties → $expected',
    ({ side, isRtl, useLogicalProperties, expected }) => {
      expect(
        resolveHorizontalSideForRtl({ side, isRtl, useLogicalProperties })
      ).toBe(expected);
    }
  );

  it('treats undefined useLogicalProperties like false', () => {
    expect(
      resolveHorizontalSideForRtl({
        side: 'left',
        isRtl: true,
        useLogicalProperties: undefined,
      })
    ).toBe('left');
  });
});
