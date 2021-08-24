import { DotDense } from '@codecademy/gamut-patterns';
import { setupRtl } from '@codecademy/gamut-tests';

import { FloatingCard } from '../FloatingCard';

const renderView = setupRtl(FloatingCard, { children: 'Float on okay' });

describe('FloatingCard', () => {
  it('renders with default props', () => {
    const { props, view } = renderView();
    view.getByText('Float on okay');
    view.getByTitle('Checker Dense');
    expect(props.shadow).not.toBeNull();
  });

  it('changes the shadow direction when props is passed', () => {
    const { props } = renderView({ shadow: 'bottomRight' });
    expect(props.shadow).toEqual('bottomRight');
  });

  it('renders a non-default pattern when passed a valid Gamut pattern', () => {
    const { view } = renderView({ pattern: DotDense });
    view.getByTitle('Dot Dense');
  });
});
