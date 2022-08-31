import React from 'react';
import { WebView } from 'react-native-webview';

export default function TermsScreen() {
  return (
    <WebView
      source={{
        uri: 'https://www.freeprivacypolicy.com/live/8e85cdf5-b01a-4b28-9de7-82ad3ccab5a3',
      }}
    />
  );
}
