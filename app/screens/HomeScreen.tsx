import React, {Component, useEffect} from 'react';
import {StyleSheet} from 'react-native';

// components
import {UIContainer, UITextView} from '../components';
import {Database} from '@nozbe/watermelondb';

const HomeScreen = () => {
  return (
    <UIContainer>
      <UITextView text="Home page" />
    </UIContainer>
  );
};

const styles = StyleSheet.create({});

export default HomeScreen;
