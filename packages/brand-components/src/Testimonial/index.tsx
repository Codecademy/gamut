import React from 'react';
import { Avatar, Byline, Quote } from '../index';
import { VisualTheme } from '@codecademy/gamut';
import cx from 'classnames';

import s from './styles.module.scss';

type TestimonialContent = {
  name: string;
  occupation: string;
  imageUrl?: string;
  quote: string;
};

type TestimonialProps = {
  testimonial?: TestimonialContent;
  size: 'small'; // TODO: 'medium' and 'large'
  theme: VisualTheme;
};

export const Testimonial: React.FC<TestimonialProps> = ({
  testimonial,
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
        <div
          className={cx(s.contentContainer, s[`${size}Container`], {
            [s.darkContainer]: theme === VisualTheme.DarkMode,
            [s.lightContainer]: theme === VisualTheme.LightMode,
          })}
        >
          <div className={s.avatarContainer}>
            <Avatar
              src={testimonial.imageUrl}
              alt={`Photo of ${testimonial.name}`}
              theme={theme}
            />
          </div>
          <div className={cx(s.bylineContainer, s[`${size}Byline`])}>
            <Byline
              name={testimonial.name}
              occupation={testimonial.occupation}
            />
          </div>
          <div className={s.quoteContainer}>
            <Quote text={testimonial.quote} theme={theme} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Testimonial;
