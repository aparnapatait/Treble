// UploadOverlay.tsx
import React from 'react';
import { Modal, View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import * as DocumentPicker from 'expo-document-picker';

export default function UploadOverlay({ visible, onClose }) {
  const navigation = useNavigation();

  const handleUpload = async () => {
    const result = await DocumentPicker.getDocumentAsync({
      type: ['audio/mpeg', 'audio/wav'],
      copyToCacheDirectory: true,
      multiple: false,
    });
    if (!result.canceled) {
      console.log('Uploaded file:', result.assets[0]);
    }
    onClose();
  };

  return (
    <Modal animationType="fade" transparent visible={visible}>
      <View style={styles.overlay}>
        <View style={styles.card}>
          <Text style={styles.title}>Create new song</Text>
          <TouchableOpacity style={styles.option} onPress={() => { onClose(); navigation.navigate('record'); }}>
            <Text style={styles.optionText}>Record in app</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.option} onPress={handleUpload}>
            <Text style={styles.optionText}>Upload music from device</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={onClose} style={styles.cancelBtn}>
            <Text style={styles.cancelText}>Cancel</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  card: {
    backgroundColor: '#fff',
    borderRadius: 40,
    padding: 24,
    width: '60%',
    alignItems: 'center',
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 16,
  },
  option: {
    backgroundColor: '#BB76DA',
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 20,
    marginBottom: 12,
    width: '60%',
    alignItems: 'center',
  },
  optionText: {
    color: '#fff',
    fontWeight: '600',
    fontSize: 16,
  },
  cancelBtn: {
    marginTop: 10,
  },
  cancelText: {
    color: '#470A4E',
    fontWeight: '500',
  },
});
