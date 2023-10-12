import { useEffect, useState } from 'react';

export interface WebUserRoles {
  author?: boolean;
  admin?: boolean;
  pro?: boolean;
}

export interface WebUser {
  roles: WebUserRoles;
}

const storageKey = 'figma-embed-key';

export const useCollapseFigmaEmbed = () => {
  const [preference, setPreference] = useState(
    globalThis.localStorage?.getItem(storageKey)
  );
  const [user, setUser] = useState<WebUser>();

  // 1. If we stored a preference, use that
  // 2. If a user was loaded, collapse unless they're an admin
  // 3. Otherwise, don't collapse (we're in loading state, so assume a Codecademite)
  const defaultCollapsed = preference
    ? JSON.parse(preference)
    : user
    ? !user.roles.admin
    : false;

  const savePreference = (newPreference: boolean) => {
    const preferenceValue = JSON.stringify(newPreference);
    localStorage.setItem(storageKey, preferenceValue);
    setPreference(preferenceValue);
  };

  useEffect(() => {
    if (preference) {
      return;
    }

    if (user) {
      savePreference(defaultCollapsed);
      return;
    }

    const abortController = new AbortController();

    fetch('https://codecademy.com/users/web', {
      signal: abortController.signal,
    })
      .then(async (response) => setUser(await response.json()))
      .catch(console.warn.bind(console, 'Error loading /users/web:'));

    return () => abortController.abort();
  }, [user]);

  return { defaultCollapsed, savePreference };
};
