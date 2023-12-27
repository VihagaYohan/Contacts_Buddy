import React, {Component, useState, useEffect} from 'react';
import {StyleSheet, Modal, View, ModalProps} from 'react-native';

// components
import {UIButton, UITextView} from '.';

// constants
import {COLORS, DIMENSION} from '../constants';

interface propTypes extends ModalProps {
  message: String;
}

const UIAlert = (props: propTypes) => {
  const [visible, setVisible] = useState<boolean>(true);

  return (
    <Modal visible={visible} animationType="slide" transparent={true}>
      <View style={styles.container}>
        <View style={styles.messageContainer}>
          <UITextView text={props.message} />

          <UIButton
            label="CLOSE"
            width="100%"
            buttonContainerStyle={{
              paddingHorizontal: DIMENSION.MARGIN,
              marginVertical: DIMENSION.MARGIN,
            }}
            onClick={() => setVisible(false)}
          />
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'rgba(0,0,0,0.7)',
    justifyContent: 'center',
    alignItems: 'center',
    flex: 1,
  },
  messageContainer: {
    backgroundColor: COLORS.white,
    paddingHorizontal: DIMENSION.MARGIN * 2,
    paddingVertical: DIMENSION.MARGIN,
    borderRadius: DIMENSION.CARD_BORDER_RADIUS,
  },
});

export default UIAlert;
