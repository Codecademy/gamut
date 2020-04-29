import React from 'react';
import s from './styles.module.scss';

export type EditorialQuoteProps = {
  quote: string;
};

export const EditorialQuote: React.FC<EditorialQuoteProps> = ({ quote }) => (
  <div className={s.quoteContainer}>
    <div className={s.quote}>{quote}</div>
  </div>
);

export default EditorialQuote;
