/* eslint-disable no-console */

import 'firebase/messaging';

import firebase from 'firebase/app';
import React, { useCallback, useEffect, useRef, useState } from 'react';

export interface FirebaseConfig {
  apiKey: string;
  authDomain: string;
  projectId: string;
  storageBucket: string;
  messagingSenderId: string;
  appId: string;
  measurementId: string;
}

export interface WebpushProps {
  config: FirebaseConfig;
  vapidKey: string;
  /** Determines if we request for permissions */
  requestPermission: boolean;
  /** Called on a succesful retrieval of a users token from firebase */
  onRegisterSuccess: (token?: string) => void;
  /** Called when a message has been recieved in the foreground instead of the background */
  onMessageRecieved: (message: unknown) => void;
}

export const Webpush: React.FC<WebpushProps> = ({
  vapidKey,
  config,
  requestPermission = false,
  onRegisterSuccess = () => {},
  onMessageRecieved = () => {},
}) => {
  const appRef = useRef<firebase.app.App>();
  const messagingRef = useRef<firebase.messaging.Messaging>();
  const [initialized, setInitialized] = useState(false);
  const [userToken, setUserToken] = useState<string>();

  const shouldRequestPermision = requestPermission && initialized;

  const getUserPermissions = useCallback(() => {
    Notification.requestPermission().then((permission) => {
      if (permission === 'granted' && messagingRef.current)
        messagingRef.current
          .getToken({ vapidKey })
          .then((token) => {
            console.log('User token retrieved:', token);
            setUserToken(token);
          })
          .catch((err) => {
            console.warn('Could not retrieve webpush token');
            return err;
          });
    });
  }, [messagingRef, vapidKey]);

  // We guard against possible reinitialization between HMR and reloading here.
  useEffect(() => {
    if (!vapidKey || !config) return;

    if (!appRef.current) {
      const instance = firebase.initializeApp(config);
      console.log('Firebase initialized', instance);
      appRef.current = instance;
    }

    if (!messagingRef.current) {
      const messaging = appRef.current.messaging();
      console.log('messaging initialized', messaging);

      // Listen for messages that were caught in the foreground
      messaging.onMessage((message) => {
        console.log('Webpush recieved in foreground', message);

        // handle extra foreground delivery events
        onMessageRecieved(message);
      });

      messagingRef.current = messaging;
    }

    setInitialized(true);
  }, [config, vapidKey, onMessageRecieved]);

  // Only attempt to request permission if we should
  useEffect(() => {
    if (shouldRequestPermision) {
      getUserPermissions();
    }
  }, [shouldRequestPermision, getUserPermissions]);

  // Handler the register success callback once if we have a token to send
  useEffect(() => {
    if (userToken) {
      // TODO: send user token `/api/users/registerBrowserToken`  https://api.iterable.com/api/docs#users_registerBrowserToken
      onRegisterSuccess(userToken);
    }
  }, [userToken, onRegisterSuccess]);

  return <></>;
};
