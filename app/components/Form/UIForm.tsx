import React, {Component} from 'react';
import {StyleSheet} from 'react-native';
import {Formik} from 'formik';

interface propTypes {
  initialValues: object;
  validationSchema: any;
  children: JSX.Element | JSX.Element[];
  onSubmit: (values: any) => void;
}

const UIForm = ({
  initialValues,
  validationSchema,
  children,
  onSubmit,
}: propTypes) => {
  return (
    <Formik
      initialValues={initialValues}
      validationSchema={validationSchema}
      onSubmit={onSubmit}>
      {() => <React.Fragment>{children}</React.Fragment>}
    </Formik>
  );
};

export default UIForm;
