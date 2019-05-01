import React, { ReactNode } from 'react';
import cx from 'classnames';
import Icon from '../Icon';
import CardShell from './CardShell';
import CardEyebrow from './CardEyebrow';
import styles from './styles/IconCard.scss';

interface IconCardProps {
  eyebrow?: {
    iconName: string;
    leftText: string;
    rightText: string;
  };
  header: {
    backgroundColor?: string;
    backgroundGradient?: {
      start: string;
      end: string;
    };
    iconName: string; // may have to pass this in :shrug:
    iconColor: string;
    withWave?: boolean;
  };
  title: string;
  description: string;
  primaryButton?: IconCardButton;
  secondaryButton?: IconCardButton;
}

interface IconCardButton {
  icon: ReactNode;
  title: string;
  action: () => void;
  withArrow: boolean;
}

function IconCard(props: IconCardProps) {
  function renderButton(buttonProps: IconCardButton) {
    return (
      <button
        className={cx(styles.buttonContainer, styles.displayHorizontal)}
        onClick={buttonProps.action}
      >
        {buttonProps.icon}
        <div className={styles.displayHorizontal}>
          <div className={styles.buttonTitle}>{buttonProps.title}</div>
          {buttonProps.withArrow && (
            <div className={styles.buttonArrow}>
              <Icon name="chevronRight" size={22} />
            </div>
          )}
        </div>
      </button>
    );
  }
  return (
    <div>
      <CardShell className={styles.container}>
        <div
          className={styles.header}
          style={{
            ...(props.header.backgroundColor && {
              background: props.header.backgroundColor,
            }),
            ...(props.header.backgroundGradient && {
              background: `linear-gradient(0deg, ${
                props.header.backgroundGradient.start
              } 0%, ${props.header.backgroundGradient.end} 100%)`,
            }),
          }}
        >
          <CardEyebrow
            iconName="lesson"
            leftText="lesson"
            rightText="30 min"
            iconColor={props.header.backgroundColor}
          />
          <div className={styles.headerIcon}>
            <Icon
              name={props.header.iconName}
              size={72}
              color={props.header.iconColor}
            />
          </div>
          {props.header.withWave && (
            <div className={styles.waveContainer}>
              <svg width="343" height="25">
                <path
                  d="M0 24.856v-7.684c3.227 3.632 14.122 5.448 32.687 5.448C60.534 22.62 66.297 0 104.611 0c38.315 0 46.992 22.62 80.55 22.62 33.56 0 40.78-21.939 77.914-21.939s42.72 24.175 79.536 24.175H0z"
                  fill="#FFFFFF"
                  fillRule="evenodd"
                />
              </svg>
            </div>
          )}
        </div>
        <div className={styles.contentContainer}>
          <h3 className={styles.title}>{props.title}</h3>
          <p className={styles.description}>{props.description}</p>
        </div>
        {props.primaryButton && renderButton(props.primaryButton)}
        {props.secondaryButton && renderButton(props.secondaryButton)}
      </CardShell>
      <div className={styles.stack} />
    </div>
  );
}

export default IconCard;
