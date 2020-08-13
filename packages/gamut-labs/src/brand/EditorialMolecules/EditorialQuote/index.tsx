import React from 'react';
import s from './styles.module.scss';

export type EditorialQuoteProps = {
  quote: string;
};

export const EditorialQuote: React.FC<EditorialQuoteProps> = ({ quote }) => (
  <q className={s.quote}>{quote}</q>
);
