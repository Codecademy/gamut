import React from 'react';
import PropTypes from 'prop-types';

import AdvisorIcon from './icons/AdvisorIcon';
import AlertIcon from './icons/AlertIcon';
import ArticleIcon from './icons/ArticleIcon';
import CertificateIcon from './icons/CertificateIcon';
import ClockIcon from './icons/ClockIcon';
import CommunityIcon from './icons/CommunityIcon';
import LearnIcon from './icons/LearnIcon';
import MaintenanceIcon from './icons/MaintenanceIcon';
import ProjectIcon from './icons/ProjectIcon';
import QuizIcon from './icons/QuizIcon';
import ResetIcon from './icons/ResetIcon';
import SyllabusIcon from './icons/SyllabusIcon';

export const iconMap = {
  advisor: AdvisorIcon,
  alert: AlertIcon,
  article: ArticleIcon,
  certificate: CertificateIcon,
  clock: ClockIcon,
  community: CommunityIcon,
  learn: LearnIcon,
  maintenance: MaintenanceIcon,
  project: ProjectIcon,
  quiz: QuizIcon,
  reset: ResetIcon,
  syllabus: SyllabusIcon,
};

const propTypes = {
  name: PropTypes.oneOf(Object.keys(iconMap)).isRequired,
};

const defaultProps = {
  height: 24,
  width: 24,
};

function Icon({ name, ...props }) {
  const MappedIcon = iconMap[name];

  return (
    <MappedIcon
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
