import { render } from '@testing-library/react';
import React from 'react';

import { Quote } from '..';

describe('Quote', () => {
  it('should render text when it is provided', () => {
    const wrapper = render(<Quote text="Timshel!" />);

    wrapper.getByText('Timshel!');
  });
});
