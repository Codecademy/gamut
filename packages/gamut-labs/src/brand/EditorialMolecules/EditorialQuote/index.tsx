import React from 'react';
import styles from './styles.module.scss';

export type EditorialQuoteProps = {
  quote: string;
};

export const EditorialQuote: React.FC<EditorialQuoteProps> = ({ quote }) => (
  <q className={styles.quote}>{quote}</q>
);
