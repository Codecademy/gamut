import { render } from '@testing-library/react';

import * as patterns from '../dist/patterns';

describe('patterns', () => {
  for (const [name, Pattern] of Object.entries(patterns)) {
    // Skip __esmodule export
    if (name.startsWith('_')) continue;
    it(`${name} renders`, () => {
      render(<Pattern />);
    });
  }
});
