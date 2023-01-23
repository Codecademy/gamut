import { render } from '@testing-library/react';

import * as illustrations from '..';

describe('illustrations', () => {
  it.each(Object.entries(illustrations))(
    '%s renders',
    (_name, Illustration) => {
      render(<Illustration />);
    }
  );
});
