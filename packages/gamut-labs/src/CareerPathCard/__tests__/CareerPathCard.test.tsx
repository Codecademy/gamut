import { setupRtl } from '@codecademy/gamut-tests';
import { faker } from '@faker-js/faker';
import userEvent from '@testing-library/user-event';
import { ReactChildren } from 'react';

import { trackUserClick } from '~/libs/tracking';

import { createMockCareerPathContent } from '../__fixtures__';
import { CareerPathCard } from './CareerPathCard';

jest.mock('~/libs/tracking');

jest.mock('next/link', () => ({ children }: { children: ReactChildren }) =>
  children
);

const path = createMockCareerPathContent();

const pageName = faker.lorem.word();
const context = faker.lorem.word();
const renderView = setupRtl(CareerPathCard, {
  trackingData: {
    page_name: pageName,
    context,
  },
});

describe('CareerPathCard', () => {
  it('calls trackUserClick when card is clicked', () => {
    const { view } = renderView({ content: path });

    userEvent.click(view.getByText(path.title));

    expect(trackUserClick).toHaveBeenCalledWith({
      page_name: pageName,
      context,
      slug: path.slug,
      target: 'path-card',
    });
  });

  it('renders career in header', () => {
    const { view } = renderView({ content: path });
    view.getByText('Career path');
  });
});
