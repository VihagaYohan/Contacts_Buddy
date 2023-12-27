import React, {Component} from 'react';
import {StyleSheet, View} from 'react-native';

// components
import {UIForm, UITextInput, UIFormField} from '../components';

// constants
import {COLORS} from '../constants';

// form validation
import {contactSchema} from '../formValidation/formValidations';
import {useFormik} from 'formik';

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

  const {handleBlur, handleChange} = formik;
  return (
    <View>
      <UIForm
        initialValues={initialValues}
        validationSchema={contactSchema}
        onSubmit={values => console.log(values)}>
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
        </View>
      </UIForm>
    </View>
  );
};

const styles = StyleSheet.create({});

export default ContactForm;
