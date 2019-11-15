import { Banner } from 'gamut';
import React from 'react';
import { BannerStyle } from 'gamut/Banner';
import { AlertIcon } from '@codecademy/gamut-icons';
import styles from './Banner-story.scss';

export default {
  component: Banner,
  title: 'Component/Banner',
};

export const defaultBannerFullWidth = () => (
  <Banner>Some Banner content!</Banner>
);

defaultBannerFullWidth.story = {
  name: 'Default Banner (Full Width)',
};

export const defaultBannerWithIconFullWidth = () => (
  <Banner icon={<AlertIcon className={styles.icon} />}>
    Some Banner content!
  </Banner>
);

defaultBannerWithIconFullWidth.story = {
  name: 'Default Banner with Icon (Full Width)',
};

export const BannerWithBottomBorder = () => (
  <Banner displayStyle={BannerStyle.BorderBottom}>Some Banner content!</Banner>
);

BannerWithBottomBorder.story = {
  name: 'Banner with Bottom Border',
};
