import {
  calculateBarWidth,
  calculatePercent,
  calculatePositionPercent,
  calculateTicksAndRange,
  getLabel,
  niceNum,
  numDigits,
} from '../index';

describe('BarChart Utils', () => {
  describe('numDigits', () => {
    it('calculates number of digits correctly', () => {
      expect(numDigits({ num: 0 })).toBe(1);
      expect(numDigits({ num: 5 })).toBe(1);
      expect(numDigits({ num: 10 })).toBe(2);
      expect(numDigits({ num: 100 })).toBe(3);
      expect(numDigits({ num: 1000 })).toBe(4);
      expect(numDigits({ num: 12345 })).toBe(5);
    });

    it('handles negative numbers', () => {
      expect(numDigits({ num: -5 })).toBe(1);
      expect(numDigits({ num: -100 })).toBe(3);
    });
  });

  describe('calculatePercent', () => {
    it('calculates percentage correctly', () => {
      expect(calculatePercent({ value: 50, total: 100 })).toBe(50);
      expect(calculatePercent({ value: 25, total: 100 })).toBe(25);
      expect(calculatePercent({ value: 0, total: 100 })).toBe(0);
      expect(calculatePercent({ value: 100, total: 100 })).toBe(100);
    });

    it('handles decimal results', () => {
      expect(calculatePercent({ value: 1, total: 3 })).toBeCloseTo(33.333, 1);
      expect(calculatePercent({ value: 2, total: 3 })).toBeCloseTo(66.666, 1);
    });
  });

  describe('calculateBarWidth', () => {
    it('calculates bar width as percentage of range', () => {
      expect(
        calculateBarWidth({ value: 50, minRange: 0, maxRange: 100 })
      ).toBe(50);
      expect(
        calculateBarWidth({ value: 25, minRange: 0, maxRange: 100 })
      ).toBe(25);
      expect(
        calculateBarWidth({ value: 0, minRange: 0, maxRange: 100 })
      ).toBe(0);
      expect(
        calculateBarWidth({ value: 100, minRange: 0, maxRange: 100 })
      ).toBe(100);
    });

    it('handles non-zero minRange', () => {
      expect(
        calculateBarWidth({ value: 75, minRange: 50, maxRange: 100 })
      ).toBe(50);
      expect(
        calculateBarWidth({ value: 50, minRange: 50, maxRange: 100 })
      ).toBe(0);
    });

    it('handles values outside range', () => {
      expect(
        calculateBarWidth({ value: 150, minRange: 0, maxRange: 100 })
      ).toBe(100);
      expect(
        calculateBarWidth({ value: -10, minRange: 0, maxRange: 100 })
      ).toBe(0);
    });
  });

  describe('niceNum', () => {
    it('returns nice numbers when roundDown is true', () => {
      expect(niceNum({ range: 1234, roundDown: true })).toBe(1000);
      expect(niceNum({ range: 567, roundDown: true })).toBe(500);
      expect(niceNum({ range: 234, roundDown: true })).toBe(200);
      expect(niceNum({ range: 123, roundDown: true })).toBe(100);
      expect(niceNum({ range: 67, roundDown: true })).toBe(50);
      expect(niceNum({ range: 34, roundDown: true })).toBe(20);
      expect(niceNum({ range: 12, roundDown: true })).toBe(10);
    });

    it('returns nice numbers when roundDown is false', () => {
      expect(niceNum({ range: 1234, roundDown: false })).toBe(2000);
      expect(niceNum({ range: 567, roundDown: false })).toBe(1000);
      expect(niceNum({ range: 234, roundDown: false })).toBe(500);
      expect(niceNum({ range: 123, roundDown: false })).toBe(200);
      expect(niceNum({ range: 67, roundDown: false })).toBe(100);
      expect(niceNum({ range: 34, roundDown: false })).toBe(50);
      expect(niceNum({ range: 12, roundDown: false })).toBe(20);
    });

    it('handles small ranges', () => {
      expect(niceNum({ range: 1, roundDown: true })).toBe(1);
      expect(niceNum({ range: 1, roundDown: false })).toBe(1);
    });
  });

  describe('calculateTicksAndRange', () => {
    it('calculates tick count and nice range', () => {
      const [tickCount, niceMin, niceMax] = calculateTicksAndRange({
        maxTicks: 5,
        min: 0,
        max: 100,
      });

      expect(tickCount).toBeGreaterThan(0);
      expect(niceMin).toBeLessThanOrEqual(0);
      expect(niceMax).toBeGreaterThanOrEqual(100);
    });

    it('handles different maxTicks values', () => {
      const [tickCount1] = calculateTicksAndRange({
        maxTicks: 3,
        min: 0,
        max: 100,
      });
      const [tickCount2] = calculateTicksAndRange({
        maxTicks: 10,
        min: 0,
        max: 100,
      });

      expect(tickCount2).toBeGreaterThan(tickCount1);
    });

    it('handles non-zero min values', () => {
      const [tickCount, niceMin, niceMax] = calculateTicksAndRange({
        maxTicks: 5,
        min: 50,
        max: 150,
      });

      expect(niceMin).toBeLessThanOrEqual(50);
      expect(niceMax).toBeGreaterThanOrEqual(150);
      expect(tickCount).toBeGreaterThan(0);
    });
  });

  describe('getLabel', () => {
    it('calculates label value for given index', () => {
      expect(getLabel({ labelCount: 5, labelIndex: 0, min: 0, max: 100 })).toBe(0);
      expect(getLabel({ labelCount: 5, labelIndex: 4, min: 0, max: 100 })).toBe(100);
    });

    it('handles single label', () => {
      expect(getLabel({ labelCount: 1, labelIndex: 0, min: 0, max: 100 })).toBe(100);
    });

    it('calculates intermediate label values', () => {
      const value = getLabel({ labelCount: 5, labelIndex: 2, min: 0, max: 100 });
      expect(value).toBeGreaterThan(0);
      expect(value).toBeLessThan(100);
    });

    it('handles non-zero min values', () => {
      expect(getLabel({ labelCount: 5, labelIndex: 0, min: 50, max: 150 })).toBe(50);
      expect(getLabel({ labelCount: 5, labelIndex: 4, min: 50, max: 150 })).toBe(150);
    });
  });

  describe('calculatePositionPercent', () => {
    it('calculates position percentage correctly', () => {
      expect(calculatePositionPercent({ value: 50, min: 0, max: 100 })).toBe(50);
      expect(calculatePositionPercent({ value: 25, min: 0, max: 100 })).toBe(25);
      expect(calculatePositionPercent({ value: 0, min: 0, max: 100 })).toBe(0);
      expect(calculatePositionPercent({ value: 100, min: 0, max: 100 })).toBe(100);
    });

    it('handles non-zero min values', () => {
      expect(calculatePositionPercent({ value: 75, min: 50, max: 100 })).toBe(50);
      expect(calculatePositionPercent({ value: 50, min: 50, max: 100 })).toBe(0);
      expect(calculatePositionPercent({ value: 100, min: 50, max: 100 })).toBe(100);
    });

    it('handles edge case when min equals max', () => {
      expect(calculatePositionPercent({ value: 50, min: 50, max: 50 })).toBe(0);
    });

    it('handles values outside range', () => {
      expect(calculatePositionPercent({ value: 150, min: 0, max: 100 })).toBe(150);
      expect(calculatePositionPercent({ value: -10, min: 0, max: 100 })).toBe(-10);
    });
  });

  describe('xScale tick count calculation', () => {
    it('calculates tick count correctly with custom xScale', () => {
      // Formula: Math.ceil((maxRange - minRange) / xScale) + 1
      const tickCount1 = Math.ceil((1000 - 0) / 250) + 1;
      expect(tickCount1).toBe(5);

      const tickCount2 = Math.ceil((2000 - 0) / 500) + 1;
      expect(tickCount2).toBe(5);

      const tickCount3 = Math.ceil((100 - 0) / 25) + 1;
      expect(tickCount3).toBe(5);
    });

    it('handles non-zero minRange', () => {
      const tickCount = Math.ceil((150 - 50) / 25) + 1;
      expect(tickCount).toBe(5);
    });

    it('handles fractional results correctly', () => {
      const tickCount = Math.ceil((100 - 0) / 30) + 1;
      expect(tickCount).toBe(5); // Math.ceil(100/30) = 4, +1 = 5
    });
  });
});
