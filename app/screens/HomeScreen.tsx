import React, {Component, useEffect} from 'react';
import {
  StyleSheet,
  FlatList,
  ListRenderItem,
  TouchableOpacity,
  View,
} from 'react-native';
import {withObservables} from '@nozbe/watermelondb/react';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {RouteProp} from '@react-navigation/native';
import {useAppSelector, useAppDispatch} from '../store/store';
import {SwipeListView} from 'react-native-swipe-list-view';

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
const {AntDesignIcon} = ICONS;

const SIZE = 40;

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
  const ContactItem: ListRenderItem<any> = ({item, index}) => {
    return (
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
    );
  };

  return (
    <UIContainer>
      <SwipeListView
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
        renderHiddenItem={(data, rowMap) => (
          <View style={{backgroundColor: 'red'}}>
            <UITextView text="LEFT" />
            <UITextView text="RIGHT" />
          </View>
        )}
        leftOpenValue={75}
        rightOpenValue={-75}
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
    marginBottom: DIMENSION.MARGIN,
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
});

const enhance = withObservables([], () => ({
  contacts: ContactDAO.observeContacts(),
}));

export default enhance(HomeScreen);
