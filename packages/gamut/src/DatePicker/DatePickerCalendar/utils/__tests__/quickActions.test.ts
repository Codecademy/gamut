import { computeQuickAction } from '../quickActions';

describe('computeQuickAction', () => {
  const fixed = new Date(2026, 4, 15); // May 15, 2026 local (“today” anchor)

  describe('range mode (isRange: true)', () => {
    it('returns [startDate, endDate] with endDate = anchor day when range is entirely in the past', () => {
      const { startDate, endDate } = computeQuickAction({
        num: -30,
        timePeriod: 'day',
        isRange: true,
        now: fixed,
      });
      expect(endDate).toEqual(new Date(2026, 4, 15));
      expect(startDate).toEqual(new Date(2026, 3, 15));
    });

    it('applies month as num * 30 rolling days', () => {
      const { startDate, endDate } = computeQuickAction({
        num: -1,
        timePeriod: 'month',
        isRange: true,
        now: fixed,
      });
      expect(endDate).toEqual(new Date(2026, 4, 15));
      expect(startDate).toEqual(new Date(2026, 3, 15));
    });

    it('applies multiple months as additional 30-day steps', () => {
      const { startDate, endDate } = computeQuickAction({
        num: -2,
        timePeriod: 'month',
        isRange: true,
        now: fixed,
      });
      expect(endDate).toEqual(new Date(2026, 4, 15));
      const expected = new Date(2026, 4, 15);
      expected.setDate(expected.getDate() - 60);
      expect(startDate).toEqual(expected);
    });

    it('applies year as num * 365 rolling days', () => {
      const { startDate, endDate } = computeQuickAction({
        num: -1,
        timePeriod: 'year',
        isRange: true,
        now: fixed,
      });
      expect(endDate).toEqual(new Date(2026, 4, 15));
      const expected = new Date(2026, 4, 15);
      expected.setDate(expected.getDate() - 365);
      expect(startDate).toEqual(expected);
    });

    it('when computed start is after anchor day, orders as [anchor, computed] so the range is forward', () => {
      const { startDate, endDate } = computeQuickAction({
        num: 5,
        timePeriod: 'day',
        isRange: true,
        now: fixed,
      });
      expect(startDate).toEqual(new Date(2026, 4, 15));
      expect(endDate).toEqual(new Date(2026, 4, 20));
    });
  });

  describe('single mode (isRange: false)', () => {
    it('does not swap when computed day is after anchor; endDate is still the anchor day', () => {
      const { startDate, endDate } = computeQuickAction({
        num: 1,
        timePeriod: 'day',
        isRange: false,
        now: fixed,
      });
      expect(endDate).toEqual(new Date(2026, 4, 15));
      expect(startDate).toEqual(new Date(2026, 4, 16));
    });

    it('returns past startDate with endDate = anchor for yesterday', () => {
      const { startDate, endDate } = computeQuickAction({
        num: -1,
        timePeriod: 'day',
        isRange: false,
        now: fixed,
      });
      expect(endDate).toEqual(new Date(2026, 4, 15));
      expect(startDate).toEqual(new Date(2026, 4, 14));
    });
  });
});
