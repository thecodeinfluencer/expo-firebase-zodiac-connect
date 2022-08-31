import { useFormikContext } from 'formik';
import React from 'react';
import { StyleSheet, View } from 'react-native';
import { HelperText, TextInput } from 'react-native-paper';

export default function FormikInput({ name, style, ...props }) {
  const { handleChange, errors, setFieldTouched, touched, values } =
    useFormikContext();

  return (
    <View style={[styles.root, style]}>
      <TextInput
        value={name && values[name]}
        error={name && touched[name] && errors[name] && true}
        onChangeText={name && handleChange(name)}
        onBlur={() => name && setFieldTouched(name)}
        {...props}
      />
      {name && touched[name] && errors[name] && (
        <HelperText
          type='error'
          visible={name && touched[name] && errors[name]}
          // style={styles.font}
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
