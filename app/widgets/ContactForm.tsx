import React, {Component} from 'react';
import {StyleSheet, View} from 'react-native';
import {useNavigation} from '@react-navigation/native';

// components
import {
  UIForm,
  UITextInput,
  UIFormField,
  UIButton,
  UIFormButton,
  UIAlert,
} from '../components';

// constants
import {COLORS, DIMENSION} from '../constants';

// form validation
import {contactSchema} from '../formValidation/formValidations';
import {useFormik, useFormikContext} from 'formik';

// store
import {useAppDispatch, useAppSelector} from '../store/store';
import {setPass, setFail} from '../store/slice/contactSlice';

// navigation
import {Routes} from '../navigation';

// form initial values
const initialValues = {
  firstName: '',
  lastName: '',
  company: '',
  phone: '',
  email: '',
  address: '',
};

import ContactService from '../db/dao/contactsDAO';
import Contact from '../db/contacts';
import database from '../db/database';
import {addContact} from '../services/contactsService';

const ContactForm = () => {
  const dispatch = useAppDispatch();
  const {pass, fail, loadingState} = useAppSelector(state => state.contact);
  const navigation = useNavigation();

  const formik = useFormik({
    initialValues: initialValues,
    validationSchema: contactSchema,
    onSubmit: values => console.log(values),
  });

  const handleSave = async (values: any) => {
    try {
      let result = await database.write(async () => await addContact(values));
      if (result.status === true) {
        dispatch(setPass(true));
      } else {
        dispatch(setFail(true));
      }
    } catch (e) {
      dispatch(setFail(true));
    }
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

          {pass && (
            <UIAlert
              message="New contact has been create successfully"
              onClick={() => navigation.goBack()}
            />
          )}

          {fail && (
            <UIAlert
              message={`Unable to create contact \n Please try again`}
              onClick={() => navigation.goBack()}
            />
          )}
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
