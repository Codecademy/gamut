import { Notification } from '@codecademy/gamut';

export const clearAllNotifications = async (baseUrl: string) => {
  return await fetch(`${baseUrl}/notifications?target=web`, {
    method: 'DELETE',
  });
};

type NotificationsResponseBody = {
  events: Notification[];
};

export const fetchAllNotifications = async (baseUrl: string) => {
  const response = await fetch(`${baseUrl}/notifications?target=web`);
  const {
    events: notifications = [],
  } = (await response.json()) as NotificationsResponseBody;

  return notifications;
};

export const markNotificationsRead = async (baseUrl: string, ids: string[]) => {
  if (!ids.length) {
    return;
  }

  return await fetch(`${baseUrl}/notifications?ids=${ids.join(',')}`, {
    body: JSON.stringify({
      status: 0,
    }),
    method: 'PATCH',
  });
};
