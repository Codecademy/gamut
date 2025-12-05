import { setupRtl } from '@codecademy/gamut-tests';

import { FormGroup } from '../elements/FormGroup';
import { Input } from '../inputs/Input';

const renderView = setupRtl(FormGroup, {
  children: <Input id="up-dog" />,
});

const label = 'up dog';
const htmlFor = 'up-dog';
const optionalLabelText = `${label} (optional)`;

describe('FormGroup', () => {
  describe('when htmlFor is provided', () => {
    it('renders Label as a label', () => {
      const { view } = renderView({ label, htmlFor });

      view.getByLabelText(optionalLabelText);
    });
  });
  describe('when htmlFor is not provided', () => {
    it('renders Label as a div', () => {
      const { view } = renderView({ label });

      expect(view.queryByLabelText(optionalLabelText)).toBeNull();
      view.getByText(/up dog/);
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

  it('does not add an asterisk to solo field labels', () => {
    const { view } = renderView({
      label,
      htmlFor,
      required: true,
      isSoloField: true,
    });

    view.getByLabelText('up dog');
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

  describe('infotip accessibility', () => {
    const info = 'helpful information';
    const ariaLabel = 'Custom label';

    it('automatically labels InfoTip button by the field label when label is a string', () => {
      const { view } = renderView({ label, htmlFor, infotip: { info } });

      view.getByRole('button', { name: new RegExp(label) });
    });

    it('uses explicit ariaLabel when provided', () => {
      const { view } = renderView({
        label,
        htmlFor,
        infotip: { info, ariaLabel },
      });

      view.getByRole('button', { name: ariaLabel });
    });

    it('uses explicit ariaLabelledby when provided', () => {
      const externalLabelId = 'external-label-id';
      const externalLabelText = 'External Label';

      const { view } = renderView({
        label,
        htmlFor,
        infotip: { info, ariaLabelledby: externalLabelId },
        children: (
          <>
            <span id={externalLabelId}>{externalLabelText}</span>
            <Input id={htmlFor} />
          </>
        ),
      });

      view.getByRole('button', { name: externalLabelText });
    });

    // Note: No "ReactNode label" test case here because FormGroup.label
    // is typed as string - automatic ariaLabelledby always applies.
  });
});
