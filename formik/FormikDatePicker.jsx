import { View, Text, StyleSheet } from 'react-native';
import React, { useState } from 'react';
import DateTimePicker from '@react-native-community/datetimepicker';
import { useFormikContext } from 'formik';
import { HelperText, TextInput } from 'react-native-paper';
import moment from 'moment';

export default function FormikDatePicker({ name, style, ...props }) {
  const [date, setDate] = useState(new Date());
  const [show, setShow] = useState(false);

  const {
    handleChange,
    errors,
    setFieldTouched,
    touched,
    values,
    setFieldValue,
  } = useFormikContext();

  return (
    <View style={[styles.root, style]}>
      {!!show && (
        <DateTimePicker
          value={name ? new Date(values[name]) : date}
          placeholderText='DOB'
          onChange={(e, dt) => {
            name && setFieldValue(name, dt);
            setShow(false);
          }}
        />
      )}
      <TextInput
        onPressIn={() => setShow(true)}
        value={name && `${moment(values[name]).format('MMM DD, YYYY')}`}
        error={name && touched[name] && errors[name] && true}
        // onChangeText={name && handleChange(name)}
        placeholder={name ? `${values[name]}` : 'Select Date'}
        onBlur={() => name && setFieldTouched(name)}
        {...props}
      />
      {name && touched[name] && errors[name] && (
        <HelperText
          type='error'
          visible={name && touched[name] && errors[name]}
        >
          {errors[name]}
        </HelperText>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  root: {
    marginBottom: 8,
  },
});
