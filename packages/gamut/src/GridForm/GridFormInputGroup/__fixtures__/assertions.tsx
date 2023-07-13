import { setupRtl } from '@codecademy/gamut-tests';
import { configure } from '@testing-library/dom';

import { getComponent } from './renderers';

configure({ testIdAttribute: 'id' });

interface StandardFieldTestsProps
  extends Pick<ReturnType<typeof getComponent>, 'defaultFieldProps'> {
  renderField: ReturnType<typeof setupRtl>;
  component: string;
  selector: string;
}

export const itHandlesStandardFieldTests = ({
  renderField,
  defaultFieldProps,
  component,
  selector,
}: StandardFieldTestsProps): void => {
  it('renders a field with an id ', async () => {
    const { view } = renderField({
      field: { ...defaultFieldProps, id: 'mycoolid', name: 'name' },
    });

    const testId =
      component !== 'GridFormRadioGroupInput' ? 'mycoolid' : 'name-0-mycoolid';

    await view.findByTestId(testId);
  });

  it('renders a field with the id equal to the field name when no id is passed', async () => {
    const { view } = renderField({
      field: { ...defaultFieldProps, name: 'name' },
    });

    const testId = component !== 'GridFormRadioGroupInput' ? 'name' : 'name-0';

    await view.findByTestId(testId);
  });

  it('has the property aria-invalid if error exists', async () => {
    const props = { ...defaultFieldProps, validation: { required: true } };
    const { view } = renderField({ field: { ...props }, error: true });
    const field =
      component !== 'GridFormFileInput'
        ? view.getByRole(selector)
        : view.getByTestId(selector);
    expect(field).toBeInvalid();
  });

  it('does not have the property aria-invalid if error does not exist', async () => {
    const props = { ...defaultFieldProps, validation: { required: true } };
    const { view } = renderField({ field: { ...props } });
    const field =
      component !== 'GridFormFileInput'
        ? view.getByRole(selector)
        : view.getByTestId(selector);
    expect(field).not.toHaveAttribute('aria-invalid');
  });
};

export const additionalRadioGroupTests = ({
  renderField,
  defaultFieldProps,
}: Pick<StandardFieldTestsProps, 'renderField' | 'defaultFieldProps'>) => {
  describe('Radio', () => {
    it('accepts JSX for the label', () => {
      const { view } = renderField({
        field: {
          ...defaultFieldProps,
          id: 'id',
          options: [{ label: <img alt="" src="" />, value: '' }],
          name: 'name',
        },
      });

      expect(view.getByRole('img'));
    });

    describe('aria-label', () => {
      it('aria-label is set to the label by default', () => {
        const { view } = renderField({
          field: { ...defaultFieldProps, label: 'Test Label' },
        });

        expect(view.getByLabelText('Test Label'));
      });

      it('aria-label is overridden by the ariaLabel prop', () => {
        const { view } = renderField({
          field: {
            ...defaultFieldProps,
            label: 'Test Label',
            ariaLabel: 'Overridden Test Label',
          },
        });

        expect(view.getByLabelText('Overridden Test Label'));
      });

      it('aria-label is used when JSX is passed to the label', () => {
        const { view } = renderField({
          field: {
            ...defaultFieldProps,
            label: <img alt="" src="" />,
            ariaLabel: 'Overridden Test Label',
          },
        });
        expect(view.getByLabelText('Overridden Test Label'));
      });
    });
  });
};
