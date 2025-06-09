// components/DropdownSelector.tsx
import React, { useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  StyleSheet,
  Modal,
  Dimensions,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';

type DropdownSelectorProps = {
  label: string;
  options: string[]; // options should NOT include "Auto" — it will be prepended automatically
  selectedValue: string;
  onSelect: (value: string) => void;
};

const DropdownSelector: React.FC<DropdownSelectorProps> = ({
  label,
  options,
  selectedValue,
  onSelect,
}) => {
  const [modalVisible, setModalVisible] = useState(false);
  const allOptions = ['Auto', ...options];

  return (
    <View style={styles.wrapper}>
      <Text style={styles.label}>{label}</Text>
      <TouchableOpacity
        style={styles.selector}
        onPress={() => setModalVisible(true)}
      >
        <View style={styles.selectorContent}>
          <Text style={styles.selectorText}>{selectedValue}</Text>
          <Ionicons name="chevron-down" size={16} color="#470A4E" style={{ marginLeft: 4 }} />
        </View>
      </TouchableOpacity>

      <Modal
        visible={modalVisible}
        transparent
        animationType="fade"
        onRequestClose={() => setModalVisible(false)}
      >
        <TouchableOpacity
          style={styles.overlay}
          activeOpacity={1}
          onPressOut={() => setModalVisible(false)}
        >
          <View style={styles.dropdown}>
            <ScrollView>
              {allOptions.map((option, index) => (
                <TouchableOpacity
                  key={index}
                  style={styles.option}
                  onPress={() => {
                    onSelect(option);
                    setModalVisible(false);
                  }}
                >
                  <Text style={styles.optionText}>{option}</Text>
                </TouchableOpacity>
              ))}
            </ScrollView>
          </View>
        </TouchableOpacity>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  wrapper: {
    marginBottom: 16,
  },
  label: {
    fontSize: 16,
    fontWeight: '600',
    color: '#000',
    marginBottom: 8,
  },
  selector: {
    backgroundColor: '#fff',
    paddingVertical: 10,
    paddingHorizontal: 16,
    borderRadius: 20,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: 335,
    height: 45,
  },
  selectorContent: {
  flex: 1,
  flexDirection: 'row',
  alignItems: 'center',
  justifyContent: 'center',
},
  selectorText: {
    color: '#470A4E',
    fontWeight: '600',
    fontSize: 16,
  },
  overlay: {
    flex: 1,
    justifyContent: 'center',
    paddingHorizontal: 30,
    backgroundColor: 'rgba(0,0,0,0.3)',
    zIndex: 999,
  },
  dropdown: {
    backgroundColor: '#fff',
    borderRadius: 15,
    maxHeight: Dimensions.get('window').height * 0.4,
    paddingVertical: 8,
    width: 150,
    paddingHorizontal: 12,
    elevation: 10,
    alignSelf:'auto',
  },
  option: {
    paddingVertical: 10,
    paddingHorizontal: 6,
    borderBottomWidth: 0.5,
    borderBottomColor: '#ccc',
  },
  optionText: {
    color: '#470A4E',
    fontWeight: '500',
  },
});

export default DropdownSelector;
