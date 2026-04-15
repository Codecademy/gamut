import { computeQuickAction } from '../quickActions';

describe('computeQuickAction', () => {
  const fixed = new Date(2026, 4, 15); // May 15, 2026 local (“today” anchor)

  describe('range mode (isRange: true)', () => {
    it('returns [start, end] with end = anchor day when range is entirely in the past', () => {
      const { start, end } = computeQuickAction(-30, 'day', true, fixed);
      expect(end).toEqual(new Date(2026, 4, 15));
      expect(start).toEqual(new Date(2026, 3, 15));
    });

    it('applies month as num * 30 rolling days', () => {
      const { start, end } = computeQuickAction(-1, 'month', true, fixed);
      expect(end).toEqual(new Date(2026, 4, 15));
      expect(start).toEqual(new Date(2026, 3, 15));
    });

    it('applies multiple months as additional 30-day steps', () => {
      const { start, end } = computeQuickAction(-2, 'month', true, fixed);
      expect(end).toEqual(new Date(2026, 4, 15));
      const expected = new Date(2026, 4, 15);
      expected.setDate(expected.getDate() - 60);
      expect(start).toEqual(expected);
    });

    it('applies year as num * 365 rolling days', () => {
      const { start, end } = computeQuickAction(-1, 'year', true, fixed);
      expect(end).toEqual(new Date(2026, 4, 15));
      const expected = new Date(2026, 4, 15);
      expected.setDate(expected.getDate() - 365);
      expect(start).toEqual(expected);
    });

    it('when start is after anchor day, orders as [anchor, start] so the range is forward', () => {
      const { start, end } = computeQuickAction(5, 'day', true, fixed);
      expect(start).toEqual(new Date(2026, 4, 15));
      expect(end).toEqual(new Date(2026, 4, 20));
    });
  });

  describe('single mode (isRange: false)', () => {
    it('does not swap when start is after anchor; end is still the anchor day', () => {
      const { start, end } = computeQuickAction(1, 'day', false, fixed);
      expect(end).toEqual(new Date(2026, 4, 15));
      expect(start).toEqual(new Date(2026, 4, 16));
    });

    it('returns past start with end = anchor for yesterday', () => {
      const { start, end } = computeQuickAction(-1, 'day', false, fixed);
      expect(end).toEqual(new Date(2026, 4, 15));
      expect(start).toEqual(new Date(2026, 4, 14));
    });
  });
});
