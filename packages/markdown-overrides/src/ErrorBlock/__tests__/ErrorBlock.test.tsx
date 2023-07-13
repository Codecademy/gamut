import { render } from '@testing-library/react';

import { ErrorBlock } from '..';

describe('ErrorBlock', () => {
  it('renders itself and children', () => {
    const errorText = 'error!';
    const view = render(<ErrorBlock>{errorText}</ErrorBlock>);

    view.getByText(errorText);
  });
});
