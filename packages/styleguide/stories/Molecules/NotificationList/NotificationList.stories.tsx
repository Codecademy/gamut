import { NotificationList } from '@codecademy/gamut/src';
import moment from 'moment';
import React from 'react';

import {
  StoryDescription,
  StoryStatus,
  StoryTemplate,
  decoratedStory,
} from '../../Templating';
import styles from './styles.module.scss';
import { withKnobs } from '@storybook/addon-knobs';

export default {
  title: 'Core|Molecules/NotificationList',
  component: NotificationList,
  decorators: [withKnobs],
};

export const notificationList = decoratedStory(() => (
  <StoryTemplate status={StoryStatus.InProgress}>
    <StoryDescription>
      List of time-sensitive user notifications, such as in a top-right dropdown
      menu from a header.
    </StoryDescription>
    <NotificationList
      notifications={[]}
      className={styles.notificationContainer}
    />
    <NotificationList
      className={styles.notificationContainer}
      notifications={[
        {
          campaign: 'python-livestream',
          date: moment()
            .subtract(1, 'hours')
            .format('MMMM DD YYYY h:mm:ss'),
          iconSettings: {
            color: '#3069f0',
            backgroundColor: '#ffd500',
          },
          iconSlug: 'python',
          id: 'abc',
          link:
            'https://www.codecademy.com/courses/livestreams/projects/livestream-intro-to-statistics-in-python',
          text: 'Check out our Python livestream!',
          unread: true,
        },
        {
          campaign: 'pro-trial',
          date: moment()
            .subtract(3, 'days')
            .format('MMMM DD YYYY h:mm:ss'),
          id: '123',
          imageUrl: 'https://bit.ly/2Ckp4eW',
          link:
            'https://www.codecademy.com/subscriptions/proSixMonthV2a/checkout',
          text:
            "It's your last day of Pro Trial! Sign up with Codecademy Pro to get helpful features like quizzes and projects and practice on the Codecademy Go mobile app!",
        },
      ]}
    />
  </StoryTemplate>
));
