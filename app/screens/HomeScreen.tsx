import React, {Component, useEffect} from 'react';
import {
  StyleSheet,
  FlatList,
  ListRenderItem,
  TouchableOpacity,
} from 'react-native';
import {withObservables} from '@nozbe/watermelondb/react';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {RouteProp} from '@react-navigation/native';
import {useAppSelector, useAppDispatch} from '../store/store';

// components
import {UIContainer, UITextView, UIFAB} from '../components';

// navigation
import {Routes} from '../navigation';

// constants
import {STYLES, ICONS, COLORS} from '../constants';

// DAO
import ContactDAO from '../db/dao/contactsDAO';
import Contact from '../models/Contact';

// icons
const {AntDesignIcon} = ICONS;

const HomeScreen = ({
  navigation,
  route,
  contacts,
}: {
  navigation: NativeStackNavigationProp<any, any>;
  route: RouteProp<any, any>;
  contacts: any;
}) => {
  // console.log(contacts);
  const count = useAppSelector(state => state.count.value);
  console.log(count);

  // render UI
  const ContactItem: ListRenderItem<any> = ({item, index}) => {
    return (
      <TouchableOpacity>
        <UITextView text={item.address} />
      </TouchableOpacity>
    );
  };

  return (
    <UIContainer>
      <FlatList
        data={contacts}
        keyExtractor={(item, index) => `contact_list_index_${index}`}
        showsVerticalScrollIndicator={false}
        renderItem={({item, index}) => (
          <ContactItem
            item={item}
            index={index}
            separators={{
              highlight: function (): void {
                throw new Error('Function not implemented.');
              },
              unhighlight: function (): void {
                throw new Error('Function not implemented.');
              },
              updateProps: function (
                select: 'leading' | 'trailing',
                newProps: any,
              ): void {
                throw new Error('Function not implemented.');
              },
            }}
          />
        )}
      />

      <UIFAB
        icon={<AntDesignIcon name="plus" color={COLORS.white} size={20} />}
        onClick={() => navigation.navigate(Routes.newContact)}
      />
    </UIContainer>
  );
};

const styles = StyleSheet.create({});

const enhance = withObservables([], () => ({
  contacts: ContactDAO.observeContacts(),
}));

export default enhance(HomeScreen);
