// eslint-disable-next-line gamut/import-paths
import * as icons from '@codecademy/gamut-icons/src/icons/regular';
import { keys, omit, pick } from 'lodash';

export const ICONS = icons;

export const VENDOR_ICONS = pick(
  ICONS,
  [
    'AmexIcon',
    'DiscordIcon',
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
    'WhatsAppFilledIcon',
    'VisaIcon',
    'YoutubeIcon',
    'XIcon',
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
