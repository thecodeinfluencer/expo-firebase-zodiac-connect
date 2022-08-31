import { MaterialIcons as Icon } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import React from 'react';
import { ScrollView, StyleSheet, Text, View } from 'react-native';
import { Avatar, Chip, TouchableRipple } from 'react-native-paper';
import Screen from '../../components/Screen';
import AppText from '../../fragments/AppText';

export default function ViewProfileScreen({ route }) {
  const navigation = useNavigation();

  const {
    uid,
    name,
    zodiac = 'Aries',
    about,
    interests,
    given_name,
    picture,
  } = route.params;

  return (
    <Screen
      title={'View Profile'}
      screenParams={uid}
      headerRight={
        <TouchableRipple
          style={styles.ripple}
          onPress={() => {
            navigation.navigate('ChatScreen', {
              uid,
            });
          }}
          borderless
        >
          <Icon color={'#fff'} size={32} name='chat' />
        </TouchableRipple>
      }
    >
      <ScrollView>
        <View style={styles.info}>
          <Avatar.Image
            size={80}
            source={{
              uri:
                picture ||
                'https://images.unsplash.com/photo-1518791841217-8f162f1e1131?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=800&q=60',
            }}
          />
          <View style={styles.detail}>
            <Text style={styles.text}>{name}</Text>
            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'flex-start',
              }}
            >
              <Chip style={styles.chip}>{zodiac}</Chip>
            </View>
          </View>
        </View>
        <View style={styles.section}>
          <AppText style={styles.sectionHeader}>About {given_name}</AppText>
          <AppText style={styles.desc}>
            {about ||
              'Lorem ipsum dolor sit, amet consectetur adipisicing elit. Ullam cupiditate libero praesentium sequi dolor, aperiam exercitationem. Animi iure neque in.'}
          </AppText>
        </View>
        <View style={styles.section}>
          <AppText style={styles.sectionHeader}>Interests</AppText>
          <View
            style={{
              flexDirection: 'row',
              flexWrap: 'wrap',
            }}
          >
            {interests?.map(interest => (
              <View
                key={interest}
                style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                  justifyContent: 'flex-start',
                }}
              >
                <Chip style={{ marginRight: 8, marginBottom: 8 }}>
                  {interest}
                </Chip>
              </View>
            ))}
          </View>
        </View>
      </ScrollView>
    </Screen>
  );
}

const styles = StyleSheet.create({
  ripple: {
    borderRadius: 40,
    marginRight: 16,
    marginLeft: 16,
  },
  info: {
    flexDirection: 'row',
    marginVertical: 16,
    // display: 'flex',
    // flexDirecton: 'row',
    // alignItems: 'center',
  },
  detail: {
    // alignItems: 'center',
    marginHorizontal: 16,
  },
  text: {
    fontSize: 20,
  },
  chip: {
    // alignSelf: 'baseline',
    // alignSelf: 'flex-start',
  },
  section: {
    marginVertical: 16,
  },
  sectionHeader: {
    marginVertical: 8,
    fontSize: 20,
  },
  desc: {
    fontSize: 16,
  },
});
