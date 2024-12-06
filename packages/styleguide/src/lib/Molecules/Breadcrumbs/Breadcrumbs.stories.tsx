import { Breadcrumbs } from '@codecademy/gamut';
import type { Meta, StoryObj } from '@storybook/react';

const meta: Meta<typeof Breadcrumbs> = {
  component: Breadcrumbs,
  args: {},
};

export default meta;
type Story = StoryObj<typeof Breadcrumbs>;

export const Default: Story = {
  args: {
    crumbs: [
      {
        title: 'Catalog',
        href: '/'
      },
      {
        title: 'Web Development',
        href: '/',
      },
      {
        title: 'TypeScript',
        href: '/',
      },
      {
        title: 'Current Page',
      },
    ]
  },
};

export const Payload: Story = {
  args: {
    crumbs: [
      {
        title: 'Home',
        href: '/',
        payload: 'I can be anything!',
      },
      {
        title: 'Here',
      },
    ],
    onClick: (e, crumb) => {
      e.preventDefault();
      alert(crumb.payload); // eslint-disable-line no-alert
    },
  },
};
