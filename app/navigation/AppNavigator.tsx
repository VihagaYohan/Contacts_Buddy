import React, {Component} from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';

// screens
import {HomeScreen, DetailsScreen, NewContactScreen} from '../screens';

// navigation
import {Routes} from './';

const Stack = createNativeStackNavigator();

const Navigator = () => {
  return (
    <Stack.Navigator screenOptions={{headerShown: false}}>
      <Stack.Screen name={Routes.home} component={HomeScreen} />
      <Stack.Screen name={Routes.details} component={DetailsScreen} />
      <Stack.Screen name={Routes.newContact} component={NewContactScreen} />
    </Stack.Navigator>
  );
};

export default Navigator;
