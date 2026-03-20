import { setupRtl } from '@codecademy/gamut-tests';

import { Card } from '..';

const renderView = setupRtl(Card, { children: 'card content' });

describe('Card', () => {
  it('renders children', () => {
    const { view } = renderView();

    view.getByText('card content');
  });

  it('renders with a non-default variant', () => {
    const { view } = renderView({ variant: 'white' });

    view.getByText('card content');
  });

  it('renders with isInteractive prop', () => {
    const { view } = renderView({ isInteractive: true });

    view.getByText('card content');
  });

  it('renders with outline shadow', () => {
    const { view } = renderView({ shadow: 'outline' });

    view.getByText('card content');
  });

  it('renders with patternLeft shadow', () => {
    const { view } = renderView({ shadow: 'patternLeft' });

    view.getByText('card content');
  });

  it('renders with patternRight shadow', () => {
    const { view } = renderView({ shadow: 'patternRight' });

    view.getByText('card content');
  });
});
