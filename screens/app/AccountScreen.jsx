import * as Location from 'expo-location';
import { useFormikContext } from 'formik';
import React, { useEffect, useState } from 'react';
import { ScrollView, StyleSheet, View } from 'react-native';
import { Switch, TextInput } from 'react-native-paper';
import { useDispatch, useSelector } from 'react-redux';
import * as Yup from 'yup';
import MultiSelect from '../../components/MultiSelect';
import Screen from '../../components/Screen';
import FormikButton from '../../formik/FormikButton';
import FormikDatePicker from '../../formik/FormikDatePicker';
import FormikForm from '../../formik/FormikForm';
import FormikInput from '../../formik/FormikInput';
import AppText from '../../fragments/AppText';
import { zodiacSigns } from '../../local/data';
import { sliceActionUpdateUser } from '../../redux/slices/authSlice';

export default function AccountScreen() {
  const dispatch = useDispatch();
  const state = useSelector(s => s);
  const user = state.auth.user;

  const [interests, setInterests] = useState(user?.interests || []);
  const [shareLoc, setShareLoc] = useState(user?.shareLoc || false);
  const [zodiac, setZodiac] = useState('');
  const [location, setLocation] = useState(user?.location || null);
  const [errorMsg, setErrorMsg] = useState(null);

  const validationSchema = Yup.object().shape({
    name: Yup.string().required('Name is required'),
    about: Yup.string().required('About is required'),
    dob: Yup.date().required('DOB is required'),
  });

  useEffect(() => {
    (async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        setErrorMsg('Permission to access location was denied');
        return;
      }

      let location = await Location.getCurrentPositionAsync({});
      // let address = await Location.reverseGeocodeAsync(location);

      setLocation(location?.coords);
    })();
  }, []);

  return (
    <Screen title={'Account'}>
      <ScrollView
        contentContainerStyle={{
          paddingTop: 16,
          paddingBottom: 216,
        }}
        showsVerticalScrollIndicator={false}
      >
        <FormikForm
          validationSchema={validationSchema}
          initialValues={{
            name: user?.name || '',
            about: user?.about || '',
            dob: user?.dob || new Date(),
          }}
          onSubmit={vals => {
            console.log({
              name: vals.name,
              about: vals.about,
              dob: `${vals.dob}`,
              interests,
              shareLoc,
              zodiac,
              location,
            });

            if (interests.length < 1) {
              alert('Please select at least one interest');
              return;
            }

            if (!location && shareLoc) {
              alert('Please enable location services');
              return;
            }

            dispatch(
              sliceActionUpdateUser({
                name: vals.name,
                about: vals.about,
                dob: `${vals.dob}`,
                interests,
                shareLoc,
                zodiac,
                location,
              })
            );
          }}
        >
          <FormikInput
            label={!user?.name && 'Full Name'}
            placeholder={user?.name || 'John Doe'}
            name='name'
            mode='outlined'
            textContentType='name'
          />
          <TextInput
            style={styles.disabled}
            label='Email'
            disabled
            mode='outlined'
            value={user?.email}
          />
          <FormikDatePicker
            label={!user?.dob && 'Date of Birth'}
            name='dob'
            mode='outlined'
          />
          <ZodiacInput onZodiac={zodiac => setZodiac(zodiac)} />
          <FormikInput
            label={!user?.about && 'Description'}
            placeholder={user?.about || 'Brief Description'}
            name='about'
            mode='outlined'
            textContentType='name'
            multiline
            numberOfLines={4}
          />
          <View style={styles.location}>
            <Switch
              color='#aaa'
              value={shareLoc}
              onChange={() => setShareLoc(!shareLoc)}
            />
            <AppText style={styles.share}>Share Location</AppText>
          </View>
          <MultiSelect
            initialVals={user?.interests}
            onSelect={interests => setInterests(interests)}
          />
          <View>
            <FormikButton mode='contained'>Update</FormikButton>
          </View>
        </FormikForm>
      </ScrollView>
    </Screen>
  );
}

const ZodiacInput = ({ onZodiac }) => {
  const formikContext = useFormikContext();

  useEffect(() => {
    if (formikContext?.values?.dob && onZodiac) {
      onZodiac(getZodiacFromDOB(formikContext.values.dob));
    }
  }, [formikContext?.values?.dob]);

  return (
    <TextInput
      style={styles.disabled}
      label='Zodiac Sign'
      placeholder='Select DOB'
      disabled
      mode='outlined'
      value={
        formikContext?.values?.dob
          ? getZodiacFromDOB(formikContext?.values?.dob)
          : 'Input DOB to see Zodiac'
      }
    />
  );
};

const styles = StyleSheet.create({
  disabled: {
    marginBottom: 8,
  },
  location: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  share: {
    fontSize: 16,
    marginLeft: 8,
  },
});

const getZodiacFromDOB = rawDate => {
  const date = new Date(rawDate);

  const days = [21, 20, 21, 21, 22, 22, 23, 24, 24, 24, 23, 22];
  let month = date.getMonth();
  let day = date.getDate();
  if (month == 0 && day <= 20) {
    month = 11;
  } else if (day < days[month]) {
    month--;
  }
  return zodiacSigns[month].label;
};
