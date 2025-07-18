// eslint-disable-next-line gamut/import-paths
import * as icons from '@codecademy/gamut-icons/src/icons/regular';
import keys from 'lodash/keys';
import omit from 'lodash/omit';
import pick from 'lodash/pick';

export const ICONS = icons;

export const VENDOR_ICONS = pick(
  ICONS,
  [
    'AmexIcon',
    'DiscordIcon',
    'DiscordOutlineIcon',
    'FacebookIcon',
    'FaviconIcon',
    'FaviconSolidIcon',
    'GithubIcon',
    'GithubOutlineIcon',
    'GplusIcon',
    'InstagramIcon',
    'JiraIcon',
    'LinkedinIcon',
    'LinkedinOutlineIcon',
    'MastercardIcon',
    'MediumIcon',
    'OpenAiFullIcon',
    'OpenAiIcon',
    'PaypalLogoIcon',
    'PercipioIcon',
    'RailsIcon',
    'ReactIcon',
    'RedditIcon',
    'SlackIcon',
    'TikTokIcon',
    'TwitterIcon',
    'TwitterOutlineIcon',
    'VisaIcon',
    'WhatsAppFilledIcon',
    'XIcon',
    'YoutubeIcon',
    'YoutubePlayIcon',
  ].sort()
);

export const LE_ICONS = pick(
  ICONS,
  [
    'ArticleIcon',
    'BadgeIcon',
    'BookClosedBookmarkIcon',
    'CertificateFilledIcon',
    'CertificateIcon',
    'ChallengeProjectIcon',
    'ChecklistIcon',
    'EditorIcon',
    'FileSearchIcon',
    'FitnessDumbbellIcon',
    'ForumsChatIcon',
    'InformationalIcon',
    'InteractiveCursorIcon',
    'InstructionsIcon',
    'LearnIcon',
    'LessonIcon',
    'NarrativeIcon',
    'ObjectiveIcon',
    'OverviewIcon',
    'PathChangeIcon',
    'PathCompleteIcon',
    'PathIcon',
    'PinIcon',
    'PortfolioProjectIcon',
    'ProfessionalCertificateIcon',
    'ProjectsIcon',
    'QuizIcon',
    'ReportIcon',
    'ResponsiveIcon',
    'StreakIcon',
    'TerminalIcon',
    'TrophyFilledIcon',
    'TrophyIcon',
  ].sort()
);

export const SKILLS_ICONS = pick(
  ICONS,
  [
    'ArtificialIntelligenceIcon',
    'BashShellIcon',
    'CIcon',
    'CPlusIcon',
    'CSharpIcon',
    'CloudComputingIcon',
    'ComputerScienceIcon',
    'CybersecurityIcon',
    'DataAnalyticsIcon',
    'DataEngineeringIcon',
    'DataScienceIcon',
    'DataVisualizationIcon',
    'DevopsIcon',
    'FallbackSkillIcon',
    'FlutterIcon',
    'GameDevelopmentIcon',
    'GoIcon',
    'HtmlCssIcon',
    'ItIcon',
    'JavaIcon',
    'JavascriptIcon',
    'KotlinIcon',
    'MachineLearningIcon',
    'MathIcon',
    'MobileDevelopmentIcon',
    'PhpIcon',
    'PythonIcon',
    'RIcon',
    'RubyIcon',
    'SqlIcon',
    'SwiftIcon',
    'WebDesignIcon',
    'WebDevelopmentIcon',
  ].sort()
);

export const UI_ICONS = omit(
  ICONS,
  keys({ ...LE_ICONS, ...VENDOR_ICONS, ...SKILLS_ICONS })
);
