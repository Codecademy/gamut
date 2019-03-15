import React from 'react';
import { storiesOf } from '@storybook/react';
import { withInfo } from '@storybook/addon-info';

import NotificationList from '@codecademy/gamut/NotificationList';

import { addonInfoOptions as options } from './options';
import s from './Notification-story.scss';

const HOUR = 60 * 60 * 1000;
const DAY = HOUR * 24;
const timeOptions = {
  weekday: 'long',
  year: 'numeric',
  month: 'long',
  day: 'numeric',
  hour: 'numeric',
  minute: 'numeric',
  second: 'numeric',
};

storiesOf('Component/NotificationList', module).add(
  'Notification Menu',
  withInfo({
    ...options,
  })(() => (
    <div>
      <NotificationList
        notifications={[]}
        className={s.notificationContainer}
      />
      <NotificationList
        className={s.notificationContainer}
        notifications={[
          {
            text: 'Check out our Python livestream!',
            iconSlug: 'python',
            iconSettings: {
              color: '#3069f0',
              backgroundColor: '#ffd500',
            },
            date: new Date(Date.now() - HOUR).toLocaleString(
              'en-GB',
              timeOptions
            ),
            link:
              'https://www.codecademy.com/courses/livestreams/projects/livestream-intro-to-statistics-in-python',
            unread: true,
            id: 'abc',
          },
          {
            text:
              "It's your last day of Pro Trial! Sign up with Codecademy Pro to get helpful features like quizzes and projects and practice on the Codecademy Go mobile app!",
            imageUrl: 'https://bit.ly/2Ckp4eW',
            date: new Date(Date.now() - 2 * DAY).toLocaleString(
              'en-GB',
              timeOptions
            ),
            link:
              'https://www.codecademy.com/subscriptions/proSixMonthV2a/checkout',
          },
        ]}
      />
    </div>
  ))
);
