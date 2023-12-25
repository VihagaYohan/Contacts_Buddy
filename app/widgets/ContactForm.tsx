import React, {Component} from 'react';
import {StyleSheet, View} from 'react-native';

// components
import {UIForm, UITextInput, UIFormField} from '../components';

// constants
import {COLORS} from '../constants';

// form validation
import {contactSchema} from '../formValidation/formValidations';

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
  return (
    <View>
      <UIForm
        initialValues={initialValues}
        validationSchema={contactSchema}
        onSubmit={values => console.log(values)}>
        <View>
          <UIFormField />
        </View>
      </UIForm>
    </View>
  );
};

const styles = StyleSheet.create({});

export default ContactForm;
