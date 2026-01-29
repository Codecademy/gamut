import { cleanup } from '@testing-library/react';

import {
  additionalRadioGroupTests,
  additionalTextAreaTests,
  itHandlesStandardFieldTests,
} from '../__fixtures__/assertions';
import { getComponent } from '../__fixtures__/renderers';

describe('GridFormInputs', () => {
  afterEach(() => {
    cleanup();
  });

  describe.each([
    { component: 'GridFormCheckboxInput', selector: 'checkbox' },
    { component: 'GridFormFileInput', selector: 'stub-file' },
    { component: 'GridFormSelectInput', selector: 'combobox' },
    { component: 'GridFormRadioGroupInput', selector: 'radiogroup' },
    { component: 'GridFormTextArea', selector: 'textbox' },
    { component: 'GridFormTextInput', selector: 'textbox' },
  ])('$component', ({ component, selector }) => {
    const { renderField, defaultFieldProps } = getComponent(component);
    itHandlesStandardFieldTests({
      renderField,
      defaultFieldProps,
      component,
      selector,
    });
    if (component === 'GridFormRadioGroupInput')
      additionalRadioGroupTests({ renderField, defaultFieldProps });
    if (component === 'GridFormTextArea')
      additionalTextAreaTests({ renderField, defaultFieldProps });
  });
});
