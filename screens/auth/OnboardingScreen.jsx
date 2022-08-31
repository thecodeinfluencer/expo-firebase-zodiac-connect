import React from 'react';
import { Image, StatusBar, StyleSheet, View } from 'react-native';
import Onboarding from 'react-native-onboarding-swiper';
import { Colors } from 'react-native-paper';
import { useDispatch } from 'react-redux';
import AppButton from '../../paper/AppButton';
import { onboard } from '../../redux/slices/authSlice';

const Indicators = ({ isLight, selected }) => {
  let backgroundColor;

  if (isLight) {
    backgroundColor = selected ? 'rgba(0, 0, 0, 0.8)' : 'rgba(0, 0, 0, 0.3)';
  } else {
    backgroundColor = selected ? '#fff' : 'rgba(255, 255, 255, 0.5)';
  }

  const indicatorStyle = StyleSheet.create({
    indicator: {
      width: selected ? 24 : 8,
      height: 8,
      marginHorizontal: 3,
      backgroundColor,
      borderRadius: 4,
    },
  });

  return <View style={indicatorStyle.indicator} />;
};

export default function OnboardingScreen() {
  const dispatch = useDispatch();

  const onboarders = [
    {
      backgroundColor: '#221F1E',
      image: <Image source={require('../../assets/images/laptop.png')} />,
      title: 'Connect Seamlessly',
      subtitle: 'Connect with your peers with maximum ease',
    },
    {
      backgroundColor: '#221F1E',
      image: <Image source={require('../../assets/images/phone.png')} />,
      title: 'Easy Access',
      subtitle:
        'Get acces to the app at the comfort of your mobile phone.',
    },
    {
      backgroundColor: '#221F1E',
      image: <Image source={require('../../assets/images/rocket.png')} />,
      title: `Let's get started`,
      subtitle: (
        <AppButton
          labelStyle={styles.text}
          style={styles.button}
          mode='contained'
          onPress={() => dispatch(onboard(true))}
        >
          Get Started
        </AppButton>
      ),
    },
  ]

  return (
    <>
      <StatusBar backgroundColor='#221f1e' />
      <Onboarding
        DotComponent={Indicators}
        NextButtonComponent={() => null}
        SkipButtonComponent={() => null}
        DoneButtonComponent={() => null}
        titleStyles={styles.text}
        subTitleStyles={styles.onboardingTitle}
        pages={onboarders}
      />
    </>
  );
}

const styles = StyleSheet.create({
  button: { marginBottom: -32 },
  text: {
    color: Colors.white,
  },
  onboardingTitle: {
    paddingHorizontal: 16,
  },
});
