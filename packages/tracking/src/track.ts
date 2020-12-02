/* eslint-disable no-console */
import type {
  TrackingOptions,
  EventDataTypes,
  UserClickData,
  UserVisitData,
} from './types';

export const createTracker = (
  apiBaseUrl: string,
  authToken: string,
  verbose = false
) => {
  const beacon = (endpoint: string, data: Record<string, string>) => {
    const uri = new URL(endpoint, apiBaseUrl);
    const searchParams = new URLSearchParams(uri.search);
    searchParams.set('authentication_token', authToken);
    uri.search = searchParams.toString();
    const form = new FormData();
    for (const [k, v] of Object.entries(data)) {
      form.append(k, v.toString());
    }

    navigator.sendBeacon(uri.toString(), form);
  };

  const event = <
    Category extends keyof EventDataTypes,
    Event extends string & keyof EventDataTypes[Category],
    Data extends EventDataTypes[Category][Event]
  >(
    category: Category,
    event: Event,
    userData: Data,
    options: TrackingOptions = {}
  ) => {
    const properties = {
      ...userData,
      fullpath: window.location.pathname + window.location.search,
      search: window.location.search,
      path: window.location.pathname,
      title: window.document.title,
      url: window.location.href,
    };

    if (verbose) {
      console.groupCollapsed(
        `%cTracking Event Fired: ${category}:${event}`,
        'color: #4b35ef; font-style: italic;'
      );
      console.log({
        category,
        event,
        properties,
      });
      console.groupEnd();
    }

    // This allows the UTM query params to get registered in the user session.
    const queryParams = window.location.search;
    beacon(`/analytics/${category}${queryParams}`, {
      category,
      event,
      properties: JSON.stringify(properties),
      gdpr_safe: `${options.gdprSafe}`,
    });
  };

  return {
    event,
    click: (data: UserClickData) => event('user', 'click', data),
    visit: (data: UserVisitData) => event('user', 'visit', data),
    pushDataLayerEvent: (eventName: string) => {
      // Set an arbitrary global property on the window variable.
      const w = window as any;
      if (w.dataLayer === undefined) {
        w.dataLayer = [];
      }

      w.dataLayer.push({ event: eventName });
    },
  };
};
