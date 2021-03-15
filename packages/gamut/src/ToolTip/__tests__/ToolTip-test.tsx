import { setupRtl } from '@codecademy/gamut-tests';

import { ToolTip } from '..';

const renderView = setupRtl(ToolTip, {
  children: 'Hello',
});

describe('ToolTip', () => {
  it('does not give its container a tabIndex when it is not focusable', () => {
    const { props, view } = renderView({ id: 'test-id' });

    const container = view.getByLabelText(props.children);

    expect(container).not.toHaveAttribute('tabIndex');
  });

  it('gives the container a tabIndex when it is focusable', () => {
    const { props, view } = renderView({ focusable: true, id: 'test-id' });

    const container = view.getByLabelText(props.children);

    expect(container).toHaveAttribute('tabIndex', '0');
  });
});
