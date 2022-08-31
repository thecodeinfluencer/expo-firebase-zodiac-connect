import { Formik } from 'formik';
import React from 'react';

export default function FormikForm({
  initialValues,
  onSubmit,
  validationSchema,
  children,
}) {
  return (
    <Formik
      initialValues={initialValues}
      onSubmit={onSubmit}
      validationSchema={validationSchema}
    >
      {() => {
        return <>{children}</>;
      }}
    </Formik>
  );
}
