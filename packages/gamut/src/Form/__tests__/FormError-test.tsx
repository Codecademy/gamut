import { setupEnzyme } from '@codecademy/gamut-tests';

import { FormError } from '../FormError';

const renderWrapper = setupEnzyme(FormError, {});

describe('FormError', () => {
  it('renders Markdown when markdown is true', () => {
    const { wrapper } = renderWrapper({
      children:
        'This is [an example](https://www.youtube.com/watch?v=5IuRzJRrRpQ) error link.',
      markdown: true,
    });

    expect(wrapper.find('Anchor'));
  });

  it('does not render Markdown when markdown is false', () => {
    const { wrapper } = renderWrapper({
      children:
        'This is [an example](https://www.youtube.com/watch?v=5IuRzJRrRpQ) error link.',
      markdown: false,
    });

    expect(wrapper.find('Andor').exists()).toBe(false);
  });
});
