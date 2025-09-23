import { setupRtl } from '@codecademy/gamut-tests';
import { act } from '@testing-library/react';

import { GridFormNestedCheckboxInput } from '../index';

const mockNestedCheckboxField = {
  component: 'nested-checkboxes' as const,
  name: 'technologies',
  label: 'Technologies',
  options: [
    {
      value: 'frontend',
      label: 'Frontend Technologies',
      options: [
        { value: 'react', label: 'React' },
        { value: 'vue', label: 'Vue.js' },
        { value: 'angular', label: 'Angular' },
      ],
    },
    {
      value: 'backend',
      label: 'Backend Technologies',
      options: [
        { value: 'node', label: 'Node.js' },
        { value: 'python', label: 'Python' },
        { value: 'java', label: 'Java' },
      ],
    },
  ],
};

const renderComponent = setupRtl(GridFormNestedCheckboxInput, {
  field: mockNestedCheckboxField,
});

describe('GridFormNestedCheckboxInput', () => {
  describe('default values', () => {
    it('should render with basic options unchecked by default', () => {
      const { view } = renderComponent();

      expect(view.getByLabelText('Frontend Technologies')).not.toBeChecked();
      expect(view.getByLabelText('Backend Technologies')).not.toBeChecked();
      expect(view.getByLabelText('React')).not.toBeChecked();
      expect(view.getByLabelText('Vue.js')).not.toBeChecked();
      expect(view.getByLabelText('Node.js')).not.toBeChecked();
      expect(view.getByLabelText('Python')).not.toBeChecked();
    });

    it('should automatically check all children when parent is in default values', async () => {
      const fieldWithDefaults = {
        ...mockNestedCheckboxField,
        defaultValue: ['backend'], // Parent selected by default
      };

      const { view } = renderComponent({ field: fieldWithDefaults });

      // Wait for the expansion to happen (setTimeout in the component)
      await act(async () => {
        await new Promise((resolve) => setTimeout(resolve, 10));
      });

      // Parent should be checked
      const backendCheckbox = view.getByLabelText('Backend Technologies');
      expect(backendCheckbox).toBeChecked();

      // All children should be automatically checked
      expect(view.getByLabelText('Node.js')).toBeChecked();
      expect(view.getByLabelText('Python')).toBeChecked();
      expect(view.getByLabelText('Java')).toBeChecked();

      // Frontend should remain unchecked
      expect(view.getByLabelText('Frontend Technologies')).not.toBeChecked();
      expect(view.getByLabelText('React')).not.toBeChecked();
      expect(view.getByLabelText('Vue.js')).not.toBeChecked();
    });

    it('should handle multiple parent defaults correctly', async () => {
      const fieldWithDefaults = {
        ...mockNestedCheckboxField,
        defaultValue: ['frontend', 'backend'], // Both parents selected by default
      };

      const { view } = renderComponent({ field: fieldWithDefaults });

      // Wait for the expansion to happen
      await act(async () => {
        await new Promise((resolve) => setTimeout(resolve, 10));
      });

      // Both parents should be checked
      expect(view.getByLabelText('Frontend Technologies')).toBeChecked();
      expect(view.getByLabelText('Backend Technologies')).toBeChecked();

      // All children should be automatically checked
      expect(view.getByLabelText('React')).toBeChecked();
      expect(view.getByLabelText('Vue.js')).toBeChecked();
      expect(view.getByLabelText('Angular')).toBeChecked();
      expect(view.getByLabelText('Node.js')).toBeChecked();
      expect(view.getByLabelText('Python')).toBeChecked();
      expect(view.getByLabelText('Java')).toBeChecked();
    });

    it('should preserve individual child selections in default values', () => {
      const fieldWithDefaults = {
        ...mockNestedCheckboxField,
        defaultValue: ['react', 'python'], // Individual children selected
      };

      const { view } = renderComponent({ field: fieldWithDefaults });

      // Selected children should be checked
      expect(view.getByLabelText('React')).toBeChecked();
      expect(view.getByLabelText('Python')).toBeChecked();

      // Parents should be indeterminate since not all children are selected
      const frontendCheckbox = view.getByLabelText(
        'Frontend Technologies'
      ) as HTMLInputElement;
      const backendCheckbox = view.getByLabelText(
        'Backend Technologies'
      ) as HTMLInputElement;

      expect(frontendCheckbox.indeterminate).toBe(true);
      expect(backendCheckbox.indeterminate).toBe(true);

      // Other children should remain unchecked
      expect(view.getByLabelText('Vue.js')).not.toBeChecked();
      expect(view.getByLabelText('Angular')).not.toBeChecked();
      expect(view.getByLabelText('Node.js')).not.toBeChecked();
      expect(view.getByLabelText('Java')).not.toBeChecked();
    });
  });
});
