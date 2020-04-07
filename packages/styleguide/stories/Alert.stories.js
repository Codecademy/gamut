import React from 'react';
import Alert from '../../gamut-templates/src/Alert';
import { LayoutGrid, Column } from '../../gamut/src/Layout';

export default {
  component: Alert,
  title: 'Templates/Alert',
};

export const alert = () => (
  <LayoutGrid rowGap="xl">
    <Column size="12">
      <h3>Feedback Alert</h3>
      <p>
        Serves as <strong>feedback</strong> and confirmation that requires an
        action.
      </p>
      <h6>Informational/general feedback</h6>
      <Alert showIcon type="info" cta={{ text: 'Login' }}>
        You have been logged out due to inactivity.
      </Alert>
    </Column>
    <Column size="12">
      <h6>Successful actions</h6>
      <Alert showIcon type="success" cta={{ text: 'view account' }}>
        Your account changes were saved successfully.
      </Alert>
    </Column>
    <Column size="12">
      <h6>
        Error communicating an issue or showing that a user’s action can’t be
        completed.
      </h6>
      <Alert showIcon type="error" cta={{ text: 'retry' }}>
        Couldn’t save your account changes because a connection to the server
        can’t be made.
      </Alert>
    </Column>
    <Column size="12">
      <h3>Notice Alert</h3>
      <p>
        Only shown when it affects the entire system. It appears on all pages
        without user initiating the action.
      </p>
      <Alert showIcon type="notice" cta={{ text: 'Learn More' }}>
        Maintenance: Codecademy will be offline between 02:00 AM and 08:00 AM
        EST for system updates.
      </Alert>
    </Column>
    <Column size="12">
      <h3>Announcement Alert</h3>
      <p>For feature announcements/changes on a specific page.</p>
      <Alert showIcon type="announcement" cta={{ text: 'Learn More' }}>
        You can now do this new thing with this new feature we just added!
      </Alert>
    </Column>
  </LayoutGrid>
);

alert.story = {
  name: 'General status Alerts',
};

export const baseAlert = () => {
  return (
    <Alert showIcon={false} type="notice">
      Lorem ipsum dolor sit amet, blandit detracto vis an, purto latine
      torquatos eam ut.
    </Alert>
  );
};

baseAlert.story = {
  name: 'Basic Alert',
};

export const iconAlert = () => {
  return (
    <Alert type="notice">
      Lorem ipsum dolor sit amet, blandit detracto vis an, purto latine
      torquatos eam ut.
    </Alert>
  );
};

iconAlert.story = {
  name: 'Status Icon',
};

export const ctaAlert = () => {
  return (
    <Alert
      showIcon={false}
      type="notice"
      cta={{
        href: 'https://google.com',
        onClick: () => alert('You clicked me, thank you'),
        text: 'Click Me',
      }}
    >
      Lorem ipsum dolor sit amet, blandit detracto vis an, purto latine
      torquatos eam ut.
    </Alert>
  );
};

ctaAlert.story = {
  name: 'Call to Action',
};

export const expandableAlert = () => {
  return (
    <Alert showIcon={false} type="notice" lines={1}>
      Lorem ipsum dolor sit amet, blandit detracto vis an, purto latine
      torquatos eam ut. Dicta dolores adversarium mei in. Ius ei ridens mentitum
      consequat. Amet intellegam in nec. Pro duis novum ludus ad.
    </Alert>
  );
};

expandableAlert.story = {
  name: 'Expandable',
};

export const everythingAlert = () => {
  return (
    <Alert
      type="notice"
      cta={{
        href: 'https://google.com',
        onClick: () => alert('You clicked me, thank you'),
        text: 'Click Me',
      }}
      lines={1}
    >
      Lorem ipsum dolor sit amet, blandit detracto vis an, purto latine
      torquatos eam ut. Dicta dolores adversarium mei in. Ius ei ridens mentitum
      consequat. Amet intellegam in nec. Pro duis novum ludus ad.
    </Alert>
  );
};

everythingAlert.story = {
  name: 'Everthying',
};
