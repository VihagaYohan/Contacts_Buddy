/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React from 'react';
import type {PropsWithChildren} from 'react';
import {
  Platform,
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  useColorScheme,
  View,
} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import {Database} from '@nozbe/watermelondb';
import SQLiteAdapter from '@nozbe/watermelondb/adapters/sqlite';

import {mySchema} from './model/schema';
import migrations from './model/migrations';

// navigation
import {AppNavigator} from './app/navigation';
import Post from './model/posts';

function App(): JSX.Element {
  const adapter = new SQLiteAdapter({
    schema: mySchema,
    migrations,
    onSetUpError: error => {
      console.log('db error', error);
    },
    dbName: 'contacts',
    jsi: Platform.OS === 'ios',
  });

  const database = new Database({
    adapter,
    modelClasses: [Post],
  });

  return (
    <NavigationContainer>
      <AppNavigator />
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({});

export default App;
