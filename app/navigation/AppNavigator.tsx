import React, {Component} from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';

// screens
import {HomeScreen, DetailsScreen} from '../screens';

// navigation
import {Routes} from './';

const Stack = createNativeStackNavigator();

const Navigator = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen name={Routes.home} component={HomeScreen} />
      <Stack.Screen name={Routes.details} component={DetailsScreen} />
    </Stack.Navigator>
  );
};

export default Navigator;
