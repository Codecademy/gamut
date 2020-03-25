import React from 'react';
import { Avatar, Byline, Quote } from '../index';
import { VisualTheme } from '@codecademy/gamut';
import cx from 'classnames';

import s from './styles.module.scss';

type TestimonialProps = {
  name: string;
  occupation: string;
  quote: string;
  imageUrl?: string;
  size: 'small' | 'medium' | 'large';
  theme: VisualTheme;
};

export const Testimonial: React.FC<TestimonialProps> = ({
  name,
  occupation,
  imageUrl,
  quote,
  size,
  theme,
}) => {
  return (
    <div
      className={cx(s.testimonialWrapper, {
        [s.darkWrapper]: theme === VisualTheme.DarkMode,
        [s.lightWrapper]: theme === VisualTheme.LightMode,
      })}
    >
      <div className={s.testimonialCardContainer}>
        <div className={cx(s.contentContainer, s[`${size}Container`])}>
          {imageUrl && (
            <div className={s.avatarContainer}>
              <Avatar
                src={imageUrl}
                alt={`Photo of ${name}`}
                theme={theme}
                className={cx({ [s.largeContainerAvatar]: size === 'large' })}
              />
            </div>
          )}
          <div className={s.bylineContainer}>
            <Byline name={name} occupation={occupation} />
          </div>
          <div className={s.quoteContainer}>
            <Quote text={quote} theme={theme} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Testimonial;
