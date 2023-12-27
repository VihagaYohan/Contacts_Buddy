import React, {Component} from 'react';
import {StyleSheet, View} from 'react-native';
import {
  useFormikContext,
  useField,
  FormikErrors,
  FormikTouched,
  useFormik,
} from 'formik';

// components
import {UITextInput, UITextView, UIFormError} from '../';

// constants
import {COLORS, DIMENSION} from '../../constants';

interface propTypes {
  placeholder: string;
  name: String;
}

const UIFormField = (props: propTypes) => {
  const {errors, setFieldTouched, setFieldValue, touched, values} =
    useFormikContext();
  let fieldValue: any = values;
  let fieldError: FormikErrors<any> = errors;
  let fieldTouched: FormikTouched<any> = touched;

  return (
    <View style={styles.container}>
      <UITextInput
        value={fieldValue[props.name.toString()]}
        onChangeText={text => setFieldValue(props.name.toString(), text)}
        onBlur={() => setFieldTouched(props.name.toString())}
        {...props}
      />
      {
        <UIFormError
          error={fieldError[props.name.toString()]}
          visible={fieldTouched[props.name.toString()]}
        />
      }
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginBottom: DIMENSION.MARGIN / 2,
  },
});

export default UIFormField;
