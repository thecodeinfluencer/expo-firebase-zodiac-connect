import { useFormikContext } from 'formik';
import React from 'react';
import { StyleSheet } from 'react-native';
import AppButton from '../paper/AppButton';

export default function FormikButton({ children, style, ...props }) {
  const formikContext = useFormikContext();

  return (
    <AppButton
      style={{ ...styles.button, ...style }}
      onPress={formikContext.handleSubmit}
      {...props}
    >
      {children}
    </AppButton>
  );
}

const styles = StyleSheet.create({
  button: {
    marginTop: 8,
  },
});
