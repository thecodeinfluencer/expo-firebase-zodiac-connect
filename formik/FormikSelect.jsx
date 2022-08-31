import { useFormikContext } from 'formik';
import React, { useState } from 'react';
import { StyleSheet, View } from 'react-native';
import { HelperText } from 'react-native-paper';
import DropDown from 'react-native-paper-dropdown';

export default function FormikSelect({ name, style, ...props }) {
  const [showDropDown, setShowDropDown] = useState();

  const {
    handleChange,
    errors,
    //  setFieldTouched,
    touched,
    values,
  } = useFormikContext();

  return (
    <View style={[styles.root, style]}>
      <DropDown
        // onBlur={() => name && setFieldTouched(name)}
        // error={name && touched[name] && errors[name] && true}
        visible={showDropDown}
        showDropDown={() => setShowDropDown(true)}
        onDismiss={() => setShowDropDown(false)}
        value={name && values[name]}
        setValue={name && handleChange(name)}
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
