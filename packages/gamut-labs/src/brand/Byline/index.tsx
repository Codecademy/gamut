import React from 'react';
import s from './styles.module.scss';
import cx from 'classnames';
import networkPin from './assets/networkPin.svg';

type BylineClassNamesProps = {
  bylineContainer?: string;
  author?: string;
  jobContainer?: string;
  location?: string;
};

export type BylineProps = {
  firstName: string;
  occupation: string;
  location?: string;
  classNames?: BylineClassNamesProps;
  company?: string;
  lastName?: string;
};

export const Byline: React.FC<BylineProps> = ({
  firstName,
  occupation,
  location,
  classNames = {},
  company,
  lastName,
}) => (
  <div className={cx(s.bylineContainer, classNames.bylineContainer)}>
    <span
      data-testid="author-container"
      className={cx(s.author, classNames.author)}
    >
      <span>{firstName}</span>
      {lastName && <span className={s.lastName}>{` ${lastName}`}</span>}
    </span>
    <div data-testid="job-container" className={classNames.jobContainer}>
      <span>{occupation}</span>
      {company && <span className={s.company}>{` @ ${company}`}</span>}
    </div>
    {location && (
      <div className={s.locationContainer}>
        <img
          alt="Location pin icon"
          className={s.networkPin}
          src={networkPin}
        />
        <span className={classNames.location}>{location}</span>
      </div>
    )}
  </div>
);
