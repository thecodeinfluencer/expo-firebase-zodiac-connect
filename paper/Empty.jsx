import React from 'react';
import { StyleSheet, View } from 'react-native';
import { IconButton } from 'react-native-paper';
import AppText from '../fragments/AppText';

export default function Empty({ label }) {
  return (
    <View style={styles.root}>
      <IconButton color='#999' size={36} icon='file' />
      <AppText style={styles.text}>{label || 'Nothing Here Yet'}</AppText>
    </View>
  );
}

const styles = StyleSheet.create({
  root: {
    height: 200,
    alignItems: 'center',
    justifyContent: 'center',
  },
  text: {
    fontSize: 20,
    color: '#999',
  },
});
