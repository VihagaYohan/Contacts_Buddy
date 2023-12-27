import React, {Component, useEffect} from 'react';
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

// store
import {useAppSelector, useAppDispatch} from '../store/store';

// components
import {UIContainer, UITextView, UIFAB, UIAlert} from '../components';

// navigation
import {Routes} from '../navigation';

// constants
import {STYLES, ICONS, COLORS, DIMENSION} from '../constants';

// DAO
import ContactDAO from '../db/dao/contactsDAO';
import Contact from '../models/Contact';

// icons
const {AntDesignIcon, FontAwesomeIcon, IoniconIcon} = ICONS;

const SIZE = 40;

interface actionContainerPropTypes extends ViewProps {
  backgroundColor: ColorValue;
  children: JSX.Element | JSX.Element[];
  onPress: () => void;
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
  const count = useAppSelector(state => state.count.value);
  // console.log(count);

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
            <ActionContainer
              backgroundColor={COLORS.primaryColor}
              onPress={() => console.log()}>
              <Pressable style={styles.actionIcon}>
                <FontAwesomeIcon name="pen" size={20} color={COLORS.white} />
              </Pressable>
            </ActionContainer>
          );
        }}
        renderRightActions={() => {
          return (
            <ActionContainer
              backgroundColor={COLORS.red.red700}
              onPress={() => console.log()}>
              <Pressable style={styles.actionIcon}>
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
