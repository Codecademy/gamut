import React from 'react';
import s from './styles.module.scss';
import cx from 'classnames';
import networkPin from './assets/networkPin.svg';

type BylineClassNamesProps = {
  bylineContainer?: string;
  name?: string;
  jobContainer?: string;
  location?: string;
};

export type BylineProps = {
  name: string;
  occupation: string;
  location?: string;
  classNames?: BylineClassNamesProps;
  company?: string;
};

export const Byline: React.FC<BylineProps> = ({
  name,
  occupation,
  location,
  classNames = {},
  company,
}) => (
  <div className={cx(s.bylineContainer, classNames.bylineContainer)}>
    <span aria-label="Name" className={cx(s.name, classNames.name)}>
      {name}
    </span>
    <div data-testid="job-container" className={classNames.jobContainer}>
      <span aria-label="Occupation">{occupation}</span>
      <span aria-label="Company" className={s.company}>
        {` @ ${company}`}
      </span>
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

export default Byline;
