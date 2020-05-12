import React from 'react';
import { mount } from 'enzyme';
import RadioGroup from '../RadioGroup';
import Radio from '../Radio';

describe('<RadioGroup>', () => {
  const createComponent = () => {
    const onChange = jest.fn();
    const wrapper = mount(
      <RadioGroup
        htmlForPrefix="what-salad-maker-do-you-prefer"
        name="what-salad-maker-do-you-prefer"
        onChange={onChange}
        data-testid="my-test-id"
      >
        <Radio label="Sweet Green" value="sweet-green" />
        <Radio label="Chopt" value="chopt" />
      </RadioGroup>
    );
    const firstInput = wrapper.find('input[type="radio"]').first();

    return { firstInput, onChange, wrapper };
  };

  it('sets the id and name props on the child', () => {
    const { firstInput } = createComponent();

    expect(firstInput.props()).toMatchObject({
      id: 'what-salad-maker-do-you-prefer-0',
      name: 'what-salad-maker-do-you-prefer',
    });
  });

  it('sets the onChange prop on the child', () => {
    const { firstInput, onChange } = createComponent();
    const event = {} as React.FormEvent;

    firstInput.props().onChange(event);

    expect(onChange).toHaveBeenCalledWith(event);
  });

  it('sets any additional props on the outer div', () => {
    const { wrapper } = createComponent();
    const getByTestId = wrapper.find('div[data-testid="my-test-id"]');

    expect(getByTestId.exists()).toBe(true);
    expect(getByTestId.isEmptyRender()).toBe(false);
  });
});
