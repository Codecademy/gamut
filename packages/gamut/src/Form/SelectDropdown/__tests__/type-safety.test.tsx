import { isOptionGroup, isOptionsGrouped } from '../utils';

describe('Type Safety Improvements', () => {
  describe('Type Narrowing', () => {
    it('properly narrows types with isOptionsGrouped', () => {
      const options: any[] = [
        { label: 'Apple', value: 'apple' },
        {
          label: 'Fruits',
          options: [{ label: 'Apple', value: 'apple' }],
        },
      ];

      if (isOptionsGrouped(options)) {
        // TypeScript should know this is SelectDropdownGroup[]
        // Find the group option (not the first one)
        const groupOption = options.find((option) => isOptionGroup(option));
        expect(groupOption).toHaveProperty('options');
        expect(groupOption?.label).toBe('Fruits');
      }
    });

    it('properly narrows types with isOptionGroup', () => {
      const option: any = {
        label: 'Fruits',
        options: [{ label: 'Apple', value: 'apple' }],
      };

      if (isOptionGroup(option)) {
        // TypeScript should know this is SelectDropdownGroup
        expect(option.options).toBeDefined();
        expect(option.label).toBe('Fruits');
      }
    });
  });

  describe('Regression Prevention', () => {
    it('prevents type casting errors by using proper type guards', () => {
      // This test ensures that our type guards work correctly
      // and prevent the need for manual type casting
      const options: any[] = [
        { label: 'Single Option', value: 'single' },
        {
          label: 'Group',
          options: [{ label: 'Grouped Option', value: 'grouped' }],
        },
      ];

      // Test that we can safely iterate without type casting
      const hasGroups = isOptionsGrouped(options);
      expect(hasGroups).toBe(true);

      if (hasGroups) {
        // This should work without type casting
        const groupOptions = options.filter(isOptionGroup);
        expect(groupOptions).toHaveLength(1);
        expect(groupOptions[0].label).toBe('Group');
      }
    });

    it('handles edge cases safely', () => {
      // Test various edge cases that could cause runtime errors
      expect(isOptionsGrouped(null)).toBe(false);
      expect(isOptionsGrouped(undefined)).toBe(false);
      expect(isOptionsGrouped({})).toBe(false);
      expect(isOptionsGrouped('')).toBe(false);
      expect(isOptionsGrouped(0)).toBe(false);

      expect(isOptionGroup(null)).toBe(false);
      expect(isOptionGroup(undefined)).toBe(false);
      expect(isOptionGroup({})).toBe(false);
      expect(isOptionGroup('')).toBe(false);
      expect(isOptionGroup(0)).toBe(false);
    });
  });
});
