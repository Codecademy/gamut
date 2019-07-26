import React, { ReactNode } from 'react';
import { CardShell, CardHeader, CardStack } from './index';
import styles from './styles/BannerCard.scss';

type BannerCardProps = {
  withStack?: boolean;
  eyebrow?: ReactNode;
  headerClassName?: string;
  headerChildren?: ReactNode;
  contentChildren?: ReactNode;
  footerChildren?: ReactNode;
};

function BannerCard(props: BannerCardProps) {
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
