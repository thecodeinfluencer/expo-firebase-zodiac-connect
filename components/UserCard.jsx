import { useNavigation } from '@react-navigation/native';
import React from 'react';
import { Dimensions, StyleSheet, View } from 'react-native';
import { Card, Chip } from 'react-native-paper';
import AppText from '../fragments/AppText';
import moment from 'moment';

export default function UserCard({ user }) {
  const { name, age = 25, zodiac = 'Aries', dob, picture } = user;
  const navigation = useNavigation();

  return (
    <Card
      onPress={() =>
        navigation.navigate('ViewProfile', {
          ...user,
        })
      }
      mode='outlined'
      style={styles.root}
      theme={{ roundness: 8 }}
    >
      <Card.Cover
        theme={{ roundness: 8 }}
        style={styles.image}
        source={{
          uri:
            picture ||
            'https://images.unsplash.com/photo-1518791841217-8f162f1e1131?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=800&q=60',
        }}
      ></Card.Cover>
      <Card.Content>
        <AppText style={styles.name}>{name}</AppText>
        <View style={styles.info}>
          <Chip mode='outlined' style={styles.chip}>
            {parseInt(moment(Date.now()).format('YYYY')) -
              parseInt(moment(dob).format('YYYY'))}{' '}
            yrs
          </Chip>
          <Chip style={styles.chip}>{zodiac}</Chip>
        </View>
      </Card.Content>
    </Card>
  );
}

const styles = StyleSheet.create({
  root: {
    width: (Dimensions.get('window').width - 40) / 2,
    marginBottom: 8,
  },
  name: {
    fontSize: 16,
    marginVertical: 8,
  },
  info: {
    display: 'flex',
    flexDirection: 'row',
  },
  chip: {
    marginRight: 4,
  },
  image: { height: 136 },
});
