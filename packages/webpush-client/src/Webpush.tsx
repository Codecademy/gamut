import 'firebase/messaging';

import firebase from 'firebase/app';
import React from 'react';

const firebaseInstance = firebase.initializeApp({
  apiKey: 'AIzaSyB8tgEIT0XyekbN16Jj9GNCJNHqDD0Dwjk',
  authDomain: 'test-6d14f.firebaseapp.com',
  projectId: 'test-6d14f',
  storageBucket: 'test-6d14f.appspot.com',
  messagingSenderId: '149303097575',
  appId: '1:149303097575:web:db8588938667a030caca42',
  measurementId: 'G-DQFSL3TWP6',
});

const Webpush: React.FC = () => {
  useEffect(() => {
    Notification.requestPermission()
      .then(async function () {
        const token = await messaging.getToken(
          'BEDDRXxlIaF_sQq7AnF_Lv2EF9p-oUaYsdJgOD0FShn5kybvRD8NlxJE6C8yxMXrjLEpCKeNDfhqknW8uJpVjdIs'
        );
        messaging.onMessage((message) => {
          console.log(message);
        });

        navigator.serviceWorker.ready.then(function (registration) {
          console.log('This runs');
          registration.showNotification('Vibration Sample', {
            body: 'Buzz! Buzz!',
            icon: '../images/touch/chrome-touch-icon-192x192.png',
            vibrate: [200, 100, 200, 100, 200, 100, 200],
            tag: 'vibration-sample',
          });
        });
      })
      .catch(function (err) {
        console.log('Unable to get permission to notify.', err);
      });
  }, []);
};
