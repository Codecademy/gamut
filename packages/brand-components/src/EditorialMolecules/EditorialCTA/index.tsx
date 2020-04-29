import React from 'react';
import { Button } from '@codecademy/gamut';
import s from './styles.module.scss';

export type EditorialCTAProps = {
  /** Section heading  */
  heading: string;
  /** Section description  */
  description: string;
  /** The text that will appear on the button  */
  callToAction: string;
  /** The URL the button will link to  */
  href: string;
  /** The onClick function that will be passed to the button  */
  onCTAClick: () => void;
};

export const EditorialCTA: React.FC<EditorialCTAProps> = ({
  heading,
  description,
  callToAction,
  href,
  onCTAClick,
}) => (
  <>
    <h2 className={s.heading}>{heading}</h2>
    <p className={s.description}>{description}</p>
    <Button
      theme="brand-yellow"
      round
      href={href}
      size="large"
      className={s.button}
      onClick={onCTAClick}
    >
      {callToAction}
    </Button>
  </>
);

export default EditorialCTA;
