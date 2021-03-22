import { setupEnzyme } from '@codecademy/gamut-tests';

import { FormGroup } from '../FormGroup';

const renderWrapper = setupEnzyme(FormGroup, {});

describe('FormGroup', () => {
  it('renders Label as a label when htmlFor is provided', () => {
    const { wrapper } = renderWrapper({ label: 'up dog', htmlFor: 'up-dog' });
    expect(wrapper.find('label').text()).toBe('up dog');
  });

  it('renders Label as a div when no htmlFor is provided', () => {
    const { wrapper } = renderWrapper({ label: 'up dog' });
    const labelWrapper = wrapper.find('Label');

    expect(labelWrapper.find('label').exists()).toBe(false);
    expect(labelWrapper.find('div').text()).toBe('up dog');
  });

  it('adds an asterisk to showRequired labels', () => {
    const { wrapper } = renderWrapper({
      label: 'up dog',
      htmlFor: 'up-dog',
      showRequired: true,
    });
    expect(wrapper.find('label').text()).toBe('up dog *');
  });

  it('renders description', () => {
    const { wrapper } = renderWrapper({
      label: 'up dog',
      description:
        "i don't know what up dog is and at this point i'm too afraid to ask.",
    });
    expect(wrapper.find('FormGroupDescription').text()).toBe(
      "i don't know what up dog is and at this point i'm too afraid to ask."
    );
  });

  it('renders error text when there is an error', () => {
    const { wrapper } = renderWrapper({
      label: 'up dog',
      error: 'there is no up dog here...',
    });
    const labelWrapper = wrapper.find('FormError');

    expect(labelWrapper.find('FormError').text()).toBe(
      'there is no up dog here...'
    );
  });
});
