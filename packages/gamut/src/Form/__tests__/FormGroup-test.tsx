import { setupRtl } from '@codecademy/gamut-tests';

import { FormGroup } from '../FormGroup';

const renderView = setupRtl(FormGroup, {});

describe('FormGroup', () => {
  it('renders Label as a label when htmlFor is provided', () => {
    const { view } = renderView({ label: 'up dog', htmlFor: 'up-dog' });

    expect(view.getByText('up dog').tagName).toBe('LABEL');
  });

  it('renders Label as a div when no htmlFor is provided', () => {
    const { view } = renderView({ label: 'up dog' });

    expect(view.getByText('up dog').tagName).toBe('DIV');
  });

  it('adds an asterisk to showRequired labels', () => {
    const { view } = renderView({
      label: 'up dog',
      htmlFor: 'up-dog',
      showRequired: true,
    });

    view.getByText('up dog *');
  });

  it('renders description', () => {
    const { view } = renderView({
      label: 'up dog',
      description:
        "i don't know what up dog is and at this point i'm too afraid to ask.",
    });

    view.getByText(
      "i don't know what up dog is and at this point i'm too afraid to ask."
    );
  });

  it('renders error text when there is an error', () => {
    const { view } = renderView({
      label: 'up dog',
      error: 'there is no up dog here...',
    });

    view.getByText('there is no up dog here...');
  });
});
