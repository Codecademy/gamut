import * as React from 'react';

import { setupRtl } from '../../__tests__/testUtils';
import { useElementDir } from '../elementDir';

const DirProbe: React.FC = () => (
  <span data-testid="dir">{useElementDir()}</span>
);

const WithRef: React.FC = () => {
  const ref = React.useRef<HTMLDivElement>(null);
  return (
    <>
      <div data-testid="dir">{useElementDir(ref)}</div>
      <div dir="rtl" ref={ref}>
        x
      </div>
    </>
  );
};

const WithSpanRef: React.FC = () => {
  const ref = React.useRef<HTMLSpanElement>(null);
  return (
    <>
      <span data-testid="dir">{useElementDir(ref)}</span>
      <span dir="rtl" ref={ref}>
        x
      </span>
    </>
  );
};

const renderDirProbe = setupRtl(DirProbe, {});
const renderWithRef = setupRtl(WithRef, {});
const renderWithSpanRef = setupRtl(WithSpanRef, {});

describe('useElementDir', () => {
  afterEach(() => {
    document.documentElement.removeAttribute('dir');
  });

  it('returns rtl when documentElement has dir=rtl and no ref', () => {
    document.documentElement.setAttribute('dir', 'rtl');

    const { view } = renderDirProbe();
    expect(view.getByTestId('dir')).toHaveTextContent('rtl');
  });

  it('returns ltr when documentElement has dir=ltr and no ref', () => {
    document.documentElement.setAttribute('dir', 'ltr');

    const { view } = renderDirProbe();
    expect(view.getByTestId('dir')).toHaveTextContent('ltr');
  });

  it('uses ref target when it is an Element', () => {
    const { view } = renderWithRef();
    expect(view.getByTestId('dir')).toHaveTextContent('rtl');
  });

  it('accepts non-div element refs (e.g. span)', () => {
    const { view } = renderWithSpanRef();
    expect(view.getByTestId('dir')).toHaveTextContent('rtl');
  });
});
