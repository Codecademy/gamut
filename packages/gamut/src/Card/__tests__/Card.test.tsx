import { setupRtl } from '@codecademy/gamut-tests';

import { Card } from '..';

const cardText = 'This is a card';
const renderView = setupRtl(Card, { children: cardText });

describe('Card', () => {
  it('renders card text', () => {
    const { view } = renderView();

    view.getByText(cardText);
  });

  it('renders as a link when given an href', () => {
    const { view } = renderView({ href: 'https://www.codecademy.com' });

    view.getByRole('link', { name: cardText })
  });
});
