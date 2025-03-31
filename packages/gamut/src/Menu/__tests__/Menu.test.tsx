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
  it('renders menu separators when variant is popover', () => {
    renderView({
      variant: 'popover',
      children: <MenuSeparator />,
    });

    screen.getByRole('separator');
  });
  it('renders deep menu separators', () => {
    renderView({
      variant: 'popover',
      children: (
        <Menu>
          <MenuSeparator />
        </Menu>
      ),
    });

    screen.getByRole('separator');
  });
  it('renders menu separators when variant is fixed', () => {
    renderView({
      variant: 'fixed',
      children: <MenuSeparator />,
    });

    screen.getByRole('separator');
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
  it('render a ToolTip for interactive menu items with a label', async () => {
    const label = 'more people';
    const { view } = renderView({
      children: (
        <MenuItem icon={MultipleUsersIcon} label={label} onClick={() => {}} />
      ),
    });

    view.getByLabelText(label);
    expect(view.getByRole('tooltip', { hidden: true })).toHaveTextContent(
      label
    );
  });

  it('render an aria-label for non-interactive menu items with a label', async () => {
    const label = 'more people';
    const { view } = renderView({
      children: <MenuItem icon={MultipleUsersIcon} label={label} />,
    });

    expect(view.queryByRole('tooltip', { hidden: true })).toBeNull();
    view.getByLabelText(label);
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
