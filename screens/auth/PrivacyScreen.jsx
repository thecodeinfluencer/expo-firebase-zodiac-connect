import React from 'react';
import { WebView } from 'react-native-webview';

export default function PrivacyScreen() {
  return (
    <WebView
      source={{
        uri: 'https://www.freeprivacypolicy.com/live/c00eea04-f4ba-4526-a128-5ae21782932b',
      }}
    />
  );
}
