import { setupRtl } from '@codecademy/gamut-tests';
import { fireEvent } from '@testing-library/dom';
import { act } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import { ConnectedForm, ConnectedFormGroup, SubmitButton } from '../../..';
import { NestedConnectedCheckboxOption } from '../../types';
import { ConnectedNestedCheckboxes } from '../index';

const mockOptions: NestedConnectedCheckboxOption[] = [
  {
    value: 'frontend',
    label: 'Frontend Technologies',
    options: [
      { value: 'react', label: 'React' },
      { value: 'vue', label: 'Vue' },
      { value: 'angular', label: 'Angular' },
    ],
  },
  {
    value: 'backend',
    label: 'Backend Technologies',
    options: [
      {
        value: 'node',
        label: 'Node.js',
        options: [
          { value: 'express', label: 'Express.js' },
          { value: 'fastify', label: 'Fastify' },
        ],
      },
      { value: 'python', label: 'Python' },
      { value: 'ruby', label: 'Ruby', disabled: true },
    ],
  },
  {
    value: 'databases',
    label: 'Databases',
  },
];

const mockOnUpdate = jest.fn();
const TestForm: React.FC<{
  defaultValues?: { skills?: string[] };
  validationRules?: any;
  disabled?: boolean;
  options?: NestedConnectedCheckboxOption[];
}> = ({
  defaultValues = {},
  validationRules,
  disabled,
  options = mockOptions,
}) => (
  <ConnectedForm
    defaultValues={defaultValues}
    validationRules={validationRules}
    onSubmit={jest.fn()}
  >
    <ConnectedFormGroup
      disabled={disabled}
      field={{
        component: ConnectedNestedCheckboxes,
        options,
        onUpdate: mockOnUpdate,
      }}
      label="nested checkboxes field"
      name="skills"
    />
    <SubmitButton>submit this form</SubmitButton>
  </ConnectedForm>
);

const renderView = setupRtl(TestForm, {});

describe('ConnectedNestedCheckboxes', () => {
  describe('rendering', () => {
    it('should render all checkbox options in a flat list', () => {
      const { view } = renderView();

      // Top-level options
      view.getByLabelText('Frontend Technologies');
      view.getByLabelText('Backend Technologies');
      view.getByLabelText('Databases');

      // Frontend children
      view.getByLabelText('React');
      view.getByLabelText('Vue');
      view.getByLabelText('Angular');

      // Backend children
      view.getByLabelText('Node.js');
      view.getByLabelText('Python');

      // Deeply nested options
      view.getByLabelText('Express.js');
      view.getByLabelText('Fastify');
    });

    it('should render checkboxes with proper indentation levels', () => {
      const { view } = renderView();

      const frontendCheckbox = view
        .getByLabelText('Frontend Technologies')
        .closest('li');
      const reactCheckbox = view.getByLabelText('React').closest('li');
      const nodeCheckbox = view.getByLabelText('Node.js').closest('li');
      const expressCheckbox = view.getByLabelText('Express.js').closest('li');

      // Check margin-left styles for indentation
      expect(frontendCheckbox).toHaveStyle({ marginLeft: '0' }); // level 0
      expect(reactCheckbox).toHaveStyle({ marginLeft: '1.5rem' }); // level 1
      expect(nodeCheckbox).toHaveStyle({ marginLeft: '1.5rem' }); // level 1
      expect(expressCheckbox).toHaveStyle({ marginLeft: '3rem' }); // level 2
    });

    it('should render with unique IDs for each checkbox', () => {
      const { view } = renderView();

      expect(view.getByLabelText('Frontend Technologies')).toHaveAttribute(
        'id',
        'skills-frontend'
      );
      expect(view.getByLabelText('React')).toHaveAttribute(
        'id',
        'skills-react'
      );
      expect(view.getByLabelText('Express.js')).toHaveAttribute(
        'id',
        'skills-express'
      );
    });
  });

  describe('default values', () => {
    it('should render with default values checked', () => {
      const { view } = renderView({
        defaultValues: { skills: ['react', 'python'] },
      });

      expect(view.getByLabelText('React')).toBeChecked();
      expect(view.getByLabelText('Python')).toBeChecked();
      expect(view.getByLabelText('Vue')).not.toBeChecked();
    });

    it('should render parent as indeterminate when some children are selected', () => {
      const { view } = renderView({
        defaultValues: { skills: ['react', 'vue'] },
      });

      const frontendCheckbox = view.getByLabelText(
        'Frontend Technologies'
      ) as HTMLInputElement;

      expect(frontendCheckbox.indeterminate).toBe(true);
      expect(frontendCheckbox).not.toBeChecked();
    });

    it('should render parent as checked when all children are selected', () => {
      const { view } = renderView({
        defaultValues: { skills: ['react', 'vue', 'angular'] }, // all frontend
      });

      const frontendCheckbox = view.getByLabelText('Frontend Technologies');
      expect(frontendCheckbox).toBeChecked();
    });

    it('should render deeply nested parent states correctly', () => {
      const { view } = renderView({
        defaultValues: { skills: ['express', 'fastify'] },
      });

      const nodeCheckbox = view.getByLabelText('Node.js');
      const backendCheckbox = view.getByLabelText(
        'Backend Technologies'
      ) as HTMLInputElement;

      expect(nodeCheckbox).toBeChecked(); // all children selected
      expect(backendCheckbox.indeterminate).toBe(true); // only some children selected
    });

    it('should automatically check all children when parent is in default values', () => {
      const { view } = renderView({
        defaultValues: { skills: ['backend'] }, // parent selected by default
      });

      // Parent should be checked
      const backendCheckbox = view.getByLabelText('Backend Technologies');
      expect(backendCheckbox).toBeChecked();

      // All children should be automatically checked
      expect(view.getByLabelText('Node.js')).toBeChecked();
      expect(view.getByLabelText('Python')).toBeChecked();

      // Deeply nested children should also be checked
      expect(view.getByLabelText('Express.js')).toBeChecked();
      expect(view.getByLabelText('Fastify')).toBeChecked();

      // onUpdate should have been called with all expanded values during initialization
      expect(mockOnUpdate).toHaveBeenCalledWith([
        'backend',
        'node',
        'express',
        'fastify',
        'python',
        'ruby',
      ]);
    });

    it('should allow unchecking children that were auto-checked by default parent selection', async () => {
      const { view } = renderView({
        defaultValues: { skills: ['backend'] }, // parent selected by default
      });

      // Initially all should be checked due to parent selection
      const backendCheckbox = view.getByLabelText(
        'Backend Technologies'
      ) as HTMLInputElement;
      const pythonCheckbox = view.getByLabelText('Python');

      expect(backendCheckbox).toBeChecked();
      expect(pythonCheckbox).toBeChecked();

      // User should be able to uncheck a child
      await act(async () => {
        fireEvent.click(pythonCheckbox);
      });

      // Python should now be unchecked
      expect(pythonCheckbox).not.toBeChecked();

      // Parent should now be indeterminate since not all children are checked
      expect(backendCheckbox.indeterminate).toBe(true);
      expect(backendCheckbox).not.toBeChecked();

      // Other children should remain checked
      expect(view.getByLabelText('Node.js')).toBeChecked();
      expect(view.getByLabelText('Express.js')).toBeChecked();
      expect(view.getByLabelText('Fastify')).toBeChecked();
    });
  });

  describe('user interactions', () => {
    it('should update form value when leaf checkbox is clicked', async () => {
      const { view } = renderView();

      const reactCheckbox = view.getByLabelText('React');

      await act(async () => {
        fireEvent.click(reactCheckbox);
      });

      expect(reactCheckbox).toBeChecked();

      // Verify parent state updates
      const frontendCheckbox = view.getByLabelText(
        'Frontend Technologies'
      ) as HTMLInputElement;
      expect(frontendCheckbox.indeterminate).toBe(true);
    });

    it('should select all children when parent checkbox is clicked', async () => {
      const { view } = renderView({});

      const frontendCheckbox = view.getByLabelText('Frontend Technologies');

      await act(async () => {
        fireEvent.click(frontendCheckbox);
      });

      expect(frontendCheckbox).toBeChecked();
      expect(view.getByLabelText('React')).toBeChecked();
      expect(view.getByLabelText('Vue')).toBeChecked();
      expect(view.getByLabelText('Angular')).toBeChecked();
    });

    it('should deselect all children when checked parent is clicked', async () => {
      const { view } = renderView({
        defaultValues: { skills: ['react', 'vue', 'angular'] },
      });

      const frontendCheckbox = view.getByLabelText('Frontend Technologies');
      expect(frontendCheckbox).toBeChecked();

      await act(async () => {
        fireEvent.click(frontendCheckbox);
      });

      expect(frontendCheckbox).not.toBeChecked();
      expect(view.getByLabelText('React')).not.toBeChecked();
      expect(view.getByLabelText('Vue')).not.toBeChecked();
      expect(view.getByLabelText('Angular')).not.toBeChecked();
    });

    it('should handle deeply nested selections correctly', async () => {
      const { view } = renderView();

      // Click Node.js parent (should select all its children)
      const nodeCheckbox = view.getByLabelText('Node.js');

      await act(async () => {
        fireEvent.click(nodeCheckbox);
      });

      expect(nodeCheckbox).toBeChecked();
      expect(view.getByLabelText('Express.js')).toBeChecked();
      expect(view.getByLabelText('Fastify')).toBeChecked();

      // Backend should be indeterminate (only Node.js selected, not Python)
      const backendCheckbox = view.getByLabelText(
        'Backend Technologies'
      ) as HTMLInputElement;
      expect(backendCheckbox.indeterminate).toBe(true);
    });

    it('should handle individual child deselection affecting parent state', async () => {
      const { view } = renderView({
        defaultValues: { skills: ['react', 'vue', 'angular'] },
      });

      // Frontend should be fully checked
      const frontendCheckbox = view.getByLabelText(
        'Frontend Technologies'
      ) as HTMLInputElement;
      expect(frontendCheckbox).toBeChecked();

      // Deselect one child
      const reactCheckbox = view.getByLabelText('React');
      await act(async () => {
        fireEvent.click(reactCheckbox);
      });

      expect(reactCheckbox).not.toBeChecked();
      expect(frontendCheckbox.indeterminate).toBe(true);
      expect(frontendCheckbox).not.toBeChecked();
    });
  });

  describe('onUpdate callback', () => {
    it('should call onUpdate when checkbox values change', async () => {
      const { view } = renderView();

      const reactCheckbox = view.getByLabelText('React');

      await act(async () => {
        fireEvent.click(reactCheckbox);
      });

      expect(mockOnUpdate).toHaveBeenCalledWith(['react']);
    });

    it('should call onUpdate with correct values when parent is selected', async () => {
      const { view } = renderView();

      const frontendCheckbox = view.getByLabelText('Frontend Technologies');

      await act(async () => {
        fireEvent.click(frontendCheckbox);
      });

      expect(mockOnUpdate).toHaveBeenCalledWith([
        'react',
        'vue',
        'angular',
        'frontend',
      ]);
    });

    it('should call onUpdate with empty array when all items are deselected', async () => {
      const { view } = renderView({
        defaultValues: { skills: ['react'] },
      });

      const reactCheckbox = view.getByLabelText('React');

      await act(async () => {
        fireEvent.click(reactCheckbox);
      });

      expect(mockOnUpdate).toHaveBeenCalledWith([]);
    });
  });

  describe('disabled state', () => {
    it('should render all checkboxes as disabled when disabled prop is true', () => {
      const { view } = renderView({ disabled: true });

      expect(view.getByLabelText('Frontend Technologies')).toBeDisabled();
      expect(view.getByLabelText('React')).toBeDisabled();
      expect(view.getByLabelText('Databases')).toBeDisabled();
    });

    it('should not respond to clicks when disabled', async () => {
      const { view } = renderView({
        disabled: true,
      });

      const reactCheckbox = view.getByLabelText('React');
      expect(reactCheckbox).toBeDisabled();
      expect(reactCheckbox).not.toBeChecked();

      await userEvent.click(reactCheckbox);

      expect(reactCheckbox).not.toBeChecked();
      expect(mockOnUpdate).not.toHaveBeenCalled();
    });

    it('should handle individual option disabled state', () => {
      const { view } = renderView();

      expect(view.getByLabelText('Ruby')).toBeDisabled();
      expect(view.getByLabelText('Vue')).not.toBeDisabled();
    });
  });

  describe('validation', () => {
    it('should handle required validation', async () => {
      const validationRules = {
        skills: { required: 'At least one skill is required' },
      };

      const { view } = renderView({ validationRules });

      await act(async () => {
        fireEvent.click(view.getByRole('button'));
      });

      // Check if checkboxes have required attribute
      expect(view.getByLabelText('Frontend Technologies')).toHaveAttribute(
        'aria-required',
        'true'
      );
    });

    it('should pass validation when items are selected', async () => {
      const validationRules = {
        skills: { required: 'At least one skill is required' },
      };

      const { view } = renderView({ validationRules });

      const reactCheckbox = view.getByLabelText('React');

      await act(async () => {
        fireEvent.click(reactCheckbox);
      });

      expect(reactCheckbox).toBeChecked();
      expect(reactCheckbox).toHaveAttribute('aria-required', 'true');
    });
  });

  describe('edge cases', () => {
    it('should handle empty options array', () => {
      const { view } = renderView({ options: [] });

      // Should render empty list
      const list = view.container.querySelector('ul');
      expect(list).toBeInTheDocument();
      expect(list?.children).toHaveLength(0);
    });

    it('should handle options without nested children', () => {
      const { view } = renderView({
        options: [
          { value: 'option1', label: 'Option 1' },
          { value: 'option2', label: 'Option 2' },
        ],
      });

      expect(view.getByLabelText('Option 1')).toBeInTheDocument();
      expect(view.getByLabelText('Option 2')).toBeInTheDocument();
    });

    it('should handle numeric values correctly', () => {
      const { view } = renderView({
        options: [
          {
            value: 1,
            label: 'Parent Option',
            options: [{ value: 2, label: 'Child Option' }],
          } as any, // Type assertion for testing numeric values
        ],
      });

      expect(view.getByLabelText('Parent Option')).toHaveAttribute(
        'id',
        'skills-1'
      );
      expect(view.getByLabelText('Child Option')).toHaveAttribute(
        'id',
        'skills-2'
      );
    });
  });

  describe('accessibility', () => {
    it('should have proper aria attributes', () => {
      const { view } = renderView({});

      const checkbox = view.getByLabelText('Frontend Technologies');

      expect(checkbox).toHaveAttribute('aria-label', 'Frontend Technologies');
      expect(checkbox).toHaveAttribute('aria-checked', 'false');
    });

    it('should have proper aria-checked states for indeterminate checkboxes', () => {
      const { view } = renderView({
        defaultValues: { skills: ['react'] }, // partial selection
      });

      const frontendCheckbox = view.getByLabelText('Frontend Technologies');

      expect(frontendCheckbox).toHaveAttribute('aria-checked', 'mixed');
    });

    it('should use proper list semantics', () => {
      const { view } = renderView({});

      const list = view.container.querySelector('ul');
      const listItems = view.container.querySelectorAll('li');

      expect(list).toBeInTheDocument();
      expect(listItems).toHaveLength(11); // Total flattened options

      listItems.forEach((item) => {
        expect(item).toHaveStyle({ listStyle: 'none' });
      });
    });
  });
});
