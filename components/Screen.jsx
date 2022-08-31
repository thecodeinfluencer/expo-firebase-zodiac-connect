import { useBottomTabBarHeight } from '@react-navigation/bottom-tabs';
import { useNavigation } from '@react-navigation/native';
import React, { useEffect, useState } from 'react';
import { SafeAreaView, View, StyleSheet, StatusBar } from 'react-native';
import { Avatar, Banner, TouchableRipple, useTheme } from 'react-native-paper';
import { useDispatch, useSelector } from 'react-redux';
import AppText from '../fragments/AppText';
import { logout } from '../redux/slices/authSlice';
import { AntDesign as Icon } from '@expo/vector-icons';

export default function Screen({
  children,
  title,
  disableHorizontalPadding,
  headerRight,
  tab,
}) {
  const theme = useTheme();
  const dispatch = useDispatch();
  const navigation = useNavigation();
  const tabHeight = useBottomTabBarHeight();
  const state = useSelector(st => st);
  const user = state.auth.user;

  useEffect(() => {
    if (!user.interests) {
      navigation.navigate('Account');
    }
  }, [user.interests, navigation]);

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: theme.colors.background,
      paddingTop: StatusBar.currentHeight,
      paddingBottom: tabHeight + 48,
      width: '100%',
    },
    content: {
      paddingHorizontal: disableHorizontalPadding ? 0 : 16,
      // paddingTop: 16,
    },
    title: {
      fontSize: 24,
      marginTop: 16,
      marginBottom: 16,
      paddingLeft: 16,
      color: theme.colors.background,
    },
    header: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
      backgroundColor: theme.colors.primary,
    },
    ripple: {
      borderRadius: 40,
      marginRight: 16,
      marginLeft: 16,
    },
    banner: {
      // marginBottom: 16,
    },
    bar: {
      flexDirection: 'row',
      alignItems: 'center',
    },
    bannerText: {
      fontSize: 16,
    },
  });

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar
        backgroundColor={theme.colors.primary}
        barStyle='light-content'
      />
      <View>
        <View style={styles.header}>
          <View style={styles.bar}>
            {!tab && (
              <TouchableRipple
                style={styles.ripple}
                onPress={() => navigation.goBack()}
                borderless
              >
                <Icon color={'#fff'} size={32} name='arrowleft' />
              </TouchableRipple>
            )}
            {!!title && <AppText style={styles.title}>{title}</AppText>}
          </View>
          {!!(title === 'Account') && (
            <TouchableRipple
              style={styles.ripple}
              onPress={() => dispatch(logout())}
              borderless
            >
              <Icon color='#fff' size={30} name='logout' />
            </TouchableRipple>
          )}
          {!!(title === 'Connect') && (
            <TouchableRipple
              style={styles.ripple}
              onPress={() => navigation.navigate('Account')}
              borderless
            >
              <Avatar.Image
                size={32}
                source={{
                  uri:
                    user?.picture ||
                    `https://ui-avatars.com/api/?background=0fff&color=000&name=${user?.name}`,
                }}
              />
            </TouchableRipple>
          )}
          {headerRight}
        </View>
        {!user.interests && (
          <Banner style={styles.banner} visible actions={[]}>
            <AppText style={styles.bannerText}>
              Please update your profile to continue for the best experience
            </AppText>
          </Banner>
        )}
        <View style={styles.content}>{children}</View>
      </View>
    </SafeAreaView>
  );
}
