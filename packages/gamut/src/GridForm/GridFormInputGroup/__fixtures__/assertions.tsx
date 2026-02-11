import '@testing-library/jest-dom';

import { setupRtl } from '@codecademy/gamut-tests';
import { queryByAttribute } from '@testing-library/dom';
import { act } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import { getComponent } from './renderers';

const getById = queryByAttribute.bind(null, 'id');

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

    expect(getById(view.container, testId));
  });

  it('renders a field with the id equal to the field name when no id is passed', async () => {
    const { view } = renderField({
      field: { ...defaultFieldProps, name: 'name' },
    });

    const testId = component !== 'GridFormRadioGroupInput' ? 'name' : 'name-0';

    expect(getById(view.container, testId));
  });

  it('has the property aria-invalid if error exists', async () => {
    const props = { ...defaultFieldProps, validation: { required: true } };
    const { view } = renderField({ field: { ...props }, error: true });
    const field =
      component !== 'GridFormFileInput'
        ? view.getByRole(selector)
        : getById(view.container, selector);
    expect(field).toBeInvalid();
  });

  it('does not have the property aria-invalid if error does not exist', async () => {
    const props = { ...defaultFieldProps, validation: { required: true } };
    const { view } = renderField({ field: { ...props } });
    const field =
      component !== 'GridFormFileInput'
        ? view.getByRole(selector)
        : getById(view.container, selector);
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
          options: [
            {
              label: <img alt="Test" src="/assets/test.png" />,
              value: '',
            },
          ],
          name: 'name',
        },
      });

      expect(view.getByRole('img'));
    });

    it('renders an infotip in the radio', async () => {
      const info = 'info';

      const { view } = renderField({
        field: {
          ...defaultFieldProps,
          id: 'id',
          options: [
            {
              label: <img alt="" src="" />,
              value: '',
              infotip: { info },
            },
          ],
          name: 'name',
        },
      });

      const tip = view.getByText(info);
      expect(tip).not.toBeVisible();
      await act(async () => {
        await userEvent.click(view.getByRole('button'));
      });
      expect(tip).toBeVisible();
    });

    it('links InfoTip to Radio label via aria-labelledby', () => {
      const info = 'helpful information';
      const labelText = 'Radio Option';

      const { view } = renderField({
        field: {
          ...defaultFieldProps,
          id: 'id',
          options: [
            {
              label: labelText,
              value: 'option1',
              infotip: { info },
            },
          ],
          name: 'name',
        },
      });

      view.getByRole('button', { name: labelText });
    });

    it('allows overriding InfoTip aria-labelledby with explicit ariaLabel', () => {
      const info = 'helpful information';
      const labelText = 'Radio Option';
      const ariaLabel = 'Custom InfoTip Label';

      const { view } = renderField({
        field: {
          ...defaultFieldProps,
          id: 'id',
          options: [
            {
              label: labelText,
              value: 'option1',
              infotip: { info, ariaLabel },
            },
          ],
          name: 'name',
        },
      });

      view.getByRole('button', { name: ariaLabel });
      expect(
        view.queryByRole('button', { name: labelText })
      ).not.toBeInTheDocument();
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

export const additionalTextAreaTests = ({
  renderField,
  defaultFieldProps,
}: Pick<StandardFieldTestsProps, 'renderField' | 'defaultFieldProps'>) => {
  describe('TextArea', () => {
    it('does not specify rows by default', () => {
      const { view } = renderField({
        field: {
          ...defaultFieldProps,
          id: 'id',
          options: [{ label: <img alt="" src="" />, value: '' }],
          name: 'name',
        },
      });
      const textArea = view.getByRole('textbox');
      expect(textArea).not.toHaveAttribute('rows');
    });
    it('renders other numbers of rows when specified', () => {
      const { view } = renderField({
        field: {
          ...defaultFieldProps,
          id: 'id',
          options: [{ label: <img alt="" src="" />, value: '' }],
          name: 'name',
          rows: 8,
        },
      });
      const textArea = view.getByRole('textbox');
      expect(textArea).toHaveAttribute('rows', '8');
    });
  });
};
