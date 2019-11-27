import React from 'react';
import { withKnobs, select, boolean, text } from '@storybook/addon-knobs';
import {
  CardShell,
  CardBody,
  CardFooter,
  CardEyebrow,
  CardButton,
  CardContent,
  BannerCard,
  CoverCard,
} from 'gamut/Card';
import Icon from 'gamut/Icon';
import RadialProgress from 'gamut/RadialProgress';
import { colors } from 'gamut-styles/utils/variables';
import styles from './Card-story.scss';

const borderStyles = ['dashed', 'solid', 'none'];

const alignStyles = ['left', 'center', 'right'];

export default {
  component: CardShell,
  title: 'Component/Card',
  decorators: [withKnobs],
};

export const editable = () => (
  <CardShell
    hoverShadow={boolean('shell.hoverShadow', false)}
    standardWidth={boolean('shell.standardWidth', true)}
  >
    <CardBody standardPadding={boolean('body.standardPadding', true)}>
      <h3>Card Body</h3>
      <p>This is some body text</p>
      <p>Blah blah blurgha blurgha</p>
    </CardBody>
    <CardFooter
      border={select('footer.border', borderStyles)}
      align={select('footer.align', alignStyles)}
      flex={boolean('footer.flex', true)}
      standardPadding={boolean('footer.standardPadding', true)}
      standardHeight={boolean('footer.standardHeight', true)}
    >
      <span>&raquo;&nbsp;&nbsp;</span>
      <span>Footer Text</span>
      <span>&nbsp;&nbsp;&laquo;</span>
    </CardFooter>
  </CardShell>
);

export const bannerCard = () => (
  <div style={{ maxWidth: '22rem' }}>
    <BannerCard
      withStack={boolean('withStack', true)}
      eyebrow={
        <CardEyebrow
          iconName="lesson"
          leftText="Lesson"
          rightText="30 min"
          iconColor="salmon"
          isDarkTheme={boolean('CardEyebrow-isDarkTheme', false)}
          className={styles.eyebrow}
        />
      }
      headerClassName={styles.bannerCardHeader}
      headerChildren={
        <Icon
          name="react"
          size={90}
          color="white"
          style={{ position: 'absolute', bottom: '-20%', right: '12%' }}
        />
      }
      contentChildren={
        <CardContent
          title={text('CardContent-title', 'Inconceivable!')}
          description={text(
            'CardContent-description',
            'You keep using that word. I do not think it means what you think it means.'
          )}
          className={styles.bannerCardContent}
        />
      }
      footerChildren={
        <CardButton
          icon={<RadialProgress size={20} value={20} />}
          title={text('CardButton-title', 'Start')}
          action={() => {}}
          withArrow={boolean('CardButton-withArrow', true)}
        />
      }
    />
  </div>
);

export const coverCard = () => (
  <div style={{ maxWidth: '22rem' }}>
    <CoverCard
      headerClassName={styles.coverCardHeader}
      eyebrow={
        <CardEyebrow
          iconName="lesson"
          leftText="Project"
          rightText="1.5 hours"
          iconColor={colors.white}
          isDarkTheme={boolean('CardEyebrow-isDarkTheme', true)}
          className={styles.eyebrow}
        />
      }
      contentChildren={
        <CardContent
          title={text('CardContent-title', 'Inconceivable!')}
          description={text(
            'CardContent-description',
            'You keep using that word. I do not think it means what you think it means.'
          )}
          textClassName={styles.coverCardText}
        />
      }
      footerChildren={
        <CardButton
          icon={<RadialProgress size={20} value={20} />}
          title={text('CardButton-title', 'Start')}
          action={() => {}}
          withArrow={boolean('CardButton-withArrow', true)}
        />
      }
    />
  </div>
);
