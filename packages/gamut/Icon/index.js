import React from 'react';
import PropTypes from 'prop-types';

import AccessibilityIcon from './icons/AccessibilityIcon';
import AdvisorIcon from './icons/AdvisorIcon';
import AlertIcon from './icons/AlertIcon';
import AlexaIcon from './icons/AlexaIcon';
import AngularIcon from './icons/AngularIcon';
import ArticleIcon from './icons/ArticleIcon';
import CertificateIcon from './icons/CertificateIcon';
import ClockIcon from './icons/ClockIcon';
import CommunityIcon from './icons/CommunityIcon';
import CSSIcon from './icons/CSSIcon';
import DAWIcon from './icons/DAWIcon';
import FullstackIcon from './icons/FullstackIcon';
import GitIcon from './icons/GitIcon';
import HTMLIcon from './icons/HTMLIcon';
import JavaIcon from './icons/JavaIcon';
import JavascriptIcon from './icons/JavascriptIcon';
import jQueryIcon from './icons/jQueryIcon';
import LearnIcon from './icons/LearnIcon';
import MaintenanceIcon from './icons/MaintenanceIcon';
import MatplotLibIcon from './icons/MatplotLibIcon';
import MAWIcon from './icons/MAWIcon';
import NumPyIcon from './icons/NumPyIcon';
import PandasIcon from './icons/PandasIcon';
import PHPIcon from './icons/PHPIcon';
import ProjectIcon from './icons/ProjectIcon';
import PythonIcon from './icons/PythonIcon';
import QuizIcon from './icons/QuizIcon';
import RailsIcon from './icons/RailsIcon';
import ReactIcon from './icons/ReactIcon';
import ResetIcon from './icons/ResetIcon';
import ResponsiveIcon from './icons/ResponsiveIcon';
import RubyIcon from './icons/RubyIcon';
import SassIcon from './icons/SassIcon';
import SQLIcon from './icons/SQLIcon';
import SyllabusIcon from './icons/SyllabusIcon';
import TDDIcon from './icons/TDDIcon';
import TerminalIcon from './icons/TerminalIcon';
import WatsonIcon from './icons/WatsonIcon';

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
  pandas: PandasIcon,
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
