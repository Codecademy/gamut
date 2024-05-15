import { setupRtl } from '@codecademy/gamut-tests';

import { FormGroup } from '../elements/FormGroup';
import { Input } from '../inputs/Input';

const renderView = setupRtl(FormGroup, {
  children: <Input id="up-dog" />,
});

const label = 'up dog';
const htmlFor = 'up-dog';
const optional = '(optional)';
const optionalLabelText = `${label} (optional)`;

describe('FormGroup', () => {
  describe('when htmlFor is provided', () => {
    it('renders Label as a label', () => {
      const { view } = renderView({ label, htmlFor });

      view.getByLabelText(optionalLabelText);
    });
    it('render (optional) as aria-hidden', async () => {
      const { view } = renderView({ label, htmlFor });
      expect(view.getByText(optional)).toHaveAttribute('aria-hidden', 'true');
    });
  });
  describe('when htmlFor is not provided', () => {
    it('renders Label as a div', () => {
      const { view } = renderView({ label });

      expect(view.queryByLabelText(optionalLabelText)).toBeNull();
      view.getByText(label);
    });

    it('render (optional) as aria-hidden', () => {
      const { view } = renderView({ label });
      expect(view.getByText(optional)).toHaveAttribute('aria-hidden', 'true');
    });
  });

  it('adds an asterisk to required labels', () => {
    const { view } = renderView({
      label,
      htmlFor,
      required: true,
    });

    view.getByLabelText('up dog*');
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
    expect(view.getByRole('alert')).toHaveTextContent(
      'there is no up dog here...'
    );
  });
});
