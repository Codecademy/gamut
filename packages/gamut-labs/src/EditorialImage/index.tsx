import * as React from 'react';

// eslint-disable-next-line gamut/no-css-standalone
import styles from './styles.module.scss';

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
    <div className={styles.imageContainer}>
      <img className={styles.image} alt={alt} src={image} />
    </div>
    {caption && <span className={styles.caption}>{caption}</span>}
  </div>
);
