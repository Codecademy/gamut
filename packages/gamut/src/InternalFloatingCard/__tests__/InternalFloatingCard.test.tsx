import { DotDense } from '@codecademy/gamut-patterns';
import { setupRtl } from '@codecademy/gamut-tests';

import { InternalFloatingCard } from '../InternalFloatingCard';

const renderView = setupRtl(InternalFloatingCard, {
  children: 'Float on okay',
});

describe('InternalFloatingCard', () => {
  it('renders with default props', () => {
    const { props, view } = renderView();
    view.getByText('Float on okay');
    view.getByTitle('Checker Dense');
    expect(props.shadow).toBeUndefined();
  });

  it('renders the default pattern when no pattern prop is passed', () => {
    const { view } = renderView();
    view.getByTitle('Checker Dense');
  });

  it('renders a non-default pattern when passed a valid Gamut pattern', () => {
    const { view } = renderView({ pattern: DotDense });
    view.getByTitle('Dot Dense');
  });
});
