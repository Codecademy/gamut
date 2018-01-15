import React from 'react';
import PropTypes from 'prop-types';

import AccessibilityIcon from './icons/Accessibility';
import AdvisorIcon from './icons/AdvisorIcon';
import AlertIcon from './icons/AlertIcon';
import AlexaIcon from './icons/Alexa';
import AngularIcon from './icons/AngularIcon';
import ArticleIcon from './icons/ArticleIcon';
import CertificateIcon from './icons/CertificateIcon';
import ClockIcon from './icons/ClockIcon';
import CommunityIcon from './icons/CommunityIcon';
import CSSIcon from './icons/CSS';
import DAWIcon from './icons/DAW';
import FullstackIcon from './icons/Fullstack';
import GitIcon from './icons/Git';
import HTMLIcon from './icons/HTML';
import JavaIcon from './icons/Java';
import JavascriptIcon from './icons/Javascript';
import jQueryIcon from './icons/jQuery';
import LearnIcon from './icons/LearnIcon';
import MaintenanceIcon from './icons/MaintenanceIcon';
import MatplotLibIcon from './icons/MatplotLib';
import MAWIcon from './icons/MAW';
import NumPyIcon from './icons/NumPy';
import PandaIcon from './icons/Panda';
import PHPIcon from './icons/PHP';
import ProjectIcon from './icons/ProjectIcon';
import PythonIcon from './icons/Python';
import QuizIcon from './icons/QuizIcon';
import RailsIcon from './icons/Rails';
import ReactIcon from './icons/React';
import ResetIcon from './icons/ResetIcon';
import ResponsiveIcon from './icons/Responsive';
import RubyIcon from './icons/Ruby';
import SassIcon from './icons/SassIcon';
import SQLIcon from './icons/SQL';
import SyllabusIcon from './icons/SyllabusIcon';
import TDDIcon from './icons/TDD';
import TerminalIcon from './icons/Terminal';
import WatsonIcon from './icons/Watson';

export const iconMap = {
  accessibility: AccessibilityIcon,
  advisor: AdvisorIcon,
  alert: AlertIcon,
  alexa: AlexaIcon,
  angular: AngularIcon,
  article: ArticleIcon,
  certificate: CertificateIcon,
  clock: ClockIcon,
  community: CommunityIcon,
  css: CSSIcon,
  daw: DAWIcon,
  fullstack: FullstackIcon,
  git: GitIcon,
  html: HTMLIcon,
  java: JavaIcon,
  javascript: JavascriptIcon,
  jQuery: jQueryIcon,
  learn: LearnIcon,
  maintenance: MaintenanceIcon,
  matplotLib: MatplotLibIcon,
  maw: MAWIcon,
  numPy: NumPyIcon,
  panda: PandaIcon,
  php: PHPIcon,
  project: ProjectIcon,
  python: PythonIcon,
  quiz: QuizIcon,
  rails: RailsIcon,
  react: ReactIcon,
  reset: ResetIcon,
  responsive: ResponsiveIcon,
  ruby: RubyIcon,
  sass: SassIcon,
  sql: SQLIcon,
  syllabus: SyllabusIcon,
  tdd: TDDIcon,
  terminal: TerminalIcon,
  watson: WatsonIcon,
};

const propTypes = {
  name: PropTypes.oneOf(Object.keys(iconMap)).isRequired,
  height: PropTypes.string,
  width: PropTypes.string,
};

const defaultProps = {
  height: 24,
  width: 24,
};

function Icon({ name, ...props }) {
  const MappedIcon = iconMap[name];

  return (
    <MappedIcon
      fill="currentColor"
      xmlns="http://www.w3.org/2000/svg"
      aria-labelledby="title"
      version="1.1"
      {...props}
    />
  );
}

Icon.propTypes = propTypes;
Icon.defaultProps = defaultProps;

export default Icon;
