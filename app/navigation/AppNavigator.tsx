import React, {Component} from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';

// screens
import {HomeScreen, DetailsScreen, NewContactScreen} from '../screens';

// navigation
import {Routes} from './';
import RootStackParamList from './RootParamList';

const Stack = createNativeStackNavigator<RootStackParamList>();

const Navigator = () => {
  return (
    <Stack.Navigator screenOptions={{headerShown: true}}>
      <Stack.Screen
        name={Routes.home}
        component={HomeScreen}
        options={{
          headerTitle: 'CONTACTS BUDDY',
          headerTitleAlign: 'center',
        }}
      />
      <Stack.Screen
        name={Routes.details}
        component={DetailsScreen}
        options={{
          headerTitle: 'UPDATE CONTACT',
          headerTitleAlign: 'center',
        }}
      />
      <Stack.Screen
        name={Routes.newContact}
        component={NewContactScreen}
        options={{
          headerTitle: 'NEW CONTACT',
          headerTitleAlign: 'center',
        }}
      />
    </Stack.Navigator>
  );
};

export default Navigator;
