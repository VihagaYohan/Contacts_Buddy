import React, {Component} from 'react';
import {StyleSheet} from 'react-native';
import {useFormikContext} from 'formik';

// components
import {UIButton} from '../';

interface propTypes {
  label: String;
}

const UISubmitButton = ({label, ...props}: propTypes) => {
  const {handleSubmit} = useFormikContext();

  return <UIButton label={label} onClick={handleSubmit} {...props} />;
};

const styles = StyleSheet.create({});

export default UISubmitButton;
