import React, { ReactNode } from 'react';
import { CardShell, CardHeader } from './index';
import styles from './styles/CoverCard.scss';

type CoverCardProps = {
  withWave?: boolean;
  withStack?: boolean;
  eyebrow?: ReactNode;
  headerClassName?: string;
  headerChildren?: ReactNode;
  contentChildren?: ReactNode;
  footerChildren?: ReactNode;
};

function CoverCard(props: CoverCardProps) {
  return (
    <CardShell className={styles.coverCardContainer}>
      <CardHeader className={props.headerClassName}>
        {props.eyebrow}
        {props.contentChildren}
      </CardHeader>
      {props.footerChildren}
    </CardShell>
  );
}

export default CoverCard;
