import React from 'react';
import { Avatar, Byline, Quote } from '../../index';
import { VisualTheme } from '@codecademy/gamut';
import cx from 'classnames';

import styles from './styles.module.scss';

export type Testimonial = {
  firstName: string;
  lastName: string;
  occupation: string;
  quote: string;
  company?: string;
  imageUrl?: string;
};

type TestimonialProps = {
  testimonial: Testimonial;
  size: 'small' | 'medium' | 'large';
  theme: VisualTheme;
};

export const Testimonial: React.FC<TestimonialProps> = ({
  testimonial,
  size,
  theme,
}) => {
  const {
    firstName,
    lastName,
    occupation,
    quote,
    imageUrl,
    company,
  } = testimonial;

  return (
    <div
      className={cx(styles.testimonialWrapper, {
        [styles.darkWrapper]: theme === 'dark',
        [styles.lightWrapper]: theme === 'light',
      })}
    >
      <div className={styles.testimonialCardContainer}>
        <div
          className={cx(styles.contentContainer, styles[`${size}Container`])}
        >
          {imageUrl && (
            <div className={styles.avatarContainer}>
              <Avatar
                src={imageUrl}
                theme={theme}
                className={cx({
                  [styles.largeContainerAvatar]: size === 'large',
                })}
                alt=""
              />
            </div>
          )}
          <div className={styles.bylineContainer}>
            <Byline
              firstName={firstName}
              occupation={occupation}
              company={company}
              lastName={lastName}
            />
          </div>
          <div className={styles.quoteContainer}>
            <Quote text={quote} theme={theme} />
          </div>
        </div>
      </div>
    </div>
  );
};
