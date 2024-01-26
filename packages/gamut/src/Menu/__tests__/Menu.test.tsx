import { MultipleUsersIcon } from '@codecademy/gamut-icons';
import { setupRtl } from '@codecademy/gamut-tests';
import { screen } from '@testing-library/react';

import { Menu } from '../Menu';
import { MenuItem } from '../MenuItem';
import { MenuSeparator } from '../MenuSeparator';

const renderView = setupRtl(Menu, {});

describe('Menu', () => {
  it('does not renders nested menus as groups', () => {
    renderView({ children: <Menu /> });

    expect(screen.queryByRole('menu')).toBeNull();
    expect(screen.queryByRole('group')).toBeNull();
  });
  it('renders items without menuitem role as default', () => {
    renderView({
      children: <MenuItem>Cool Town</MenuItem>,
    });

    expect(screen.queryByRole('menuitem')).toBeNull();
  });

  it('renders link menuitems as anchors within a li', () => {
    renderView({
      children: <MenuItem href="#link">Cool Town</MenuItem>,
    });

    screen.getByRole('link');
    expect(screen.queryByRole('menuitem')).toBeNull();
  });
  it('renders menuitems with onClicks as buttons within a li', () => {
    renderView({
      children: <MenuItem onClick={() => null}>Cool Town</MenuItem>,
    });

    screen.getByRole('button');
    expect(screen.queryByRole('menuitem')).toBeNull();
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
  it('renders and icon only when specified', () => {
    renderView({
      children: <MenuItem>Cool Town</MenuItem>,
    });

    expect(screen.queryByTestId('menuitem-icon')).toBeNull();

    renderView({
      children: <MenuItem icon={MultipleUsersIcon}>Cool Town</MenuItem>,
    });

    screen.getByTestId('menuitem-icon');
  });
  it('renders `current page` screenreader text for active link', () => {
    renderView({
      children: (
        <MenuItem active href="#link">
          Cool Town
        </MenuItem>
      ),
    });

    screen.getByText('current page,');
  });
  it('renders `current action` screenreader text for active buttons', () => {
    renderView({
      children: (
        <MenuItem active onClick={() => null}>
          Cool Town
        </MenuItem>
      ),
    });

    screen.getByText('current action,');
  });
  it('renders `current item` screenreader text for active default ', () => {
    renderView({
      children: <MenuItem active>Cool Town</MenuItem>,
    });

    expect(screen.queryByTestId('menuitem-icon')).toBeNull();

    renderView({
      children: <MenuItem icon={MultipleUsersIcon}>Cool Town</MenuItem>,
    });

    screen.getByText('current item,');
  });
  describe('when the role is menu', () => {
    it('renders a list with a role of menu', () => {
      renderView({ role: 'menu' });
      screen.getByRole('menu');
    });
    it('renders nested menus as groups', () => {
      renderView({ children: <Menu />, role: 'menu' });

      screen.getByRole('menu');
      screen.getByRole('group');
    });

    it('renders items as MenuItems by default', () => {
      renderView({
        children: <MenuItem>Cool Town</MenuItem>,
        role: 'menu',
      });

      screen.getByRole('menuitem');
    });
    it('renders link menuitems as anchors within a li with no role', () => {
      renderView({
        children: <MenuItem href="#link">Cool Town</MenuItem>,
        role: 'menu',
      });

      screen.getByRole('none');
      screen.getByRole('menuitem');
    });
    it('renders menuitems with onClicks as buttons within a li with no role', () => {
      renderView({
        children: <MenuItem onClick={() => null}>Cool Town</MenuItem>,
        role: 'menu',
      });

      screen.getByRole('none');
      screen.getByRole('menuitem');
    });
  });
});
