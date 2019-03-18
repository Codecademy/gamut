import React from 'react';
import { storiesOf } from '@storybook/react';
import { withInfo } from '@storybook/addon-info';

import NotificationList from '@codecademy/gamut/NotificationList';

import moment from 'moment';
import { addonInfoOptions as options } from './options';
import s from './Notification-story.scss';

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
            date: moment()
              .subtract(1, 'hours')
              .format('MMMM DD YYYY h:mm:ss'),
            link:
              'https://www.codecademy.com/courses/livestreams/projects/livestream-intro-to-statistics-in-python',
            unread: true,
            id: 'abc',
          },
          {
            text:
              "It's your last day of Pro Trial! Sign up with Codecademy Pro to get helpful features like quizzes and projects and practice on the Codecademy Go mobile app!",
            imageUrl: 'https://bit.ly/2Ckp4eW',
            date: moment()
              .subtract(3, 'days')
              .format('MMMM DD YYYY h:mm:ss'),
            link:
              'https://www.codecademy.com/subscriptions/proSixMonthV2a/checkout',
          },
        ]}
      />
    </div>
  ))
);
