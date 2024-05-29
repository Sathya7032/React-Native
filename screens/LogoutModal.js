import React, { useContext } from 'react';
import { Modal, View, Text, Button, StyleSheet } from 'react-native';
import AuthContext from '../context/AuthContext';

const LogoutModal = ({ visible, onConfirm, onCancel }) => {
    const { LogoutUser } = useContext(AuthContext);
  return (
    <Modal
      transparent={true}
      animationType="slide"
      visible={visible}
      onRequestClose={onCancel}
    >
      <View style={styles.modalOverlay}>
        <View style={styles.modalContainer}>
          <Text style={styles.modalTitle}>Confirm Logout</Text>
          <Text style={styles.modalMessage}>Are you sure you want to logout?</Text>
          <View style={styles.buttonContainer}>
            <Button title="Cancel" onPress={onCancel} color="#233142" />
            <Button title="Logout" onPress={LogoutUser} color="#233142" />
          </View>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modalOverlay: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContainer: {
    width: 300,
    padding: 20,
    backgroundColor: 'white',
    borderRadius: 10,
    elevation: 10,
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  modalMessage: {
    fontSize: 16,
    marginBottom: 20,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
});

export default LogoutModal;
