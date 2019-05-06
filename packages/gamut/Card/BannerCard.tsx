import React from 'react';
import { CardShell, CardHeader, CardStack } from './index';
import styles from './styles/BannerCard.scss';

interface BannerCardProps {
  withWave?: boolean;
  withStack?: boolean;
  eyebrow?: JSX.Element;
  headerClassName?: string;
  headerChildren?: JSX.Element;
  contentChildren?: JSX.Element;
  footerChildren?: JSX.Element;
}

function BannerCard(props: BannerCardProps) {
  return (
    <CardShell className={styles.bannerCardContainer}>
      <CardHeader withWave={props.withWave} className={props.headerClassName}>
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
