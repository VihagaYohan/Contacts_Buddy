import React, {Component, useState, useEffect} from 'react';
import {StyleSheet, Modal, View, ModalProps} from 'react-native';

// components
import {UITextView} from '.';

// constants
import {COLORS} from '../constants';

interface propTypes extends ModalProps {
  message: String;
}

const UIAlert = (props: propTypes) => {
  const [visible, setVisible] = useState<boolean>(true);

  return (
    <Modal visible animationType="slide" transparent={true}>
      <View style={styles.container}></View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'rgba(0,0,0,0.7)',
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default UIAlert;
