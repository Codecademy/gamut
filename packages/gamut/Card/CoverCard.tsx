import React from 'react';
import { CardShell, CardHeader } from './index';
import styles from './styles/CoverCard.scss';

interface CoverCardProps {
  withWave?: boolean;
  withStack?: boolean;
  eyebrow?: JSX.Element;
  headerClassName?: string;
  headerChildren?: JSX.Element;
  contentChildren?: JSX.Element;
  footerChildren?: JSX.Element;
}

function CoverCard(props: CoverCardProps) {
  return (
    <CardShell className={styles.coverCardContainer}>
      <CardHeader withWave={props.withWave} className={props.headerClassName}>
        {props.eyebrow}
        {props.contentChildren}
      </CardHeader>
      {props.footerChildren}
    </CardShell>
  );
}

export default CoverCard;
