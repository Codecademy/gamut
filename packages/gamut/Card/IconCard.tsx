import React from 'react';
import iconMap from '../Icon/iconMap';
import CardShell from './CardShell';
import CardEyebrow from './CardEyebrow/index';
import CardHeader from './CardHeader/index';
import CardContent from './CardContent/index';
import CardButton from './CardButton/index';
import CardStack from './CardStack/index';
import { CardButton as CardButtonType } from './types';
import styles from './styles/IconCard.scss';

interface IconCardProps {
  eyebrow?: {
    iconName: keyof typeof iconMap;
    leftText: string;
    rightText: string;
  };
  header: {
    backgroundColor?: string;
    backgroundGradient?: {
      start: string;
      end: string;
    };
    iconName: keyof typeof iconMap;
    iconColor: string;
    withWave?: boolean;
  };
  title: string;
  description: string;
  primaryButton?: CardButtonType;
  withStack?: boolean;
}

function IconCard(props: IconCardProps) {
  return (
    <div className={styles.container}>
      <CardShell className={styles.iconCardContainer}>
        <CardHeader
          backgroundColor={props.header.backgroundColor}
          iconName={props.header.iconName}
          iconColor={props.header.iconColor}
          withWave={props.header.withWave}
        >
          <CardEyebrow
            iconName={props.eyebrow.iconName}
            leftText={props.eyebrow.leftText}
            rightText={props.eyebrow.rightText}
            iconColor={props.header.backgroundColor}
          />
        </CardHeader>
        <CardContent title={props.title} description={props.description} />
        <CardButton {...props.primaryButton} />
      </CardShell>
      {props.withStack && <CardStack />}
    </div>
  );
}

export default IconCard;
