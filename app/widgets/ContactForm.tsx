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
import {setPass, setFail, setMessage} from '../store/slice/contactSlice';

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
import {addContact, updateContact} from '../services/contactsService';

interface propTypes {
  buttonTitle: String;
  formValues?: any;
}

const ContactForm = (props: propTypes) => {
  const dispatch = useAppDispatch();
  const {pass, fail, loadingState} = useAppSelector(state => state.contact);
  const navigation = useNavigation();

  const formik = useFormik({
    initialValues: initialValues,
    validationSchema: contactSchema,
    onSubmit: values => console.log(values),
  });

  // function to handle create new contact
  const handleSave = async (values: any) => {
    try {
      let result = await database.write(async () => await addContact(values));
      console.log(result);
      if (result.status === true) {
        dispatch(setPass(true));
        dispatch(setMessage(`Contact has been created successfully`));
      } else {
        dispatch(setFail(true));
        dispatch(setMessage(`Unable to update contact \n Please try again`));
      }
    } catch (e) {
      dispatch(setFail(true));
    }
  };

  // function to handle update contact
  const handleUpdate = async (values: any) => {
    try {
      let result = await database.write(
        async () => await updateContact(values),
      );
      console.log(result);
      if (result.status === true) {
        dispatch(setPass(true));
        dispatch(setMessage('Contact updated successfully'));
      } else {
        dispatch(setPass(false));
        dispatch(setMessage(`Unable to update contact \n Please try again`));
      }
    } catch (e) {
      dispatch(setFail(true));
      dispatch(setMessage('Unable to update contact'));
    }
  };

  return (
    <View>
      <UIForm
        initialValues={
          props.buttonTitle === 'SAVE' ? initialValues : props.formValues
        }
        validationSchema={contactSchema}
        onSubmit={props.buttonTitle === 'SAVE' ? handleSave : handleUpdate}>
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
            label={props.buttonTitle}
            buttonContainerStyle={styles.button}
            buttonTextStyle={styles.buttonText}
          />

          {pass && (
            <UIAlert
              message="New contact has been create successfully"
              isConfirmation={false}
              onClick={() => navigation.goBack()}
            />
          )}

          {fail && (
            <UIAlert
              message={`Unable to create contact \n Please try again`}
              isConfirmation={false}
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
