# `@codecademy/webpush-client`

## Usage

```tsx
import { Webpush } from '@codecademy/webpush-client';

const config = {
  apiKey: 'API_KEY',
  authDomain: 'AUTH_DOMAIN',
  projectId: 'PROJECT_ID',
  storageBucket: 'STORAGE_BUCKET',
  messagingSenderId: 'SENDER_ID',
  appId: 'APP_ID',
  measurementId: 'MEASUREMENT_ID',
};

const App = () => {
  return (
    <div>
      <Webpush
        config={config}
        vapidKey="VAPID_KEY"
        shouldRequest
        onRegisterSuccess={(token) => {
          // handle registration sideffects
        }}
        onMessageRecieved={(foregroundMessage) => {
          // handle foreground message sideffects
        }}
      />
    </div>
  );
};
```

### Props

```tsx
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
  /** Sender Key */
  vapidKey: string;
  /** Determines if we request for permissions */
  requestPermission: boolean;
  /** Called on a succesful retrieval of a users token from firebase */
  onRegisterSuccess: (token?: string) => void;
  /** Called when a message has been recieved in the foreground instead of the background */
  onMessageRecieved: (message: unknown) => void;
}
```
