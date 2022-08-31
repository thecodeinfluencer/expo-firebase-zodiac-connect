import React from 'react';
import { Dimensions, View, StyleSheet } from 'react-native';

const SCREEN_WIDTH = Dimensions.get('screen').width;

export default function CircleGraphic() {
  return <View style={styles.circle} />;
}

const styles = StyleSheet.create({
  circle: {
    position: 'absolute',
    backgroundColor: '#6200ee',
    height: SCREEN_WIDTH * 2,
    width: SCREEN_WIDTH * 2,
    borderRadius: SCREEN_WIDTH,
    top: -(Dimensions.get('screen').height * 0.4),
    right: -(SCREEN_WIDTH * 0.3),
  },
});
