import { useNavigation } from '@react-navigation/native';
import React from 'react';
import { Dimensions, Image, StyleSheet, View } from 'react-native';
import { Card, Chip } from 'react-native-paper';
import AppText from '../fragments/AppText';

export default function ZodiacCard({ zodiac }) {
  const { label, period, image } = zodiac;
  const navigation = useNavigation();

  return (
    <Card
      onPress={() =>
        navigation.navigate('ZodiacDescription', {
          ...zodiac,
        })
      }
      mode='outlined'
      style={styles.root}
      theme={{ roundness: 8 }}
    >
      <Card.Content>
        <View style={styles.info}>
          <View>
            <AppText style={styles.name}>{label}</AppText>
            <Chip mode='outlined' style={styles.chip}>
              {period}
            </Chip>
          </View>
          <Image
            style={styles.image}
            source={{
              uri: image,
            }}
          />
        </View>
      </Card.Content>
    </Card>
  );
}

const styles = StyleSheet.create({
  root: {
    // width: (Dimensions.get('window').width - 40) / 2,
    marginBottom: 8,
  },
  name: {
    fontSize: 16,
    marginVertical: 8,
  },
  info: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  chip: {
    marginRight: 4,
  },
  image: {
    width: 70,
  },
});
