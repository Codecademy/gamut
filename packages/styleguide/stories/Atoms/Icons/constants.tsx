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
    'JavaIcon',
    'JavascriptIcon',
    'JiraIcon',
    'LinkedinIcon',
    'LinkedinOutlineIcon',
    'MastercardIcon',
    'MediumIcon',
    'OpenAiFullIcon',
    'OpenAiIcon',
    'PythonIcon',
    'RailsIcon',
    'ReactIcon',
    'RedditIcon',
    'RubyIcon',
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
    'ResponsiveIcon',
    'StreakIcon',
    'TerminalIcon',
    'TrophyFilledIcon',
    'TrophyIcon',
  ].sort()
);

export const UI_ICONS = omit(ICONS, keys({ ...LE_ICONS, ...VENDOR_ICONS }));
