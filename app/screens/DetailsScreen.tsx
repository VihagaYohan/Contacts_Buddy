import React, {Component, useEffect} from 'react';
import {StyleSheet} from 'react-native';
import {withObservables} from '@nozbe/watermelondb/react';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {RouteProp} from '@react-navigation/native';

// components
import {UIContainer, UITextView, UIFAB} from '../components';

// widgets
import {ContactForm} from '../widgets';

// constants
import {STYLES, ICONS, COLORS} from '../constants';

// DAO
import ContactDAO from '../db/dao/contactsDAO';

// navigation
import {RootParamList} from '../navigation';

// icons
const {AntDesignIcon} = ICONS;

const UpdateContactScreen = ({
  navigation,
  route,
}: {
  navigation: NativeStackNavigationProp<any, any>;
  route: RouteProp<RootParamList, 'details_screen'>;
}) => {
  const {contact} = route.params;

  console.log(contact);

  return (
    <UIContainer>
      {/*  <ContactForm buttonTitle="UPDATE" formValues={details} /> */}
    </UIContainer>
  );
};

const styles = StyleSheet.create({});

const enhance = withObservables([], () => ({
  contacts: ContactDAO.observeContacts(),
}));

export default UpdateContactScreen;
