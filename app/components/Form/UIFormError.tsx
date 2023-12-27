import React, {Component} from 'react';
import {StyleSheet, View} from 'react-native';

// components
import {UITextView} from '../';

// constants
import {COLORS, DIMENSION} from '../../constants';

interface propTypes {
  error: String;
  visible: boolean;
}

const UIFormError = (props: propTypes) => {
  if (!props.visible || !props.error) return null;

  return <UITextView text={props.error} textStyle={styles.text} />;
};

const styles = StyleSheet.create({
  text: {
    color: COLORS.red.red600,
    marginTop: DIMENSION.MARGIN / 2,
  },
});

export default UIFormError;
