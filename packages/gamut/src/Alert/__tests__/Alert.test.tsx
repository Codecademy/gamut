import { setupRtl } from '@codecademy/gamut-tests';
import { matchers } from '@emotion/jest';
import { fireEvent } from '@testing-library/dom';

import { FillButton, IconButton } from '../../Button';
import { Alert } from '../Alert';

expect.extend(matchers);

const children = 'Hello';
const onClose = jest.fn();
const onClick = jest.fn();

const renderView = setupRtl(Alert, {
  onClose,
  children,
  variant: 'notice',
});

describe('Alert', () => {
  beforeEach(() => {
    jest.resetAllMocks();
  });

  it('renders without exploding', () => {
    const { view } = renderView({});

    expect(view.getByText(children));
  });

  it('calls the onClose callback when the close button is clicked', () => {
    const { view } = renderView({});

    const buttons = view.getAllByRole('button');

    expect(buttons.length).toBe(2);

    fireEvent.click(buttons[1]);
    expect(onClose).toHaveBeenCalled();
  });

  it('renders a clickable  button', () => {
    const { view } = renderView({ cta: { onClick, children: 'Click Me!' } });

    const cta = view.getByRole('button', { name: 'Click Me!' });

    fireEvent.click(cta);

    expect(onClick).toHaveBeenCalled();
  });

  it('renders the cta as a link if configured', () => {
    const { view } = renderView({
      cta: { children: 'Click Me', href: '/hello', onClick },
    });

    const cta = view.getByRole('link');

    fireEvent.click(cta);

    expect(cta).toHaveAttribute('href', '/hello');
    expect(onClick).toHaveBeenCalled();
  });

  it('renders a clickable button to expand the truncated section', () => {
    const { view } = renderView({});

    const buttons = view.getAllByRole('button');

    expect(buttons.length).toBe(2);
    console.log(view.debug());
    expect(view.getByText(/([H]+\W+[.?!;\u2026]+)/, { exact: false }));

    fireEvent.click(buttons[0]);
    // buttons.at(0).simulate('click');

    expect(view.findByText(children)).toHaveAttribute('aria-expanded', 'true');

    // buttons.at(0).simulate('click');

    // view.update();

    // expect(view.find('TruncateMarkup').length).toBe(1);
  });
});
