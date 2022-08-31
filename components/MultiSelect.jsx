import React, { useState } from 'react';
import { View } from 'react-native';
import { Chip } from 'react-native-paper';
import AppText from '../fragments/AppText';

export default function MultiSelect({ onSelect, title, initialVals }) {
  const [iArr, setIArray] = useState(initialVals || []);

  return (
    <View
      style={{
        paddingBottom: 36,
      }}
    >
      <AppText
        style={{
          marginTop: 20,
          marginBottom: 10,
          fontSize: 16,
        }}
      >
        {title || 'Select Your Interests'}
      </AppText>
      <View
        style={{
          flexDirection: 'row',
          flexWrap: 'wrap',
        }}
      >
        {interests?.map(interest => {
          return (
            <View
              key={`${Math.random() * 1000}`}
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'flex-start',
              }}
            >
              <Chip
                // mode={iArr.includes(interest) ? 'flat' : 'outlined'}
                selected={iArr.includes(interest) ? true : false}
                style={{
                  marginRight: 6,
                  marginBottom: 8,
                }}
                onPress={() => {
                  if (iArr.includes(interest)) {
                    setIArray(iArr.filter(val => val !== interest));
                    onSelect && onSelect(iArr.filter(val => val !== interest));
                  } else {
                    setIArray([...iArr, interest]);
                    onSelect && onSelect([...iArr, interest]);
                  }
                }}
              >
                {interest}
              </Chip>
            </View>
          );
        })}
      </View>
    </View>
  );
}

const interests = [
  'arts & culture',
  'career & business',
  'community & environment',
  'dance',
  'fashion & beauty',
  'film and animation',
  'food & drink',
  'games',
  'health & wellbeing',
  'hobbies & passions',
  'identity & language',
  'movements & politics',
  'music',
  'parenting & family',
  'pets & animals',
  'photography',
  'programming',
  'religion & spirituality',
  'science & education',
  'skating',
  'social activities',
  'sports & fitness',
  'support & coaching',
  'technology',
  'travel & outdoor',
  'writing and books',
];
