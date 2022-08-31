import { useNavigation } from '@react-navigation/native';
import React from 'react';
import {
  Dimensions,
  Image,
  StyleSheet,
  TouchableOpacity,
  View,
} from 'react-native';
import { useDispatch } from 'react-redux';
import * as Yup from 'yup';
import FormikButton from '../../formik/FormikButton';
import FormikForm from '../../formik/FormikForm';
import FormikInput from '../../formik/FormikInput';
import AppText from '../../fragments/AppText';
import { sliceActionEmailRegister } from '../../redux/slices/authSlice';

const validationSchema = Yup.object().shape({
  fname: Yup.string().required('Full Name is required'),
  email: Yup.string().required('Email is required'),
  password: Yup.date().required('Password is required'),
});

export default function SignupScreen() {
  const navigation = useNavigation();
  const dispatch = useDispatch();

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Image style={styles.logo} source={require('../../assets/icon.png')} />
        <AppText style={styles.title}>Sign Up</AppText>
      </View>

      <FormikForm
        validationSchema={validationSchema}
        initialValues={{ fname: '', email: '', password: '' }}
        onSubmit={values => {
          dispatch(sliceActionEmailRegister(values));
        }}
      >
        <FormikInput
          label='Full Name'
          placeholder='John Doe'
          name='fname'
          mode='outlined'
          textContentType='name'
        />
        <FormikInput
          label='Email'
          placeholder='johndoe'
          name='email'
          mode='outlined'
          textContentType='emailAddress'
        />
        <FormikInput
          label='Password'
          placeholder='John Doe'
          name='password'
          mode='outlined'
          textContentType='newPassword'
          secureTextEntry
        />
        <FormikButton mode='contained'>Sign Up</FormikButton>
      </FormikForm>

      <View style={styles.action}>
        <AppText>Don&apos;t have an account yet? </AppText>
        <TouchableOpacity onPress={() => navigation.navigate('Login')}>
          <AppText style={styles.link}>Login</AppText>
        </TouchableOpacity>
      </View>
    </View>
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
  // button: {
  //   marginBottom: 8,
  // },
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
