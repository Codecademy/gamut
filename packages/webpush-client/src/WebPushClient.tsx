/* eslint-disable no-console */

import 'firebase/messaging';

import firebase from 'firebase/app';
import React, { useCallback, useEffect, useMemo, useState } from 'react';

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
  messengerConfig: {
    workerName?: string;
    senderKey: string;
  };
  /** Determines if we request for permissions */
  prompt: boolean;
  /** Called on a succesful retrieval of a users token from firebase */
  onPromptReady: () => void;
  /** Called when a message has been recieved in the foreground instead of the background */
  onPermissionDenied: () => void;
  /** Called when a message has been recieved in the foreground instead of the background */
  onPermissionGranted: () => void;
  /** Called on a succesful retrieval of a users token from firebase */
  onTokenRecieved: (token?: string) => void;
  /** Called when a message has been recieved in the foreground instead of the background */
  onMessageRecieved: (message: unknown) => void;
}

const WEBPUSH_ENABLED =
  typeof Notification !== 'undefined' && 'serviceWorker' in navigator;

const registerWorker = (name?: string) => {
  return navigator.serviceWorker
    .register(`${name}.js`, {
      scope: './',
    })
    .catch((e) => {
      console.warn(
        `Failed to register service worker ${name}, using default:`,
        e
      );
      return undefined;
    });
};

export const WebPushClient: React.FC<WebpushProps> = ({
  messengerConfig,
  config,
  prompt = false,
  onPromptReady = () => {},
  onPermissionDenied = () => {},
  onPermissionGranted = () => {},
  onTokenRecieved = () => {},
  onMessageRecieved = () => {},
}) => {
  const firebaseApp = useMemo(() => {
    if (messengerConfig && config && WEBPUSH_ENABLED) {
      return firebase.apps.length > 0
        ? firebase.app()
        : firebase.initializeApp(config);
    }
  }, [messengerConfig, config]);
  const messaging = useMemo(() => firebaseApp?.messaging(), [firebaseApp]);
  const [initialized, setInitialized] = useState(false);

  /**
   * Register foreground message listener
   */
  useEffect(() => {
    if (messaging) {
      messaging.onMessage(onMessageRecieved);
      setInitialized(true);
    }
  }, [messaging, onMessageRecieved, setInitialized]);

  const canPrompt = initialized;

  /**
   * While messinging.getToken() will request permission if we do not have it yet
   * Controlling the flow of permissioning is important if we want to customize the experience.
   *
   * 1. If we do not have the correct permissions prompt the user to allow notifications
   * 2. If we still do not have permissions exit immediately.
   * 3. Request the token from firebase.
   */
  const getUserPermissions = useCallback(async () => {
    if (Notification.permission !== 'granted') {
      const updatedPermission = await Notification.requestPermission();
      if (updatedPermission === 'granted') {
        onPermissionGranted();
      } else {
        onPermissionDenied();
        return;
      }
    }
    const { senderKey, workerName } = messengerConfig;

    /**
     * 1. If we have a custom worker name, register it.
     * 2. Else use the default firebase-messaging-sw.js
     */
    const serviceWorkerRegistration = workerName
      ? await registerWorker(workerName)
      : undefined;

    // Get user device token and allow the user to do something with it.
    const token = await messaging?.getToken({
      vapidKey: senderKey,
      serviceWorkerRegistration,
    });
    onTokenRecieved(token);
  }, [
    messaging,
    messengerConfig,
    onTokenRecieved,
    onPermissionGranted,
    onPermissionDenied,
  ]);

  /**
   * Trigger our prompt flow
   * 1. Prompt if we can
   * 2. Otherwise trigger callback to let the parent component do something with that information
   */
  useEffect(() => {
    if (canPrompt && prompt) {
      getUserPermissions();
    } else if (canPrompt && !prompt) {
      onPromptReady();
    }
  }, [canPrompt, prompt, onPromptReady, getUserPermissions]);

  return <></>;
};
