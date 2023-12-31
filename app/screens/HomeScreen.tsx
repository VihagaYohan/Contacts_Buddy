import React, {Component, useEffect, useState} from 'react';
import {
  StyleSheet,
  FlatList,
  ListRenderItem,
  TouchableOpacity,
  View,
  ViewProps,
  Pressable,
  ColorValue,
} from 'react-native';
import {withObservables} from '@nozbe/watermelondb/react';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {RouteProp} from '@react-navigation/native';
import Swipeable from 'react-native-gesture-handler/Swipeable';

// redux
import {useAppSelector, useAppDispatch} from '../store/store';
import {setPass, setFail} from '../store/slice/contactSlice';

// components
import {UIContainer, UITextView, UIFAB, UIAlert} from '../components';

// navigation
import {Routes} from '../navigation';

// constants
import {STYLES, ICONS, COLORS, DIMENSION} from '../constants';

// DAO
import ContactDAO from '../db/dao/contactsDAO';
import Contact from '../models/Contact';

// service
import {deleteContact} from '../services/contactsService';

// icons
const {AntDesignIcon, FontAwesomeIcon, IoniconIcon} = ICONS;

const SIZE = 40;

interface actionContainerPropTypes extends ViewProps {
  backgroundColor: ColorValue;
  children: JSX.Element | JSX.Element[];
}

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
  const {pass, fail, loadingState} = useAppSelector(state => state.contact);
  const dispatch = useAppDispatch();
  const [confirmation, setConfirmation] = useState<boolean>(false);
  const [contactId, setContactId] = useState<string>();

  // console.log(count);

  // handle delete
  const handleDelete = async (id: string) => {
    try {
      let result = await deleteContact(id);
      console.log(result);
      if (result.status === true) {
        dispatch(setPass(true));
      } else {
        dispatch(setFail(false));
      }
    } catch (e) {
      dispatch(setPass(false));
    }
  };

  // handle update
  const handleUpdate = async (item: any) => {
    const payload = {
      id: item.id,
      firstName: item.firstName,
      lastName: item.lastName,
      company: item.company,
      phone: item.phone,
      email: item.email,
      address: item.address,
    };

    navigation.navigate(Routes.details, {contact: payload});
  };

  // render UI
  const ActionContainer = (props: actionContainerPropTypes) => {
    return (
      <View
        style={[
          styles.actionContaienr,
          {backgroundColor: props.backgroundColor},
        ]}>
        {props.children}
      </View>
    );
  };

  const ContactItem: ListRenderItem<any> = ({item, index}) => {
    return (
      <Swipeable
        overshootLeft={false}
        overshootRight={false}
        renderLeftActions={() => {
          return (
            <ActionContainer backgroundColor={COLORS.primaryColor}>
              <Pressable
                style={styles.actionIcon}
                onPress={() => {
                  handleUpdate(item);
                }}>
                <FontAwesomeIcon name="pen" size={20} color={COLORS.white} />
              </Pressable>
            </ActionContainer>
          );
        }}
        renderRightActions={() => {
          return (
            <ActionContainer backgroundColor={COLORS.red.red700}>
              <Pressable
                style={styles.actionIcon}
                onPress={() => {
                  handleDelete(item.id);
                }}>
                <IoniconIcon
                  name="trash-sharp"
                  size={20}
                  color={COLORS.white}
                />
              </Pressable>
            </ActionContainer>
          );
        }}>
        <TouchableOpacity style={[STYLES.shadow, styles.card]}>
          <View style={[{...STYLES.flexRow}, {alignItems: 'center'}]}>
            <View style={styles.iconContainer}>
              <AntDesignIcon name="user" size={20} color={COLORS.white} />
            </View>

            <UITextView text={item.getFullName()} textStyle={styles.name} />
          </View>

          <UITextView text={`Tel: ${item.phone}`} textStyle={styles.phone} />

          <View style={{alignItems: 'flex-end'}}>
            {item.company && <UITextView text={`Company : ${item.company}`} />}
            {item.address && <UITextView text={`Address : ${item.address}`} />}
            {item.email && <UITextView text={`Email : ${item.email}`} />}
          </View>
        </TouchableOpacity>
      </Swipeable>
    );
  };

  return (
    <UIContainer>
      {contacts.length === 0 ? (
        <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
          <UITextView
            text="There are contacts to show"
            textStyle={{
              color: COLORS.primaryColor,
              textAlign: 'center',
              alignSelf: 'center',
            }}
          />
        </View>
      ) : null}

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
        ItemSeparatorComponent={() => {
          return <View style={{height: 10}}></View>;
        }}
      />

      <UIFAB
        icon={<AntDesignIcon name="plus" color={COLORS.white} size={20} />}
        onClick={() => navigation.navigate(Routes.newContact)}
      />
    </UIContainer>
  );
};

const styles = StyleSheet.create({
  card: {
    paddingVertical: DIMENSION.PADDING * 2,
    paddingHorizontal: DIMENSION.PADDING,
    // marginBottom: DIMENSION.MARGIN,
    borderRadius: DIMENSION.BORDER_RADIUS,
    overflow: 'hidden',
    backgroundColor: COLORS.white,
  },
  iconContainer: {
    width: SIZE,
    height: SIZE,
    borderRadius: SIZE / 2,
    backgroundColor: COLORS.primaryColor,
    justifyContent: 'center',
    alignItems: 'center',
  },
  name: {
    marginLeft: DIMENSION.MARGIN,
    fontSize: 18,
  },
  phone: {
    marginLeft: SIZE + DIMENSION.MARGIN,
    color: COLORS.grey.grey600,
    fontStyle: 'italic',
  },
  actionContaienr: {
    width: 100,
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  actionIcon: {
    width: SIZE,
    height: SIZE,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

const enhance = withObservables([], () => ({
  contacts: ContactDAO.observeContacts(),
}));

export default enhance(HomeScreen);
