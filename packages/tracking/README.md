# `@codecademy/tracking`

This package contains our user "telemetry" (tracking metrics such as `click` and `visit`) integrations that are shared across multiple web properties.
We've consolidated them here for a few reasons:

- To standardize APIs around events like tracking user clicks
- To make sure any third party integrations are CCPA & GDPR compliant
- Because this repository already has a sweet CI setup for previewing and auto-publishing new versions 😎

There are two kinds of tracking we package in this library:

- **Internal** tracking ([`createTracker`](#createTracker)): sent directly to our `/analytics/` endpoint
- **External** tracking ([`useTrackingIntegrations`](#useTrackingIntegrations)): scripts loaded via Google Tag Manager

## `createTracker`

Creates a "tracker" object that includes methods for user telemetry such as `click` and `visit`.

```ts
import { createTracker } from '@codecademy/tracking';

const tracker = createTracker('apiBaseUrl', 'authToken');
```

### Event Usage

#### `click`

Tracks that a user has clicked an element on the page.

```ts
tracker.click({
  page_name: 'my_page',
  target: 'my_button',
});
```

Calls to _`event`_ internally.

#### `visit`

Tracks that a user has visited a page or sub-page.

```ts
tracker.visit({
  page_name: 'my_page',
});
```

Calls to _`event`_ internally.

#### `event`

Generic event for any other event.
Events that are allowed to be used here are strongly typed in the `types.d.ts` file included in the package.

```ts
tracker.event('calendar', 'reminder', data);
```

### Miscellaneous Usage

#### `pushDataLayerEvent`

Adds a [GTM `dataLayer` event](https://developers.google.com/tag-manager/devguide) to the global `dataLayer` array.
If `dataLayer` does not exist, it will be created.

```ts
tracker.pushDataLayerEvent('user_sign_up');
```

## `initializeTrackingIntegrations`

> See [GDPR Compliance on Notion](https://www.notion.so/codecademy/GDPR-Compliance-141ebcc7ffa542daa0da56e35f482b41) for full docs on external tracking.

Starts the initialization process for our third-party integrations.

Integrations are loaded in an intentionally layered manner for CCPA/GDPR compliance:

1. Wait 1000ms to allow any other post-hydration logic to run first
2. Load in OneTrust's banner and wait for its `OptanonWrapper` callback
3. [Segment's copy-and-paste snippet](https://segment.com/docs/connections/sources/catalog/libraries/website/javascript/quickstart/#step-2-copy-the-segment-snippet) is run to load the Segment global library
4. Destination integrations for Segment are fetched
5. Those integrations are compared against the user's consent decisions into a list of allowed destinations
6. We load only those allowed destinations using Segment's `analytics.load`

```ts
import { initializeTrackingIntegrations } from '@codecademy/tracking';

setTimeout(() => {
  initializeTrackingIntegrations({
    onError: logger.error,
    production: true,
    scope: window,
    user: { email: 'my@email.com', id: 'my-user-id' },
    writeKey: 'my-segment-write-key',
  });
}, 1000);
```
