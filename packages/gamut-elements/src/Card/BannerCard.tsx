import React, { ReactNode } from 'react';
import { CardShell, CardHeader, CardStack } from './index';
import styles from './styles/BannerCard.module.scss';

interface BannerCardProps {
  withStack?: boolean;
  eyebrow?: ReactNode;
  headerClassName?: string;
  headerChildren?: ReactNode;
  contentChildren?: ReactNode;
  footerChildren?: ReactNode;
}

export function BannerCard(props: BannerCardProps) {
  return (
    <CardShell className={styles.bannerCardContainer}>
      <CardHeader className={props.headerClassName}>
        {props.eyebrow}
        {props.headerChildren}
      </CardHeader>
      {props.contentChildren}
      {props.footerChildren}
      {props.withStack && <CardStack />}
    </CardShell>
  );
}

export default BannerCard;
