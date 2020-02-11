import { Banner } from '../../gamut/src';
import React from 'react';
import { BannerStyle } from '../../gamut/src/Banner';
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
  name: 'Banner',
};

export const defaultBannerWithIconFullWidth = () => (
  <Banner icon={<AlertIcon className={styles.icon} />}>
    Some Banner content!
  </Banner>
);

defaultBannerWithIconFullWidth.story = {
  name: 'With Icon (Full Width)',
};

export const BannerWithBottomBorder = () => (
  <Banner displayStyle={BannerStyle.BorderBottom}>Some Banner content!</Banner>
);

BannerWithBottomBorder.story = {
  name: 'With Bottom Border',
};
