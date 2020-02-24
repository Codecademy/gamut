import React from 'react';
import { Avatar, Byline, Quote } from '../index';
import { BylineClassNamesProps } from '../Byline';

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
  bylineClassNames?: BylineClassNamesProps;
};

export const Testimonial: React.FC<TestimonialProps> = ({
  testimonial,
  size,
  theme,
  bylineClassNames,
}) => {
  return (
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
      <div className={s.bylineContainer}>
        <Byline
          name={testimonial.name}
          occupation={testimonial.occupation}
          classNames={bylineClassNames}
        />
      </div>
      <div className={s.quoteContainer}>
        <Quote text={testimonial.quote} theme={theme} />
      </div>
    </div>
  );
};

export default Testimonial;
