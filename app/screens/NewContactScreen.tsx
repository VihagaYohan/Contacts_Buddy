import React, {Component, useEffect} from 'react';
import {StyleSheet} from 'react-native';
import {withObservables} from '@nozbe/watermelondb/react';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {RouteProp} from '@react-navigation/native';

// components
import {UIContainer, UITextView, UIFAB} from '../components';

// constants
import {STYLES, ICONS, COLORS} from '../constants';

// DAO
import ContactDAO from '../db/dao/contactsDAO';

// icons
const {AntDesignIcon} = ICONS;

const NewContactScreen = ({
  navigation,
  route,
}: {
  navigation: NativeStackNavigationProp<any, any>;
  route: RouteProp<any, any>;
}) => {
  return (
    <UIContainer>
      <UITextView text="Home page" />

      <UIFAB
        icon={<AntDesignIcon name="plus" color={COLORS.white} size={20} />}
        onClick={() => console.log('')}
      />
    </UIContainer>
  );
};

const styles = StyleSheet.create({});

const enhance = withObservables([], () => ({
  contacts: ContactDAO.observeContacts(),
}));

export default NewContactScreen;
