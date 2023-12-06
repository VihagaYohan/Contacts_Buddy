import React, {Component} from 'react';
import {StyleSheet, Text, TextProps, TextStyle} from 'react-native';

interface propTypes extends TextProps {
  text: String;
  textStyle?: TextStyle | TextStyle[];
}

const UITextView = (props: propTypes) => {
  return (
    <Text style={{...styles.textStyle, ...props.textStyle}} {...props}>
      {props.text}
    </Text>
  );
};

const styles = StyleSheet.create({
  textStyle: {},
});

export default UITextView;
