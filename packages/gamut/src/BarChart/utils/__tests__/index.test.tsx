import {
  calculateBarWidth,
  calculatePercent,
  calculatePositionPercent,
  getLabel,
} from '../index';

describe('BarChart Utils', () => {
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
    it('calculates bar width as percentage of maxScaleValue', () => {
      expect(calculateBarWidth({ value: 50, maxScaleValue: 100 })).toBe(50);
      expect(calculateBarWidth({ value: 25, maxScaleValue: 100 })).toBe(25);
      expect(calculateBarWidth({ value: 0, maxScaleValue: 100 })).toBe(0);
      expect(calculateBarWidth({ value: 100, maxScaleValue: 100 })).toBe(100);
    });

    it('handles values outside range', () => {
      expect(calculateBarWidth({ value: 150, maxScaleValue: 100 })).toBe(100);
      expect(calculateBarWidth({ value: -10, maxScaleValue: 100 })).toBe(0);
    });
  });

  describe('getLabel', () => {
    it('calculates label value for given index', () => {
      expect(
        getLabel({ tickCount: 5, labelIndex: 0, maxScaleValue: 100 })
      ).toBe(0);
      expect(
        getLabel({ tickCount: 5, labelIndex: 4, maxScaleValue: 100 })
      ).toBe(100);
    });

    it('handles single label', () => {
      expect(
        getLabel({ tickCount: 1, labelIndex: 0, maxScaleValue: 100 })
      ).toBe(100);
    });

    it('calculates intermediate label values', () => {
      const value = getLabel({
        tickCount: 5,
        labelIndex: 2,
        maxScaleValue: 100,
      });
      expect(value).toBeGreaterThan(0);
      expect(value).toBeLessThan(100);
    });
  });

  describe('calculatePositionPercent', () => {
    it('calculates position percentage correctly', () => {
      expect(calculatePositionPercent({ value: 50, maxScaleValue: 100 })).toBe(
        50
      );
      expect(calculatePositionPercent({ value: 25, maxScaleValue: 100 })).toBe(
        25
      );
      expect(calculatePositionPercent({ value: 0, maxScaleValue: 100 })).toBe(
        0
      );
      expect(calculatePositionPercent({ value: 100, maxScaleValue: 100 })).toBe(
        100
      );
    });

    it('handles edge case when maxScaleValue is 0', () => {
      expect(calculatePositionPercent({ value: 50, maxScaleValue: 0 })).toBe(0);
    });

    it('handles values outside range', () => {
      expect(calculatePositionPercent({ value: 150, maxScaleValue: 100 })).toBe(
        150
      );
      expect(calculatePositionPercent({ value: -10, maxScaleValue: 100 })).toBe(
        -10
      );
    });
  });

  describe('scaleInterval tick count calculation', () => {
    it('calculates tick count correctly with custom scaleInterval', () => {
      // Formula: Math.ceil(maxScaleValue / scaleInterval) + 1
      const tickCount1 = Math.ceil(1000 / 250) + 1;
      expect(tickCount1).toBe(5);

      const tickCount2 = Math.ceil(2000 / 500) + 1;
      expect(tickCount2).toBe(5);

      const tickCount3 = Math.ceil(100 / 25) + 1;
      expect(tickCount3).toBe(5);
    });

    it('handles fractional results correctly', () => {
      const tickCount = Math.ceil(100 / 30) + 1;
      expect(tickCount).toBe(5); // Math.ceil(100/30) = 4, +1 = 5
    });
  });
});
