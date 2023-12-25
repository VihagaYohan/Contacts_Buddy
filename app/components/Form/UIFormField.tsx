import React, {Component} from 'react';
import {StyleSheet, View} from 'react-native';
import {useFormikContext} from 'formik';

// components
import {UITextInput} from '../';

interface propTypes {}

const UIFormField = (props: propTypes) => {
  const {handleChange, handleBlur, touched, values, errors} =
    useFormikContext();

  return (
    <View>
      <UITextInput
        placeholder="Name"
        onChangeText={handleChange}
        value={values.firstName}
        onBlur={handleBlur}
      />
    </View>
  );
};

const styles = StyleSheet.create({});

export default UIFormField;
