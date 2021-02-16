import { theme } from '@codecademy/gamut-styles';
import { ThemeProvider } from '@emotion/react';
import { render } from '@testing-library/react';
import React from 'react';

import { ToolTip, ToolTipProps } from '..';

const renderToolTip = (props: ToolTipProps) => {
  return render(
    <ThemeProvider theme={theme}>
      <ToolTip {...props} />
    </ThemeProvider>
  );
};

describe('ToolTip', () => {
  it('does not give its container a tabIndex when it is not focusable', () => {
    const children = 'Hello';
    const view = renderToolTip({ children, id: 'test-id' });

    const container = view.getByLabelText(children);

    expect(container).not.toHaveAttribute('tabIndex');
  });

  it('gives the container a tabIndex when it is focusable', () => {
    const children = 'Hello';
    const view = renderToolTip({ children, focusable: true, id: 'test-id' });

    const container = view.getByLabelText(children);

    expect(container).toHaveAttribute('tabIndex', '0');
  });
});
