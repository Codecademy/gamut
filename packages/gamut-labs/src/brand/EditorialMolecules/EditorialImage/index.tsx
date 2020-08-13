import React from 'react';
import s from './styles.module.scss';

export type EditorialImageProps = {
  /** The URL used for the image src */
  image: string;
  /** Alternative text for the image  */
  alt: string;
  /** An optional caption that will display below the image  */
  caption?: string;
};

export const EditorialImage: React.FC<EditorialImageProps> = ({
  image,
  alt,
  caption,
}) => (
  <div>
    <div className={s.imageContainer}>
      <img className={s.image} alt={alt} src={image} />
    </div>
    {caption && <span className={s.caption}>{caption}</span>}
  </div>
);
