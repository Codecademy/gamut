import React from 'react';
import Alert from '../../../../gamut/src/Alert';
import { LayoutGrid, Column } from '../../../../gamut/src/Layout';
import {
  decoratedStory,
  StoryTemplate,
  StoryStatus,
  StoryDescription,
} from '../../Templating';
import { BannerType } from '@codecademy/gamut/src/Alert/constants';
import { withKnobs } from '@storybook/addon-knobs';

export default {
  title: 'Gamut|Molecules/Alert',
  component: Alert,
  decorators: [withKnobs],
};

export const alert = decoratedStory(() => (
  <LayoutGrid rowGap="xl">
    <Column size={12}>
      <StoryTemplate status={StoryStatus.Ready}>
        <StoryDescription>
          Alerts can be used to asynchronously display feedback or interactions
          with the user with various connotations.
        </StoryDescription>
      </StoryTemplate>
    </Column>

    <Column size={12}>
      <h3>Feedback Alert</h3>

      <p>
        Serves as <strong>feedback</strong> and confirmation that requires an
        action.
      </p>
      <h6>Informational/general feedback</h6>
      <Alert
        showIcon
        type={BannerType.Info}
        cta={{ text: 'Login', onClick: () => {} }}
        onClose={() => {}}
      >
        You have been logged out due to inactivity.
      </Alert>
    </Column>
    <Column size={12}>
      <h6>Successful actions</h6>
      <Alert
        showIcon
        type={BannerType.Success}
        cta={{ text: 'view account', onClick: () => {} }}
        onClose={() => {}}
      >
        Your account changes were saved successfully.
      </Alert>
    </Column>
    <Column size={12}>
      <h6>
        Error communicating an issue or showing that a user’s action can’t be
        completed.
      </h6>
      <Alert
        showIcon
        type={BannerType.Error}
        cta={{ text: 'retry', onClick: () => {} }}
        onClose={() => {}}
      >
        Couldn’t save your account changes because a connection to the server
        can’t be made.
      </Alert>
    </Column>
    <Column size={12}>
      <h3>Notice Alert</h3>
      <p>
        Only shown when it affects the entire system. It appears on all pages
        without user initiating the action.
      </p>
      <Alert
        showIcon
        type={BannerType.Notice}
        cta={{ text: 'Learn More', onClick: () => {} }}
        onClose={() => {}}
      >
        Maintenance: Codecademy will be offline between 02:00 AM and 08:00 AM
        EST for system updates.
      </Alert>
    </Column>
    <Column size={12}>
      <h3>Announcement Alert</h3>
      <p>For feature announcements/changes on a specific page.</p>
      <Alert
        showIcon
        type={BannerType.Announcement}
        cta={{ text: 'Learn More', onClick: () => {} }}
        onClose={() => {}}
      >
        You can now do this new thing with this new feature we just added!
      </Alert>
    </Column>
  </LayoutGrid>
));

export const basicAlert = decoratedStory(() => {
  return (
    <Alert showIcon={false} type={BannerType.Notice} onClose={() => {}}>
      Lorem ipsum dolor sit amet, blandit detracto vis an, purto latine
      torquatos eam ut.
    </Alert>
  );
});

export const iconAlert = decoratedStory('Status Icon', () => {
  return (
    <Alert type={BannerType.Notice} onClose={() => {}}>
      Lorem ipsum dolor sit amet, blandit detracto vis an, purto latine
      torquatos eam ut.
    </Alert>
  );
});

export const ctaAlert = decoratedStory('Call to Action', () => {
  return (
    <Alert
      showIcon={false}
      type={BannerType.Notice}
      cta={{
        href: 'https://google.com',
        onClick: () => {},
        text: 'Click Me',
      }}
      onClose={() => {}}
    >
      Lorem ipsum dolor sit amet, blandit detracto vis an, purto latine
      torquatos eam ut.
    </Alert>
  );
});

export const expandableAlert = decoratedStory('Expandable', () => {
  return (
    <Alert
      showIcon={false}
      type={BannerType.Notice}
      lines={1}
      onClose={() => {}}
    >
      Lorem ipsum dolor sit amet, blandit detracto vis an, purto latine
      torquatos eam ut. Dicta dolores adversarium mei in. Ius ei ridens mentitum
      consequat. Amet intellegam in nec. Pro duis novum ludus ad.
    </Alert>
  );
});

export const everythingAlert = decoratedStory('Everything', () => {
  return (
    <Alert
      type={BannerType.Notice}
      cta={{
        href: 'https://google.com',
        onClick: () => {},
        text: 'Click Me',
      }}
      lines={1}
      onClose={() => {}}
    >
      Lorem ipsum dolor sit amet, blandit detracto vis an, purto latine
      torquatos eam ut. Dicta dolores adversarium mei in. Ius ei ridens mentitum
      consequat. Amet intellegam in nec. Pro duis novum ludus ad.
    </Alert>
  );
});
