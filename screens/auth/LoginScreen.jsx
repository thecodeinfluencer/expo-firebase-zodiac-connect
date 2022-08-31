import { useNavigation } from '@react-navigation/native';
import React, { useEffect, useState } from 'react';
import {
  Dimensions,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  View,
} from 'react-native';
import { useDispatch } from 'react-redux';
import AppText from '../../fragments/AppText';
import AppButton from '../../paper/AppButton';
import {
  sliceActionConnectGoogle,
  sliceActionEmailLogin,
} from '../../redux/slices/authSlice';
import * as Google from 'expo-auth-session/providers/google';
import * as WebBrowser from 'expo-web-browser';
import { Image } from 'react-native';
import { ActivityIndicator } from 'react-native-paper';
import FormikForm from '../../formik/FormikForm';
import FormikInput from '../../formik/FormikInput';
import * as Yup from 'yup';
import FormikButton from '../../formik/FormikButton';

WebBrowser.maybeCompleteAuthSession();

const validationSchema = Yup.object().shape({
  email: Yup.string().required('Email is required'),
  password: Yup.date().required('Password is required'),
});

export default function LoginScreen() {
  const [accessToken, setAccessToken] = useState();
  const [userInfo, setUserInfo] = useState();

  const [request, response, promptAsync] = Google.useAuthRequest({
    androidClientId:
      '402573166777-i7hvgn2ppb1gou461lb38iuh4f6s5uq9.apps.googleusercontent.com',
    iosClientId:
      '402573166777-6pr80gh305s081tm4riovdtal6c42108.apps.googleusercontent.com',
    expoClientId:
      '402573166777-ubaiac57qkvj265lhgu9hdiugtdmv36g.apps.googleusercontent.com',
    scopes: ['profile', 'email', 'openid'],
  });

  const navigation = useNavigation();
  const dispatch = useDispatch();

  useEffect(() => {
    if (response?.type === 'success') {
      setAccessToken(response.authentication.accessToken);
    }
  }, [response]);

  useEffect(() => {
    if (accessToken) {
      getUserData();
    }
  }, [accessToken]);

  async function getUserData() {
    let userInfoResponse = await fetch(
      'https://www.googleapis.com/userinfo/v2/me',
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      }
    );

    userInfoResponse.json().then(userInfo => {
      setUserInfo(userInfo);
      dispatch(sliceActionConnectGoogle(userInfo));
    });
  }

  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <Image style={styles.logo} source={require('../../assets/icon.png')} />
        <AppText style={styles.title}>Login</AppText>
        {!!accessToken && !userInfo && (
          <AppButton
            onPress={() => {
              getUserData();
            }}
          >
            Continue
          </AppButton>
        )}
        {!!accessToken && !userInfo && (
          <ActivityIndicator size={'large'}></ActivityIndicator>
        )}
      </View>

      <FormikForm
        validationSchema={validationSchema}
        initialValues={{ fname: '', email: '', password: '' }}
        onSubmit={values => {
          dispatch(sliceActionEmailLogin(values));
        }}
      >
        <FormikInput
          label='Email'
          placeholder='johndoe'
          name='email'
          mode='outlined'
          textContentType='emailAddress'
        />
        <FormikInput
          label='Password'
          placeholder='Password'
          name='password'
          mode='outlined'
          textContentType='newPassword'
          secureTextEntry
        />
        <FormikButton style={styles.button} mode='contained'>
          Login
        </FormikButton>
      </FormikForm>

      {!accessToken && (
        <AppButton
          onPress={() => {
            promptAsync({ showInRecents: true });
          }}
          uppercase={false}
          icon='google'
          mode='outlined'
        >
          Continue With Google
        </AppButton>
      )}

      <View style={styles.action}>
        <AppText>Don&apos;t have an account yet? </AppText>
        <TouchableOpacity onPress={() => navigation.navigate('SignupScreen')}>
          <AppText style={styles.link}>Sign up</AppText>
        </TouchableOpacity>
      </View>

      <View style={styles.action}>
        <TouchableOpacity onPress={() => navigation.navigate('Terms')}>
          <AppText style={styles.link}>Terms</AppText>
        </TouchableOpacity>
        <AppText> . </AppText>
        <TouchableOpacity onPress={() => navigation.navigate('Privacy')}>
          <AppText style={styles.link}>Privacy Policy</AppText>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 32,
    paddingTop: 88,
  },
  header: {
    alignItems: 'center',
  },
  button: {
    marginBottom: 8,
  },
  logo: {
    width: 100,
    height: 100,
  },
  title: {
    fontSize: 24,
    marginBottom: Dimensions.get('window').height * 0.05,
    color: '#ef895f',
  },
  link: {
    color: '#ef895f',
  },
  action: {
    flexDirection: 'row',
    marginTop: Dimensions.get('window').height * 0.05,
  },
});
