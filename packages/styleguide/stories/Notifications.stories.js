import React from 'react';
import Notification from '../../gamut-templates/src/Notification';
import { LayoutGrid, Column } from '@codecademy/gamut';

export default {
  component: Notification,
  title: 'Templates/Notification',
};

export const notification = () => (
  <LayoutGrid rowGap="xl">
    <Column size="12">
      <h3>Feedback Notification</h3>
      <p>
        Serves as <strong>feedback</strong> and confirmation that requires an
        action.
      </p>
      <h6>Informational/general feedback</h6>
      <Notification showIcon type="info" cta={{ text: 'Login' }}>
        You have been logged out due to inactivity.
      </Notification>
    </Column>
    <Column size="12">
      <h6>Successful actions</h6>
      <Notification showIcon type="success" cta={{ text: 'view account' }}>
        Your account changes were saved successfully.
      </Notification>
    </Column>
    <Column size="12">
      <h6>
        Error communicating an issue or showing that a user’s action can’t be
        completed
      </h6>
      <Notification showIcon type="error" cta={{ text: 'retry' }}>
        Couldn’t save your account changes because a connection to the server
        can’t be made.
      </Notification>
    </Column>
    <Column size="12">
      <h3>Alert Notification</h3>
      <p>
        Only shown when it affects the entire system. It appears on all pages
        without user initiating the action.
      </p>
      <Notification showIcon type="alert" cta={{ text: 'Learn More' }}>
        Maintenance: Codecademy will be offline between 02:00 AM and 08:00 AM
        EST for system updates.
      </Notification>
    </Column>
    <Column size="12">
      <h3>Announcement Notification</h3>
      <p>For feature announcements/changes on a specific page.</p>
      <Notification showIcon type="announcement" cta={{ text: 'Learn More' }}>
        You can now do this new thing with this new feature we just added!
      </Notification>
    </Column>
  </LayoutGrid>
);

notification.story = {
  name: 'Quote with light theme',
};
