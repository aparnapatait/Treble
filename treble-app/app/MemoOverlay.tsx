// MemoOverlay.tsx
import React, { useState, useEffect } from 'react';
import { Modal, View, Text, StyleSheet, TouchableOpacity, TextInput, 
  Pressable, KeyboardAvoidingView, Platform } from 'react-native';

interface MemoOverlayProps {
  visible: boolean;
  onClose: () => void;
  title: string;
  text: string;
  onChangeText: (text: string) => void;
  onChangeTitle: (title: string) => void;
  onDelete: () => void;
}

export default function MemoOverlay({
  visible,
  onClose,
  title,
  text,
  onChangeTitle,
  onChangeText,
  onDelete,
}: MemoOverlayProps) {

  const [isEditing, setIsEditing] = useState(false);
  const [localTitle, setLocalTitle] = useState(title);
  const [localText, setLocalText] = useState(text);

  // Sync when props change
  useEffect(() => {
    setLocalTitle(title);
    setLocalText(text);
  }, [title, text]);

  const handleClose = () => {
    if (isEditing) {
      onChangeTitle(localTitle);
      onChangeText(localText);
    }
    onClose(); // close the overlay
  };

  return (
        <Modal visible={visible} transparent animationType="slide">
      <Pressable style={styles.overlayBackground} onPress={onClose}>
        <KeyboardAvoidingView
          behavior={Platform.OS === 'ios' ? 'padding' : undefined}
          style={styles.overlayBox}
        >
          <Pressable onPress={(e) => e.stopPropagation()} style={{ flex: 1 }}>
            <TextInput
              value={title}
              onChangeText={onChangeTitle}
              style={styles.title}
              placeholder="Enter title"
            />
            <TextInput
              multiline
              value={text}
              onChangeText={onChangeText}
              style={styles.content}
              placeholder="Enter your memo..."
              textAlignVertical="top"
            />
            <View style={styles.buttonRow}>
              <TouchableOpacity onPress={onClose} style={styles.closeBtn}>
                <Text style={styles.closeText}>Close</Text>
              </TouchableOpacity>
              <TouchableOpacity onPress={onDelete} style={styles.deleteBtn}>
                <Text style={styles.btnText}>Delete</Text>
              </TouchableOpacity>
            </View>
          </Pressable>
        </KeyboardAvoidingView>
      </Pressable>
    </Modal>
  );
}

const styles = StyleSheet.create({
  overlayBackground: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  overlayBox: {
    backgroundColor: '#BB76DA',
    borderRadius: 20,
    padding: 20,
    width: '85%',
  },
  title: {
    fontWeight: 'bold',
    fontSize: 18,
    marginBottom: 10,
    color: '#fff',
    borderBottomWidth: 1,
    borderColor: '#fff',
  },
  content: {
    fontSize: 14,
    height: 140,
    marginBottom: 2,
  },
   buttonRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 15,
  },
  deleteBtn: {
    backgroundColor: '#D95C5C',
    padding: 4,
    paddingLeft: 8,
    paddingRight: 8,
    borderRadius: 8,
  },
  btnText: {
    color: '#fff',
    fontWeight: 'bold',
  },
  closeBtn: {
    alignSelf: 'flex-end',
    backgroundColor: '#BB76DA',
    paddingHorizontal: 14,
    paddingVertical: 2,
    borderRadius: 8,
  },
  closeText: {
    color: '#fff',
    fontWeight: 'bold',
  },
  titleInput: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
    borderBottomWidth: 1,
  },
  contentInput: {
    fontSize: 16,
    height: 120,
    textAlignVertical: 'top',
    borderWidth: 1,
    padding: 8,
    borderRadius: 8,
    marginBottom: 20,
  },
  inputTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
    paddingLeft: 4,
  },
  inputContent: {
    fontSize: 16,
    height: 120,
    textAlignVertical: 'top',
    borderRadius: 8,
    paddingLeft: 4,
  },
  editBtn: {
    marginTop: 20,
    backgroundColor: '#BB76DA',
    padding: 10,
    borderRadius: 10,
  },
  saveBtn: {
    marginTop: 20,
    backgroundColor: '#A2C3E5',
    padding: 10,
    borderRadius: 10,
  },
  saveText: {
    color: '#fff',
    textAlign: 'center',
    fontWeight: '600',
  },
  editText: {
    color: '#fff',
    textAlign: 'center',
    fontWeight: '600',
  },
});