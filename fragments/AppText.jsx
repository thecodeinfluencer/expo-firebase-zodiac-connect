import React from 'react';
import { StyleSheet, Text } from 'react-native';

export default function AppText({ style, children }) {
  return <Text style={[styles.text, style]}>{children}</Text>;
}

const styles = StyleSheet.create({
  text: {
    fontFamily: 'Nunito',
  },
});
