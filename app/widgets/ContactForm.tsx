import React, {Component} from 'react';
import {StyleSheet, View} from 'react-native';

// components
import {
  UIForm,
  UITextInput,
  UIFormField,
  UIButton,
  UIFormButton,
} from '../components';

// constants
import {COLORS, DIMENSION} from '../constants';

// form validation
import {contactSchema} from '../formValidation/formValidations';
import {useFormik, useFormikContext} from 'formik';

// form initial values
const initialValues = {
  firstName: '',
  lastName: '',
  company: '',
  phone: '',
  email: '',
  address: '',
};

const ContactForm = () => {
  const formik = useFormik({
    initialValues: initialValues,
    validationSchema: contactSchema,
    onSubmit: values => console.log(values),
  });

  const handleSave = (values: any) => {
    console.log('form data goes here');
    console.log(values);
  };

  return (
    <View>
      <UIForm
        initialValues={initialValues}
        validationSchema={contactSchema}
        onSubmit={handleSave}>
        <View>
          <UIFormField placeholder="Enter first name" name="firstName" />

          <UIFormField placeholder="Enter last name" name="lastName" />

          <UIFormField placeholder="Enter company" name="company" />

          <UIFormField
            placeholder="Enter phone number"
            name="phone"
            keyboardType="number-pad"
          />

          <UIFormField
            placeholder="Enter email address"
            name="email"
            keyboardType="email-address"
          />

          <UIFormField placeholder="Enter address" name="address" />

          <UIFormButton
            label="SAVE"
            buttonContainerStyle={styles.button}
            buttonTextStyle={styles.buttonText}
          />
        </View>
      </UIForm>
    </View>
  );
};

const styles = StyleSheet.create({
  button: {
    marginVertical: DIMENSION.MARGIN * 2,
  },
  buttonText: {
    fontSize: 16,
  },
});

export default ContactForm;
