import { render } from '@testing-library/react';

import Styleguide from './styleguide';

describe('Styleguide', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<Styleguide />);
    expect(baseElement).toBeTruthy();
  });
});
