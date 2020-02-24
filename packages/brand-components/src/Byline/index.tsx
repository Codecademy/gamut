import React from 'react';
import s from './styles.module.scss';
import cx from 'classnames';
import networkPin from './assets/networkPin.svg';

type BylineClassNamesProps = {
  bylineContainer?: string;
  name?: string;
  occupation?: string;
  location?: string;
};

export type BylineProps = {
  name: string;
  occupation: string;
  location?: string;
  classNames?: BylineClassNamesProps;
};

export const Byline: React.FC<BylineProps> = ({
  name,
  occupation,
  location,
  classNames = {},
}) => (
  <div className={cx(s.bylineContainer, classNames.bylineContainer)}>
    <span aria-label="Name" className={cx(s.name, classNames.name)}>
      {name}
    </span>
    <span aria-label="Occupation" className={classNames.occupation}>
      {occupation}
    </span>
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
