import { setupRtl } from '@codecademy/gamut-tests';
import { fireEvent } from '@testing-library/dom';

import { Radio } from '../Radio';
import { RadioGroup } from '../RadioGroup';

const renderView = setupRtl(RadioGroup, {
  htmlForPrefix: 'what-salad-maker-do-you-prefer',
  name: 'what-salad-maker-do-you-prefer',
  'data-testid': 'my-test-id',
  children: [
    <Radio label="Sweet Green" value="sweet-green" data-testid="firstInput" />,
    <Radio label="Chopt" value="chopt" />,
  ],
});

describe('<RadioGroup>', () => {
  const createComponent = () => {
    const onChange = jest.fn();
    const { view } = renderView({ onChange });

    const firstInput = view.getAllByRole('radio')[0];

    return { firstInput, onChange, view };
  };

  it('sets the id and name props on the child', () => {
    const { firstInput } = createComponent();

    expect(firstInput).toHaveAttribute(
      'id',
      'what-salad-maker-do-you-prefer-0'
    );

    expect(firstInput).toHaveAttribute(
      'name',
      'what-salad-maker-do-you-prefer'
    );
  });

  it('sets the onChange prop on the child', () => {
    const { firstInput, onChange } = createComponent();

    fireEvent.click(firstInput);

    expect(onChange).toHaveBeenCalled();
  });

  it('sets any additional props on the outer div', () => {
    const { view } = createComponent();

    view.getByTestId('my-test-id');
  });
});
