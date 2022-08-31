import React from 'react';
import { ScrollView, View } from 'react-native';
import Screen from '../../components/Screen';
import ZodiacCard from '../../components/ZodiacCard';
import { zodiacSigns } from '../../local/data';

export default function ZodiacTab() {
  return (
    <Screen title={'Zodiac Signs'} tab>
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{
          paddingTop: 8,
          paddingBottom: 40,
        }}
      >
        <View>
          {zodiacSigns?.map(zodiac => (
            <ZodiacCard key={zodiac.label} zodiac={zodiac} />
          ))}
        </View>
      </ScrollView>
    </Screen>
  );
}
