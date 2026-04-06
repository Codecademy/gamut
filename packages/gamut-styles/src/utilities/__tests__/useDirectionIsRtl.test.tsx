import { render, screen } from '@testing-library/react';
import * as React from 'react';

import { useDirectionIsRtl } from '../directionIsRtl';

describe('useDirectionIsRtl', () => {
  afterEach(() => {
    document.documentElement.removeAttribute('dir');
  });

  it('returns true when documentElement has dir=rtl and no ref', () => {
    document.documentElement.setAttribute('dir', 'rtl');

    const Probe: React.FC = () => (
      <span data-testid="dir">{String(useDirectionIsRtl())}</span>
    );

    render(<Probe />);
    expect(screen.getByTestId('dir')).toHaveTextContent('true');
  });

  it('returns false when documentElement has dir=ltr and no ref', () => {
    document.documentElement.setAttribute('dir', 'ltr');

    const Probe: React.FC = () => (
      <span data-testid="dir">{String(useDirectionIsRtl())}</span>
    );

    render(<Probe />);
    expect(screen.getByTestId('dir')).toHaveTextContent('false');
  });

  it('uses ref target when it is an Element', () => {
    const WithRef: React.FC = () => {
      const ref = React.useRef<HTMLDivElement>(null);
      return (
        <>
          <div data-testid="dir">{String(useDirectionIsRtl(ref))}</div>
          <div dir="rtl" ref={ref}>
            x
          </div>
        </>
      );
    };

    render(<WithRef />);
    expect(screen.getByTestId('dir')).toHaveTextContent('true');
  });
});
