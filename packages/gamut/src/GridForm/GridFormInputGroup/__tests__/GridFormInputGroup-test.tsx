import { setupEnzyme } from '@codecademy/gamut-tests';

import {
  stubCheckboxField,
  stubFileField,
  stubHiddenField,
  stubRadioGroupField,
  stubSelectField,
  stubSweetContainerField,
  stubTextareaField,
  stubTextField,
} from '../../__tests__/stubs';
import { GridFormInputGroupTestComponent } from '../__fixtures__/renderers';

const renderWrapper = setupEnzyme(GridFormInputGroupTestComponent, {
  setValue: jest.fn(),
  register: jest.fn(),
});

describe('GridFormInputGroup', () => {
  it('renders error text when an error exists', () => {
    const error = 'Oh no!';

    const { wrapper } = renderWrapper({ field: stubCheckboxField, error });

    expect(wrapper.text()).toContain(error);
  });
  it('renders error text when an custom error exists', () => {
    const error = 'Oh no!';

    const { wrapper } = renderWrapper({
      field: { ...stubCheckboxField, customError: error },
    });

    expect(wrapper.text()).toContain(error);
  });

  it('renders a checkbox input when the field type is checkbox', () => {
    const { wrapper } = renderWrapper({
      field: { ...stubCheckboxField, id: 'mycoolid' },
    });

    expect(wrapper.find('input[type="checkbox"]#mycoolid')).toHaveLength(1);
  });

  it('renders a custom input when the field type is custom', () => {
    const text = 'Hello, world!';
    const { wrapper } = renderWrapper({
      field: {
        render: () => text,
        name: 'stub-custom',
        size: 6,
        type: 'custom',
      },
    });

    expect(wrapper.text()).toEqual(text);
  });

  it('renders a radio group when the field type is radio-group', () => {
    const { wrapper } = renderWrapper({
      field: { ...stubRadioGroupField, id: 'mycoolid' },
    });

    expect(wrapper.find('input[type="radio"]')).toHaveLength(2);
    expect(wrapper.find('input#stub-radio-group-0-mycoolid')).toHaveLength(1);
  });

  it('renders a select when the field type is select', () => {
    const { wrapper } = renderWrapper({
      field: { ...stubSelectField, id: 'mycoolid' },
    });

    expect(wrapper.find('select#mycoolid')).toHaveLength(1);
  });

  it('renders a text input when the field type is text', () => {
    const { wrapper } = renderWrapper({
      field: { ...stubTextField, id: 'mycoolid' },
    });

    expect(wrapper.find('input[type="text"]#mycoolid')).toHaveLength(1);
  });

  it('renders a file input when the field type is file', () => {
    const { wrapper } = renderWrapper({
      field: { ...stubFileField, id: 'mycoolid' },
    });

    expect(wrapper.find('input[type="file"]#mycoolid')).toHaveLength(1);
  });

  it('renders a textarea when the field type is textarea', () => {
    const { wrapper } = renderWrapper({
      field: { ...stubTextareaField, id: 'mycoolid' },
    });

    expect(wrapper.find('textarea#mycoolid')).toHaveLength(1);
  });

  it('invokes onUpdate when the field type is text and it gets changed', () => {
    const onUpdateSpy = jest.fn();
    const newVal = 'foo';

    const { wrapper } = renderWrapper({
      field: { ...stubTextField, onUpdate: onUpdateSpy },
    });

    wrapper
      .find('input[type="text"]')
      .simulate('change', { target: { value: newVal } });

    expect(onUpdateSpy).toHaveBeenCalledWith(newVal);
  });

  it('invokes onUpdate when the field type is textarea and it gets changed', () => {
    const onUpdateSpy = jest.fn();
    const newVal = 'foo';

    const { wrapper } = renderWrapper({
      field: { ...stubTextareaField, onUpdate: onUpdateSpy },
    });

    wrapper.find('textarea').simulate('change', { target: { value: newVal } });

    expect(onUpdateSpy).toHaveBeenCalledWith(newVal);
  });

  it('invokes onUpdate when the field type is select and it gets changed', () => {
    const onUpdateSpy = jest.fn();
    const newVal = 'foo';

    const { wrapper } = renderWrapper({
      field: { ...stubSelectField, onUpdate: onUpdateSpy },
    });

    wrapper.find('select').simulate('change', { target: { value: newVal } });

    expect(onUpdateSpy).toHaveBeenCalledWith(newVal);
  });

  it('invokes onUpdate when the field type is checkbox and it gets changed', () => {
    const onUpdateSpy = jest.fn();
    const newVal = true;

    const { wrapper } = renderWrapper({
      field: { ...stubCheckboxField, onUpdate: onUpdateSpy },
    });

    wrapper
      .find('input[type="checkbox"]')
      .simulate('change', { target: { checked: newVal } });

    expect(onUpdateSpy).toHaveBeenCalledWith(newVal);
  });

  it('invokes onUpdate when the field type is file and it gets changed', () => {
    const onUpdateSpy = jest.fn();
    const newVal = ['I swear this is a file'];

    const { wrapper } = renderWrapper({
      field: { ...stubFileField, onUpdate: onUpdateSpy },
    });

    wrapper
      .find('input[type="file"]')
      .simulate('change', { target: { files: newVal } });

    expect(onUpdateSpy).toHaveBeenCalledWith(newVal);
  });

  it('sets aria-live to assertive if isFirstError flag is on', () => {
    const { wrapper } = renderWrapper({
      field: { ...stubRadioGroupField, id: 'mycoolid', size: 6 },
      error: 'It broke',
      isFirstError: true,
    });
    expect(wrapper.find('ErrorSpan').prop('aria-live')).toEqual('assertive');
  });

  it('sets aria-live to off if isFirstError flag is off', () => {
    const { wrapper } = renderWrapper({
      field: { ...stubRadioGroupField, id: 'mycoolid', size: 6 },
      error: 'It broke',
      isFirstError: false,
    });
    expect(wrapper.find('ErrorSpan').prop('aria-live')).toEqual('off');
  });

  it('does not create a column for sweet container inputs', () => {
    const { wrapper } = renderWrapper({
      field: { ...stubSweetContainerField },
    });
    expect(wrapper.find('Column').exists()).toBeFalsy();
  });

  it('does not create a column for hidden inputs', () => {
    const { wrapper } = renderWrapper({
      field: { ...stubHiddenField },
    });
    expect(wrapper.find('Column').exists()).toBeFalsy();
  });
});
