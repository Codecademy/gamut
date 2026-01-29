import { setupRtl } from '@codecademy/gamut-tests';
import { fireEvent } from '@testing-library/dom';
import { act } from 'react';

import {
  stubFileField,
  stubSelectField,
  stubTextField,
} from '../../__tests__/stubs';
import { GridFormTextField } from '../../types';
import { GridFormSectionTestComponent } from '../__fixtures__/renderers';

const fields = [stubTextField, stubSelectField, stubFileField];
const validStubTextField = {
  ...stubTextField,
  validation: {
    pattern: {
      message: 'not enough updog',
      value: /updog(.*)updog/,
    },
    required: true,
  },
};
const validStubTextTwo: GridFormTextField = {
  label: 'Stub Text Again',
  name: 'stub-text-again',
  size: 6,
  type: 'text',
  validation: {
    pattern: {
      message: 'what is it?',
      value: /updog/,
    },
    required: true,
  },
};
const validFields = [validStubTextField, validStubTextTwo];
const renderView = setupRtl(GridFormSectionTestComponent, {
  fields,
  showRequired: false,
});

describe('GridFormSections', () => {
  it('renders an array of fields', () => {
    const { view } = renderView();
    const textLabel = view.getByLabelText('Stub Text (optional)');
    const textField = view.getByRole('textbox', { name: /Stub Text/ });
    const radioLabel = view.getByLabelText('Stub Select (optional)');
    const radioField = view.getByRole('combobox', { name: /Stub Select/ });

    expect(textLabel).toBeTruthy();
    expect(textField).toBeTruthy();
    expect(radioLabel).toBeTruthy();
    expect(radioField).toBeTruthy();
  });

  it('gives all fields access to form context and validation', async () => {
    const { view } = renderView({
      fields: validFields,
      mode: 'onChange',
    });
    await act(async () => {
      fireEvent.input(view.getByRole('textbox', { name: 'Stub Text' }), {
        target: {
          value:
            'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
        },
      });
    });
    await act(async () => {
      fireEvent.input(view.getByRole('textbox', { name: 'Stub Text Again' }), {
        target: {
          value: 'Do you know what that is?',
        },
      });
    });
    await view.findByText('what is it?');
    await view.findByText('not enough updog');
  });

  it('only first error is an alert', async () => {
    const { view } = renderView({
      fields: validFields,
      mode: 'onChange',
    });
    await act(async () => {
      fireEvent.input(view.getByRole('textbox', { name: 'Stub Text' }), {
        target: {
          value:
            'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
        },
      });
    });
    await act(async () => {
      fireEvent.input(view.getByRole('textbox', { name: 'Stub Text Again' }), {
        target: {
          value: 'Do you know what that is?',
        },
      });
    });

    expect(await view.findAllByRole('alert')).toHaveLength(1);
  });
});
