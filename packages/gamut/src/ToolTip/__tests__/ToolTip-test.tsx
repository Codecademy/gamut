import { setupRtl } from '@codecademy/gamut-tests';

import { ToolTip } from '..';

const children = 'Hello';

const renderView = setupRtl(ToolTip, { children });

describe('ToolTip', () => {
  it('does not give its container a tabIndex when it is not focusable', () => {
    const { view } = renderView({ children, id: 'test-id' });

    const container = view.getByLabelText(children);

    expect(container).not.toHaveAttribute('tabIndex');
  });

  it('gives the container a tabIndex when it is focusable', () => {
    const children = 'Hello';
    const { view } = renderView({ children, focusable: true, id: 'test-id' });

    const container = view.getByLabelText(children);

    expect(container).toHaveAttribute('tabIndex', '0');
  });
});
