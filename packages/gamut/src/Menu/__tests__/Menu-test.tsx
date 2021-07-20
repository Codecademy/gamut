import { setupRtl } from '@codecademy/gamut-tests';
import { screen } from '@testing-library/react';
import React from 'react';

import { Menu } from '../Menu';
import { MenuItem } from '../MenuItem';
import { MenuSeparator } from '../MenuSeparator';

const renderView = setupRtl(Menu, {});

describe('Menu', () => {
  it('renders a list with a role of menu', () => {
    renderView();
    screen.getByRole('menu');
  });
  it('renders nested menus as groups', () => {
    renderView({ children: <Menu /> });

    screen.getByRole('menu');
    screen.getByRole('group');
  });
  it('renders menu separators when the variant is action', () => {
    renderView({
      variant: 'action',
      children: <MenuSeparator />,
    });

    screen.getByRole('separator');
  });
  it('renders deep menu separators while the parent variant is action', () => {
    renderView({
      variant: 'action',
      children: (
        <Menu>
          <MenuSeparator />
        </Menu>
      ),
    });

    screen.getByRole('separator');
  });
  it('does not render separators when the variant is select + navigation', () => {
    renderView({
      variant: 'select',
      children: <MenuSeparator />,
    });

    expect(screen.queryByRole('separator')).toBeNull();

    renderView({
      variant: 'navigation',
      children: <MenuSeparator />,
    });

    expect(screen.queryByRole('separator')).toBeNull();
  });

  it('renders items as MenuItems by default', () => {
    renderView({
      children: <MenuItem>Cool Town</MenuItem>,
    });

    screen.getByRole('menuitem');
  });
  it('renders link menuitems as anchors within a li with no role', () => {
    renderView({
      children: <MenuItem href="#link">Cool Town</MenuItem>,
    });

    screen.getByRole('none');
    screen.getByRole('menuitem');
  });
});
