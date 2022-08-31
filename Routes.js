import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { DefaultTheme, Provider } from 'react-native-paper';
import { useSelector } from 'react-redux';
import ForgotScreen from './screens/auth/ForgotScreen';
import LoginScreen from './screens/auth/LoginScreen';
import PrivacyScreen from './screens/auth/PrivacyScreen';
import SignupScreen from './screens/auth/SignupScreen';
import TermsScreen from './screens/auth/TermsScreen';
import Icon from '@expo/vector-icons/AntDesign';
import HomeTab from './screens/app/HomeTab';
import MapTab from './screens/app/MapTab';
import ZodiacTab from './screens/app/ZodiacTab';
import ChatTab from './screens/app/ChatTab';
import OnboardingScreen from './screens/auth/OnboardingScreen';
import AccountScreen from './screens/app/AccountScreen';
import ViewProfileScreen from './screens/app/ViewProfileScreen';
import ZodiacDescriptionScreen from './screens/app/ZodiacDescriptionScreen';
import ChatScreen from './screens/app/ChatScreen';
import AppText from './fragments/AppText';

const AuthStack = createNativeStackNavigator();
const AppTab = createBottomTabNavigator();
const HomeStack = createNativeStackNavigator();
const ZodiacStack = createNativeStackNavigator();
const ChatStack = createNativeStackNavigator();

export default function Routes() {
  const state = useSelector(st => st);
  const user = state?.auth?.user;
  const onboard = state?.auth?.onboard;

  if (!onboard) {
    return (
      <Provider theme={theme}>
        <OnboardingScreen />
      </Provider>
    );
  }

  return (
    <Provider theme={theme}>
      <NavigationContainer>
        <StatusBar style='auto' />
        {!user || Object.keys(user).length === 0 ? (
          <AuthStack.Navigator
            initialRouteName='Welcome'
            screenOptions={{
              headerTitleStyle: {
                fontFamily: 'Nunito',
              },
            }}
          >
            <AuthStack.Screen
              options={{ headerShown: false }}
              name='Login'
              component={LoginScreen}
            />
            <AuthStack.Screen
              options={{
                headerShown: false,
              }}
              name='SignupScreen'
              component={SignupScreen}
            />
            <AuthStack.Screen name='Terms' component={TermsScreen} />
            <AuthStack.Screen name='Privacy' component={PrivacyScreen} />
          </AuthStack.Navigator>
        ) : (
          <AppTab.Navigator
            screenOptions={({ route }) => ({
              tabBarIcon: ({ focused }) => tabBarIconOptions(route, focused),
              tabBarLabel: ({ focused, color }) =>
                tabBarLabelOptions(route, focused, color),
              headerShown: false,
              tabBarHideOnKeyboard: true,
            })}
          >
            <AppTab.Screen name='HomeScreens' component={HomeScreens} />
            <AppTab.Screen name='ChatScreens' component={ChatScreens} />
            <AppTab.Screen name='ZodiacScreens' component={ZodiacScreens} />
            <AppTab.Screen name='Map' component={MapTab} />
          </AppTab.Navigator>
        )}
      </NavigationContainer>
    </Provider>
  );
}

const ChatScreens = () => (
  <ChatStack.Navigator
    screenOptions={({ navigation, route }) => {
      navigation.getParent().setOptions({
        tabBarStyle: {
          display: route?.name !== 'ChatTab' ? 'none' : 'flex',
        },
      });
      return {
        headerShown: false,
      };
    }}
  >
    <ChatStack.Screen name='ChatTab' component={ChatTab} />
    <ChatStack.Screen name='ChatScreen' component={ChatScreen} />
  </ChatStack.Navigator>
);

const ZodiacScreens = () => (
  <ZodiacStack.Navigator
    screenOptions={({ navigation, route }) => {
      navigation.getParent().setOptions({
        tabBarStyle: {
          display: route?.name !== 'Zodiac' ? 'none' : 'flex',
        },
      });
      return {
        headerShown: false,
      };
    }}
  >
    <ZodiacStack.Screen name='Zodiac' component={ZodiacTab} />
    <ZodiacStack.Screen
      name='ZodiacDescription'
      component={ZodiacDescriptionScreen}
    />
  </ZodiacStack.Navigator>
);

const HomeScreens = () => (
  <HomeStack.Navigator
    initialRouteName='Welcome'
    screenOptions={({ navigation, route }) => {
      navigation.getParent().setOptions({
        tabBarStyle: {
          display: route?.name !== 'Home' ? 'none' : 'flex',
        },
      });
      return {
        headerShown: false,
      };
    }}
  >
    <HomeStack.Screen name='Home' component={HomeTab} />
    <HomeStack.Screen name='Account' component={AccountScreen} />
    <HomeStack.Screen name='ViewProfile' component={ViewProfileScreen} />
    <ChatStack.Screen name='ChatScreen' component={ChatScreen} />
  </HomeStack.Navigator>
);

const tabBarIconOptions = (route, focused) => {
  let iconName;

  switch (route.name) {
    case 'HomeScreens':
      iconName = 'home';
      break;
    case 'Map':
      iconName = 'appstore-o';
      break;
    case 'ZodiacScreens':
      iconName = 'solution1';
      break;
    case 'ChatScreens':
      iconName = 'message1';
      break;
    default:
      break;
  }

  return (
    <Icon name={iconName} color={focused && theme.colors.primary} size={24} />
  );
};

const tabBarLabelOptions = (route, focused, color) => {
  let label;

  switch (route.name) {
    case 'HomeScreens':
      label = 'Home';
      break;
    case 'Map':
      label = 'Map';
      break;
    case 'ZodiacScreens':
      label = 'Signs';
      break;
    case 'ChatScreens':
      label = 'Chat';
      break;
    default:
      break;
  }

  return (
    <AppText
      style={{
        color: focused ? theme.colors.primary : color,
      }}
    >
      {label}
    </AppText>
  );
};

export const theme = {
  ...DefaultTheme,
  fonts: {
    regular: {
      fontFamily: 'Nunito',
    },
  },
  roundness: 16,
  colors: {
    ...DefaultTheme.colors,
    background: '#eee',
    primary: '#EF895F',
    accent: '#fff',
  },
};
