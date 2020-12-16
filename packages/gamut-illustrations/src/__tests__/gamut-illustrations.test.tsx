import { render } from '@testing-library/react';
import React from 'react';

import * as illustrations from '..';

describe('illustrations', () => {
  for (const [name, Illustration] of Object.entries(illustrations)) {
    it(`${name} renders`, () => {
      render(<Illustration />);
    });
  }
});
