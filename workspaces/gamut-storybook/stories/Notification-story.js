import React from 'react';
import { storiesOf } from '@storybook/react';
import { withInfo } from '@storybook/addon-info';

import NotificationList from '@codecademy/gamut/NotificationList';

import { addonInfoOptions as options } from './options';

storiesOf('Component/NotificationList', module).add(
  'Notification Menu',
  withInfo({
    ...options,
  })(() => (
    <div>
      <NotificationList
        notifications={[
          {
            text: 'This cat is coming to your house.',
            imageUrl:
              'http://r.ddmcdn.com/s_f/o_1/cx_462/cy_245/cw_1349/ch_1349/w_720/APL/uploads/2015/06/caturday-shutterstock_149320799.jpg',
            date: '4 Mar, 2019 10:45',
            link: 'https://google.com',
          },
          {
            text:
              'Here is some longer text. I want to make sure it cuts off after a certain number of lines. Here is a cat. I love this cat. It is the best cat. Boop boop boop',
            imageUrl:
              'http://r.ddmcdn.com/s_f/o_1/cx_462/cy_245/cw_1349/ch_1349/w_720/APL/uploads/2015/06/caturday-shutterstock_149320799.jpg',
            date: '4 Mar, 2019 11:45',
            link: 'https://google.com',
          },
          {
            text: 'Random text 1.',
            imageUrl:
              'http://r.ddmcdn.com/s_f/o_1/cx_462/cy_245/cw_1349/ch_1349/w_720/APL/uploads/2015/06/caturday-shutterstock_149320799.jpg',
            date: '4 Mar, 2019 13:45',
            link: 'https://google.com',
          },
          {
            text: 'Random text 2.',
            imageUrl:
              'http://r.ddmcdn.com/s_f/o_1/cx_462/cy_245/cw_1349/ch_1349/w_720/APL/uploads/2015/06/caturday-shutterstock_149320799.jpg',
            date: '4 Mar, 2019 9:45',
            link: 'https://google.com',
          },
          {
            text: 'Random text 3.',
            imageUrl:
              'http://r.ddmcdn.com/s_f/o_1/cx_462/cy_245/cw_1349/ch_1349/w_720/APL/uploads/2015/06/caturday-shutterstock_149320799.jpg',
            date: '4 Mar, 2019 14:45',
            link: 'https://google.com',
            unread: true,
          },
          {
            text: 'The cat came to your house.',
            imageUrl:
              'http://r.ddmcdn.com/s_f/o_1/cx_462/cy_245/cw_1349/ch_1349/w_720/APL/uploads/2015/06/caturday-shutterstock_149320799.jpg',
            date: '4 Mar, 2019 12:45',
            link: 'https://google.com',
          },
        ]}
      />
    </div>
  ))
);
