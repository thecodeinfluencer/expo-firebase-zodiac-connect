import React, { useEffect, useState } from 'react';
import {
  Dimensions, ImageBackground, ScrollView, StyleSheet
} from 'react-native';
import { Colors } from 'react-native-paper';
import Screen from '../../components/Screen';
import AppText from '../../fragments/AppText';

export default function ZodiacDescriptionScreen({ route }) {
  const [daily, setDaily] = useState({});

  const { label, period, image } = route.params;

  useEffect(() => {
    fetch(`https://aztro.sameerkumar.website/?sign=${label}&day=today`, {
      method: 'POST',
    })
      .then(res => res.json())
      .then(data => {
        setDaily(data);
      })
      .catch(err => {
        console?.log({ err });
      });
  }, []);

  return (
    <Screen disableHorizontalPadding title={label}>
      <ImageBackground
        source={{
          uri: image,
        }}
        style={styles.image}
      >
        <AppText style={styles.date}>{period}</AppText>
      </ImageBackground>
      <ScrollView>
        <AppText style={styles.title}>{label}</AppText>
        <AppText style={styles.desc}>{daily?.description}</AppText>
      </ScrollView>
    </Screen>
  );
}

const styles = StyleSheet.create({
  image: {
    width: '100%',
    height: Dimensions.get('window').height / 3.5,
    backgroundColor: Colors.black + '99',
    backgroundBlendMode: 'soft-light',
    justifyContent: 'flex-end',
  },
  date: {
    padding: 16,
    fontSize: 20,
    color: Colors.white,
  },
  title: {
    padding: 16,
    fontSize: 20,
  },
  desc: {
    paddingHorizontal: 16,
    fontSize: 16,
  },
});
