import { AccountingCoinsIcon, BookFlipPageIcon, BriefcaseIcon, CommunityIcon, GearIcon, HouseEntranceIcon, NotebookIcon, PersonIcon, PieLineGraphIcon, RatingStarGiveIcon, SupportIcon } from '@codecademy/gamut-icons';
export var logo = {
  dataTestId: 'header-logo',
  id: 'logo',
  href: '/',
  pro: false,
  trackingTarget: 'topnav_logo',
  type: 'logo'
};
export var myHome = {
  dataTestId: 'header-home',
  icon: HouseEntranceIcon,
  id: 'my-home',
  text: 'My Home',
  href: '/learn',
  trackingTarget: 'topnav_home',
  type: 'link'
};
export var catalogDropdown = function catalogDropdown(hideCareerPaths) {
  return {
    dataTestId: 'header-catalog',
    icon: BookFlipPageIcon,
    id: 'catalog-dropdown',
    text: 'Catalog',
    trackingTarget: 'topnav_catalog',
    type: 'catalog-dropdown',
    hideCareerPaths: hideCareerPaths
  };
};
export var resourcesDropdown = {
  dataTestId: 'header-resources',
  icon: NotebookIcon,
  id: 'resources-dropdown',
  text: 'Resources',
  trackingTarget: 'topnav_resources',
  type: 'resources-dropdown'
};
export var communityDropdown = {
  icon: CommunityIcon,
  id: 'community',
  text: 'Community',
  popover: [{
    id: 'forums',
    href: 'https://discuss.codecademy.com/',
    trackingTarget: 'topnav_community_forums',
    newTab: true,
    text: 'Forums',
    type: 'link'
  }, {
    id: 'chat',
    href: 'https://discord.com/invite/codecademy',
    newTab: true,
    trackingTarget: 'topnav_chat',
    text: 'Discord',
    type: 'link'
  }, {
    id: 'chapters',
    href: 'https://community.codecademy.com/',
    newTab: true,
    trackingTarget: 'topnav_community_chapters',
    text: 'Chapters',
    type: 'link'
  }, {
    id: 'events',
    href: '/events',
    trackingTarget: 'topnav_community_events',
    text: 'Events',
    type: 'link'
  }, {
    id: 'learner-stories',
    href: '/learner-stories',
    trackingTarget: 'topnav_learner_stories_hub',
    text: 'Learner Stories',
    type: 'link'
  }],
  trackingTarget: 'topnav_community',
  type: 'dropdown'
};
export var pricingDropdown = {
  icon: AccountingCoinsIcon,
  id: 'pricing',
  text: 'Pricing',
  popover: [{
    id: 'pro-membership',
    href: '/pricing',
    trackingTarget: 'topnav_pro_membership',
    text: 'For Individuals',
    type: 'link'
  }, {
    id: 'for-students',
    href: '/student-center',
    trackingTarget: 'topnav_pricing_students',
    text: 'For Students',
    type: 'link'
  }, {
    id: 'for-teams',
    href: '/business#section-pricing-table',
    trackingTarget: 'topnav_pricing_business',
    text: 'For Teams',
    type: 'link'
  }],
  trackingTarget: 'topnav_pricing',
  type: 'dropdown'
};
export var businessSolutions = {
  icon: BriefcaseIcon,
  id: 'business-solutions',
  trackingTarget: 'topnav_business',
  text: 'Business Solutions',
  href: '/business',
  type: 'link'
};
var profileMyProfile = {
  id: 'my-profile',
  icon: PersonIcon,
  href: '/profiles/me',
  trackingTarget: 'avatar_my_profile',
  text: 'Profile',
  type: 'link'
};
var profileAccount = {
  id: 'account',
  icon: GearIcon,
  href: '/account',
  trackingTarget: 'avatar_settings',
  text: 'Account + Billing',
  type: 'link'
};
var profileMyHome = {
  id: 'my-home',
  icon: HouseEntranceIcon,
  href: '/learn',
  trackingTarget: 'avatar_dashboard',
  text: 'My Home',
  type: 'link'
};
var profileBusinessAccount = {
  id: 'business',
  icon: PieLineGraphIcon,
  href: '/business/plans',
  trackingTarget: 'avatar_business',
  text: 'Business Account Management',
  type: 'link'
};
var profileHelpCenter = {
  id: 'help-center',
  icon: SupportIcon,
  href: '/help',
  newTab: true,
  trackingTarget: 'avatar_help',
  text: 'Help Center',
  type: 'link'
};
var profileAdmin = {
  id: 'admin',
  dataTestId: 'admin-link',
  href: '/admin',
  trackingTarget: 'avatar_admin',
  text: 'Admin',
  type: 'link'
};
var profileCustomerSupport = {
  id: 'customer-support',
  href: '/admin/concessions',
  trackingTarget: 'avatar_customer_support',
  text: 'Customer Support',
  type: 'link'
};
var profileReportBug = {
  id: 'report-bug',
  href: 'https://codecademy.atlassian.net/servicedesk/customer/portal/9',
  newTab: true,
  trackingTarget: 'avatar_report_bug',
  text: 'Report a Bug [ADMIN]',
  type: 'link'
};
var profileLogOut = {
  id: 'log-out',
  href: '/sign_out',
  trackingTarget: 'avatar_log_out',
  text: 'Log Out',
  type: 'link'
};
export var freeProfile = function freeProfile(user, isMobile) {
  var topSection = [profileMyProfile];
  if (user !== null && user !== void 0 && user.isBusinessAdmin || !(user !== null && user !== void 0 && user.isBusinessSsoUser)) {
    topSection.push(profileAccount);
  }
  topSection.push(profileMyHome);
  if (!isMobile && user !== null && user !== void 0 && user.isAccountManager && !(user !== null && user !== void 0 && user.hideBusinessAccount)) {
    topSection.push(profileBusinessAccount);
  }
  topSection.push(profileHelpCenter);
  var bottomSection = [profileLogOut];
  var popover = [topSection, bottomSection];
  return {
    avatar: user.avatar,
    userDisplayName: user.displayName,
    id: 'profile',
    text: 'Profile',
    popover: popover,
    trackingTarget: 'topnav_profile',
    type: 'profile-dropdown'
  };
};
export var proProfile = function proProfile(user) {
  var topSection = [profileMyProfile];
  if (user.isBusinessAdmin || !user.isBusinessSsoUser) {
    topSection.push(profileAccount);
  }
  topSection.push(profileMyHome);
  if ((user !== null && user !== void 0 && user.isAccountManager || user !== null && user !== void 0 && user.isBusinessAdmin) && !(user !== null && user !== void 0 && user.hideBusinessAccount)) {
    topSection.push(profileBusinessAccount);
  }
  if (user.showReferrals) {
    topSection.push(referrals);
  }
  topSection.push(profileHelpCenter);
  var middleSection = [];
  if (user.isAdmin) {
    middleSection.push(profileAdmin);
  }
  if (user.isCustomerSupport) {
    middleSection.push(profileCustomerSupport);
  }
  if (user.isAdmin) {
    middleSection.push(profileReportBug);
  }
  var bottomSection = [profileLogOut];
  var popover = [topSection, middleSection, bottomSection];
  return {
    avatar: user.avatar,
    userDisplayName: user.displayName,
    id: 'profile',
    text: 'Profile',
    popover: popover,
    trackingTarget: 'topnav_profile',
    type: 'profile-dropdown'
  };
};
export var tryProForFree = function tryProForFree(checkoutUrl) {
  return {
    dataTestId: 'upgrade-link',
    id: 'try-pro',
    text: 'Start free trial',
    href: checkoutUrl || '/pages/pro',
    trackingTarget: 'topnav_pro_trial',
    type: 'fill-button'
  };
};
export var upgradeToPro = function upgradeToPro(checkoutUrl) {
  return {
    dataTestId: 'upgrade-link',
    id: 'upgrade-to-pro',
    text: 'Upgrade plan',
    href: checkoutUrl || '/pages/pro',
    trackingTarget: 'topnav_pro_upgrade',
    type: 'fill-button'
  };
};
export var unpausePro = {
  dataTestId: 'unpause-link',
  id: 'unpause-pro',
  text: 'Unpause Now',
  href: '/account/billing',
  trackingTarget: 'topnav_pro_unpause',
  type: 'fill-button'
};
export var login = {
  dataTestId: 'header-sign-in',
  id: 'login',
  text: 'Log In',
  href: '/login',
  trackingTarget: 'topnav_login',
  type: 'text-button',
  redirect: true
};
export var signUp = {
  dataTestId: 'header-sign-up',
  id: 'signup',
  text: 'Sign Up',
  href: '/register',
  trackingTarget: 'topnav_signup',
  type: 'fill-button',
  redirect: true
};
export var referrals = {
  dataTestId: 'header-referrals',
  id: 'referrals',
  text: 'Give Pro, Get Pro',
  href: '/referrals',
  type: 'link',
  icon: RatingStarGiveIcon,
  trackingTarget: 'avatar_referrals'
};