import { values, pick, pickBy } from 'lodash';
import * as Icons from '@codecademy/gamut-icons/src';

export const VENDOR = pick(
  Icons,
  [
    'InstagramIcon',
    'FacebookIcon',
    'GithubIcon',
    'GplusIcon',
    'LinkedinIcon',
    'TwitterIcon',
    'YoutubeIcon',
    'RedditIcon',
    'MediumIcon',
    'JavascriptIcon',
    'PythonIcon',
    'RailsIcon',
    'ReactIcon',
    'RubyIcon',
    'FaviconIcon',
    'FaviconSolidIcon',
    'JavaIcon',
  ].sort()
);

export const LEARNING_ENVIRONMENT = pick(
  Icons,
  [
    'PortfolioProjectIcon',
    'ChallengeProjectIcon',
    'InformationalIcon',
    'LessonIcon',
    'ProjectsIcon',
    'NarrativeIcon',
    'ObjectiveIcon',
    'OverviewIcon',
    'InstructionsIcon',
    'ResponsiveIcon',
    'LearnIcon',
    'ArticleIcon',
    'ForumsChatIcon',
    'EditorIcon',
    'QuizIcon',
    'StreakIcon',
    'FitnessDumbbellIcon',
    'TrophyIcon',
    'TerminalIcon',
    'CertificateIcon',
    'BadgeIcon',
    'PathIcon',
    'PathChangeIcon',
    'PathCompleteIcon',
  ].sort()
);

const specialIcons = values({ ...LEARNING_ENVIRONMENT, ...VENDOR });

export const ALL_ICONS = pickBy(Icons, (icon) => !specialIcons.includes(icon));
