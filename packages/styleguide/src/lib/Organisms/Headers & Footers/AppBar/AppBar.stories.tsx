import { AppBar, AppBarSection, Logo } from '@codecademy/gamut';

export default {
  component: AppBar,
  subcomponents: {
    AppBarSection,
  },
};

export const Default = {
  render: () => (
    <AppBar>
      <AppBarSection position="left">In Left Position</AppBarSection>
    </AppBar>
  ),
  name: 'AppBar',
};

export const Header = {
  render: () => (
    <AppBar>
      <AppBarSection position="left">
        <Logo />
      </AppBarSection>
      <AppBarSection position="center">Pricing</AppBarSection>
      <AppBarSection position="right">Sign In</AppBarSection>
    </AppBar>
  ),
  name: 'Header',
};
