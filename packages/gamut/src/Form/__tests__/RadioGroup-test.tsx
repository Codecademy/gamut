import { setupEnzyme } from '@codecademy/gamut-tests';
import React from 'react';

import { Radio } from '../Radio';
import { RadioGroup } from '../RadioGroup';

const onChangeCallback = jest.fn();

const renderWrapper = setupEnzyme(RadioGroup, {
  htmlForPrefix: 'what-salad-maker-do-you-prefer',
  name: 'what-salad-maker-do-you-prefer',
  onChange: onChangeCallback,
  'data-testid': 'my-test-id',
  children: [
    <Radio label="Sweet Green" value="sweet-green" data-testid="firstInput" />,
    <Radio label="Chopt" value="chopt" />,
  ],
});

describe('<RadioGroup>', () => {
  const createComponent = () => {
    const onChange = jest.fn();
    const { wrapper } = renderWrapper();

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

  xit('sets the onChange prop on the child', () => {
    const { wrapper } = renderWrapper();
    const event = {} as React.FormEvent;

    const getByTestId = wrapper.find(`input[data-testid="firstInput"]`);

    getByTestId.simulate('change', {
      target: {
        value: 'sweet-green',
      },
    });

    expect(onChangeCallback).toHaveBeenCalledWith(event);
  });

  it('sets any additional props on the outer div', () => {
    const { wrapper } = renderWrapper();
    const getByTestId = wrapper.find('div[data-testid="my-test-id"]');

    expect(getByTestId.exists()).toBe(true);
    expect(getByTestId.isEmptyRender()).toBe(false);
  });
});
