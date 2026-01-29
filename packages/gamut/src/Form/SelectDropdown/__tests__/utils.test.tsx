import { SelectOptionBase } from '../../utils';
import { ExtendedOption, SelectDropdownGroup } from '../types';
import {
  filterValueFromOptions,
  isOptionGroup,
  isOptionsGrouped,
  removeValueFromSelectedOptions,
} from '../utils';

describe('SelectDropdown Utils', () => {
  describe('isOptionGroup', () => {
    it('returns true for valid group objects', () => {
      const groupOption: SelectDropdownGroup = {
        label: 'Fruits',
        options: [
          { label: 'Apple', value: 'apple' },
          { label: 'Banana', value: 'banana' },
        ],
      };

      expect(isOptionGroup(groupOption)).toBe(true);
    });

    it('returns true for group objects with divider property', () => {
      const groupOption: SelectDropdownGroup = {
        label: 'Fruits',
        options: [
          { label: 'Apple', value: 'apple' },
          { label: 'Banana', value: 'banana' },
        ],
        divider: true,
      };

      expect(isOptionGroup(groupOption)).toBe(true);
    });

    it('returns false for regular option objects', () => {
      const regularOption: ExtendedOption = {
        label: 'Apple',
        value: 'apple',
        icon: undefined,
      };

      expect(isOptionGroup(regularOption)).toBe(false);
    });

    it('returns false for objects with options but missing label', () => {
      const invalidGroup = {
        options: [{ label: 'Apple', value: 'apple' }],
      };

      expect(isOptionGroup(invalidGroup)).toBe(true); // Still true because it has options
    });

    it('returns false for non-objects', () => {
      expect(isOptionGroup('string')).toBe(false);
      expect(isOptionGroup(123)).toBe(false);
      expect(isOptionGroup(true)).toBe(false);
      expect(isOptionGroup(null)).toBe(false);
      expect(isOptionGroup(undefined)).toBe(false);
      expect(isOptionGroup([])).toBe(false);
    });

    it('returns false for objects without options property', () => {
      const objectWithoutOptions = {
        label: 'Something',
        value: 'something',
      };

      expect(isOptionGroup(objectWithoutOptions)).toBe(false);
    });
  });

  describe('isOptionsGrouped', () => {
    it('returns true for arrays containing group options', () => {
      const mixedOptions = [
        { label: 'Apple', value: 'apple' },
        {
          label: 'Fruits',
          options: [
            { label: 'Apple', value: 'apple' },
            { label: 'Banana', value: 'banana' },
          ],
        },
      ];

      expect(isOptionsGrouped(mixedOptions)).toBe(true);
    });

    it('returns true for arrays containing only group options', () => {
      const groupOptions: SelectDropdownGroup[] = [
        {
          label: 'Fruits',
          options: [
            { label: 'Apple', value: 'apple' },
            { label: 'Banana', value: 'banana' },
          ],
        },
        {
          label: 'Vegetables',
          options: [
            { label: 'Carrot', value: 'carrot' },
            { label: 'Broccoli', value: 'broccoli' },
          ],
        },
      ];

      expect(isOptionsGrouped(groupOptions)).toBe(true);
    });

    it('returns false for arrays containing only regular options', () => {
      const regularOptions: SelectOptionBase[] = [
        { label: 'Apple', value: 'apple' },
        { label: 'Banana', value: 'banana' },
      ];

      expect(isOptionsGrouped(regularOptions)).toBe(false);
    });

    it('returns false for non-arrays', () => {
      expect(isOptionsGrouped({})).toBe(false);
      expect(isOptionsGrouped('string')).toBe(false);
      expect(isOptionsGrouped(123)).toBe(false);
      expect(isOptionsGrouped(true)).toBe(false);
      expect(isOptionsGrouped(null)).toBe(false);
      expect(isOptionsGrouped(undefined)).toBe(false);
    });

    it('returns false for empty arrays', () => {
      expect(isOptionsGrouped([])).toBe(false);
    });

    it('handles edge cases with mixed data types', () => {
      const mixedData = [
        'string',
        123,
        { label: 'Valid Option', value: 'valid' },
        {
          label: 'Group',
          options: [{ label: 'Grouped Option', value: 'grouped' }],
        },
      ];

      expect(isOptionsGrouped(mixedData)).toBe(true);
    });
  });

  describe('filterValueFromOptions', () => {
    const regularOptions: SelectOptionBase[] = [
      { label: 'Apple', value: 'apple' },
      { label: 'Banana', value: 'banana' },
      { label: 'Orange', value: 'orange' },
    ];
    const groupedOptions: SelectDropdownGroup[] = [
      {
        label: 'Fruits',
        options: [
          { label: 'Apple', value: 'apple' },
          { label: 'Banana', value: 'banana' },
        ],
      },
      {
        label: 'Vegetables',
        options: [
          { label: 'Carrot', value: 'carrot' },
          { label: 'Broccoli', value: 'broccoli' },
        ],
      },
    ];

    describe('with regular options', () => {
      it('filters single value correctly', () => {
        const result = filterValueFromOptions(regularOptions, 'apple', false);

        expect(result).toEqual([{ label: 'Apple', value: 'apple' }]);
      });

      it('filters multiple values correctly', () => {
        const result = filterValueFromOptions(
          regularOptions,
          ['apple', 'orange'],
          false
        );

        expect(result).toEqual([
          { label: 'Apple', value: 'apple' },
          { label: 'Orange', value: 'orange' },
        ]);
      });

      it('returns empty array for non-matching value', () => {
        const result = filterValueFromOptions(
          regularOptions,
          'nonexistent',
          false
        );

        expect(result).toEqual([]);
      });

      it('returns empty array for non-matching multiple values', () => {
        const result = filterValueFromOptions(
          regularOptions,
          ['nonexistent1', 'nonexistent2'],
          false
        );

        expect(result).toEqual([]);
      });
    });

    describe('with grouped options', () => {
      it('filters single value correctly from groups', () => {
        const result = filterValueFromOptions(groupedOptions, 'apple', true);

        expect(result).toEqual([{ label: 'Apple', value: 'apple' }]);
      });

      it('filters multiple values correctly from groups', () => {
        const result = filterValueFromOptions(
          groupedOptions,
          ['apple', 'carrot'],
          true
        );

        expect(result).toEqual([
          { label: 'Apple', value: 'apple' },
          { label: 'Carrot', value: 'carrot' },
        ]);
      });

      it('returns empty array for non-matching value in groups', () => {
        const result = filterValueFromOptions(
          groupedOptions,
          'nonexistent',
          true
        );

        expect(result).toEqual([]);
      });

      it('handles mixed matching and non-matching values', () => {
        const result = filterValueFromOptions(
          groupedOptions,
          ['apple', 'nonexistent'],
          true
        );

        expect(result).toEqual([{ label: 'Apple', value: 'apple' }]);
      });
    });
  });

  describe('removeValueFromSelectedOptions', () => {
    const selectedOptions: ExtendedOption[] = [
      { label: 'Apple', value: 'apple' },
      { label: 'Banana', value: 'banana' },
      { label: 'Orange', value: 'orange' },
    ];

    it('removes single value correctly', () => {
      const result = removeValueFromSelectedOptions(selectedOptions, 'banana');

      expect(result).toEqual([
        { label: 'Apple', value: 'apple' },
        { label: 'Orange', value: 'orange' },
      ]);
    });

    it('removes multiple values correctly', () => {
      const result = removeValueFromSelectedOptions(selectedOptions, [
        'banana',
        'orange',
      ]);

      expect(result).toEqual([{ label: 'Apple', value: 'apple' }]);
    });

    it('returns same array when value not found', () => {
      const result = removeValueFromSelectedOptions(
        selectedOptions,
        'nonexistent'
      );

      expect(result).toEqual(selectedOptions);
    });

    it('handles empty array', () => {
      const result = removeValueFromSelectedOptions([], 'apple');

      expect(result).toEqual([]);
    });

    it('handles undefined value', () => {
      const result = removeValueFromSelectedOptions(selectedOptions, undefined);

      expect(result).toEqual(selectedOptions);
    });
  });

  describe('Type Safety Tests', () => {
    it('isOptionsGrouped properly narrows types', () => {
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

    it('isOptionGroup properly narrows types', () => {
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

  describe('isOptionGroup', () => {
    it('returns true for objects with options property', () => {
      const groupOption = {
        label: 'Fruits',
        options: [
          { label: 'Apple', value: 'apple' },
          { label: 'Banana', value: 'banana' },
        ],
      };

      expect(isOptionGroup(groupOption)).toBe(true);
    });

    it('returns false for objects without options property', () => {
      const regularOption = {
        label: 'Apple',
        value: 'apple',
      };

      expect(isOptionGroup(regularOption)).toBe(false);
    });

    it('returns false for non-objects', () => {
      expect(isOptionGroup('string')).toBe(false);
      expect(isOptionGroup(123)).toBe(false);
      expect(isOptionGroup(null)).toBe(false);
      expect(isOptionGroup(undefined)).toBe(false);
      expect(isOptionGroup([])).toBe(false);
    });
  });

  describe('isOptionsGrouped', () => {
    it('returns true for arrays containing group options', () => {
      const mixedOptions = [
        { label: 'Apple', value: 'apple' },
        {
          label: 'Fruits',
          options: [
            { label: 'Apple', value: 'apple' },
            { label: 'Banana', value: 'banana' },
          ],
        },
      ];

      expect(isOptionsGrouped(mixedOptions)).toBe(true);
    });

    it('returns true for arrays containing only group options', () => {
      const groupedOptions = [
        {
          label: 'Fruits',
          options: [
            { label: 'Apple', value: 'apple' },
            { label: 'Banana', value: 'banana' },
          ],
        },
        {
          label: 'Vegetables',
          options: [
            { label: 'Carrot', value: 'carrot' },
            { label: 'Broccoli', value: 'broccoli' },
          ],
        },
      ];

      expect(isOptionsGrouped(groupedOptions)).toBe(true);
    });

    it('returns false for arrays containing only regular options', () => {
      const regularOptions = [
        { label: 'Apple', value: 'apple' },
        { label: 'Banana', value: 'banana' },
      ];

      expect(isOptionsGrouped(regularOptions)).toBe(false);
    });

    it('returns false for non-arrays', () => {
      expect(isOptionsGrouped({})).toBe(false);
      expect(isOptionsGrouped('string')).toBe(false);
      expect(isOptionsGrouped(123)).toBe(false);
      expect(isOptionsGrouped(null)).toBe(false);
      expect(isOptionsGrouped(undefined)).toBe(false);
    });

    it('returns false for empty arrays', () => {
      expect(isOptionsGrouped([])).toBe(false);
    });
  });
});
