import { configure } from '@testing-library/dom';

import { getComponent } from './renderers';

configure({ testIdAttribute: 'id' });

export const itHandlesStandardFieldTests = (
  componentName: string,
  selector: string
): void => {
  const { renderField, defaultFieldProps } = getComponent(componentName);

  describe('when an id is passed as a prop', () => {
    it('renders a field with the same id', async () => {
      const { view } = renderField({
        field: { ...defaultFieldProps, id: 'mycoolid' },
      });

      await view.findByTestId('mycoolid');
    });
  });

  describe('when no id is passed', () => {
    it('renders a field with the id equal to the field name', async () => {
      const { view } = renderField({
        field: { ...defaultFieldProps, name: 'name' },
      });

      await view.findByTestId('name');
    });
  });

  it('has the property aria-invalid if error exists', async () => {
    const props = { ...defaultFieldProps, validation: { required: true } };
    const { view } = renderField({ field: { ...props }, error: true });
    const field = view.getByRole(selector);
    expect(field).toHaveAttribute('aria-invalid', 'true');
    expect(field).toBeInvalid();
  });

  it('does not have the property aria-invalid if error does not exist', async () => {
    // Note that since the default value for aria-invalid is false, it is not strictly necessary to add the attribute to input.
    // https://developer.mozilla.org/en-US/docs/Web/Accessibility/ARIA/Attributes/aria-invalid#example
    const props = { ...defaultFieldProps, validation: { required: true } };
    const { view } = renderField({ field: { ...props } });
    const field = view.getByRole(selector);
    expect(field).not.toHaveAttribute('aria-invalid');
  });
};
