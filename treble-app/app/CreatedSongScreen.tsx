// CreatedSongScreen.tsx
import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image, ScrollView } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';
import Dropdown from './Dropdown';
import { useNavigation } from '@react-navigation/native';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import type { RootStackParamList } from '../app/AppNavigator';

export default function CreatedSongScreen() {
  const [selectedKey, setSelectedKey] = useState('D major');
  const [selectedTempo, setSelectedTempo] = useState('67 bpm');
  const [selectedTimeSig, setSelectedTimeSig] = useState('2/2');

  const keyOptions = ['C major', 'D major', 'E major', 'F major', 'G major'];
  const tempoOptions = ['60 bpm', '67 bpm', '72 bpm', '80 bpm'];
  const timeSigOptions = ['2/2', '2/4', '3/4', '4/4', '6/8'];

  const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>();

  return (
    <LinearGradient colors={['#470A4E', '#DBAAE0']} style={styles.gradient}>
      <ScrollView contentContainerStyle={styles.container}>
        <Text style={styles.title}>Better days</Text>

        <View style={styles.imageBox}>
          <Image source={require('./assets/icons/logo.png')} style={styles.logo} resizeMode="contain" />
        </View>

        {/* Audio waveform + play button */}
        <TouchableOpacity style={styles.audioBox}>
          <Ionicons name="play" size={18} color="#470A4E" />
          <Image source={require('./assets/icons/Waveform.png')} style={styles.wave} resizeMode="stretch" />
        </TouchableOpacity>

        {/* Dropdowns */}
        <View style={styles.dropdownSection}>
  <View style={{ marginBottom: 6 }}>
    <Text style={styles.dropdownLabel}>Duration: 2:43</Text>
  </View>

  <View style={styles.inlineRow}>
    <Text style={styles.dropdownLabel}>Key:</Text>
    <View style={styles.dropdownContainer}>
      <Dropdown value={selectedKey} options={keyOptions} onChange={setSelectedKey} />
    </View>
  </View>

  <View style={styles.inlineRow}>
    <Text style={styles.dropdownLabel}>Tempo:</Text>
    <View style={styles.dropdownContainer}>
      <Dropdown value={selectedTempo} options={tempoOptions} onChange={setSelectedTempo} />
    </View>
  </View>

  <View style={styles.inlineRow}>
    <Text style={styles.dropdownLabel}>Time Signature:</Text>
    <View style={styles.dropdownContainer}>
      <Dropdown value={selectedTimeSig} options={timeSigOptions} onChange={setSelectedTimeSig} />
    </View>
  </View>
</View>

        {/* Buttons */}
        <View style={styles.iconRow}>
          <TouchableOpacity style={styles.iconBtn}>
            <Image source={require('./assets/icons/Download.png')} resizeMode="contain" />
            <Text style={styles.iconLabel}>Download</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.iconBtn}>
            <Image source={require('./assets/icons/Save.png')} resizeMode="contain" />
            <Text style={styles.iconLabel}>Save</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.iconBtn}>
            <Image source={require('./assets/icons/Refresh.png')} resizeMode="contain" />
            <Text style={styles.iconLabel}>Regenerate</Text>
          </TouchableOpacity>
        </View>

        <TouchableOpacity style={styles.midBtn}>
          <Text style={styles.midBtnText}>Download as MIDI</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.newBtn}>
          <Text style={styles.newBtnText}>Create new song!</Text>
        </TouchableOpacity>
      </ScrollView>

    {/* Navbar */}
          <View style={styles.navbar}>
            <TouchableOpacity onPress={() => navigation.navigate('home')}>
                <Image source={require('./assets/icons/House.png')} style={{ width: 32, height: 33 }} />
            </TouchableOpacity>
            <TouchableOpacity onPress={() => navigation.navigate('record')}>
            <Image source={require('./assets/icons/Mic.png')} style={{ width: 33, height: 33 }} />
            </TouchableOpacity>
            <TouchableOpacity onPress={() => navigation.navigate('CreatedSongScreen')}>
              <Ionicons name="musical-notes" size={24} color="black" /></TouchableOpacity>
            <TouchableOpacity><Ionicons name="bookmark" size={24} color="black" /></TouchableOpacity>
            <TouchableOpacity><Ionicons name="person" size={24} color="black" /></TouchableOpacity>
          </View>

    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  gradient: { flex: 1 },
  container: { padding: 20, alignItems: 'flex-start' },
  title: { fontSize: 24, fontWeight: 'bold', color: '#fff', marginBottom: 20 },

  dropdownLabel: {
  color: '#000',
  fontSize: 14,
  fontWeight: '500',
  marginRight: 6,
},

inlineRow: {
  flexDirection: 'row',
  alignItems: 'center',
  marginBottom: 8,
},

dropdownContainer: {
  flex: 1,
},

  imageBox: {
    backgroundColor: '#fff',
    borderRadius: 20,
    width: 350,
    height: 320,
    marginBottom: 12,
    justifyContent: 'center',
    alignItems: 'center',
  },
  logo: { width: 96, height: 280 },

  audioBox: {
    width: 350,
    height: 50,
    backgroundColor: '#DBAAE0',
    borderRadius: 20,
    padding: 12,
    marginBottom: 12,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
  },
  wave: {
    width: 280,
    height: 100,
  },
  dropdownSection: {
    width: 350,
    height: 112,
    backgroundColor: '#DBAAE0',
    borderRadius: 20,
    paddingHorizontal: 12,
  },
  metadata: {
    color: '#000',
    padding: 8,
    fontSize: 16,
    fontWeight: 400,
  },
  iconRow: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    width: '100%',
    marginVertical: 10,
  },
  iconBtn: {
    alignItems: 'center',
    padding: 12,
  backgroundColor: '#BB76DA',
  width: 50,
  height: 50,
  borderRadius: 25,
  elevation: 4,
  shadowColor: '#000',
  shadowOffset: { width: 0, height: 2 },
  shadowOpacity: 0.2,
  shadowRadius: 4,
  },
  iconLabel: {
    color: '#000',
    marginTop: 15,
    fontSize: 12,
  },
  midBtn: {
    backgroundColor: '#Bb76da',
    paddingVertical: 12,
    borderRadius: 30,
    width: 260,
    alignItems: 'center',
    marginBottom: 10,
    marginTop: 20,
    elevation: 4,
  shadowColor: '#000',
  shadowOffset: { width: 0, height: 2 },
  shadowOpacity: 0.2,
  shadowRadius: 4,
  alignSelf: 'center',
  },
  midBtnText: {
    color: '#000',
    fontWeight: 'bold',
  },
  newBtn: {
    backgroundColor: '#bb76da',
    paddingVertical: 12,
    borderRadius: 30,
    width: 260,
    alignItems: 'center',
    alignSelf: 'center',
    elevation: 4,
  shadowColor: '#000',
  shadowOffset: { width: 0, height: 2 },
  shadowOpacity: 0.2,
  shadowRadius: 4,
  },
  newBtnText: {
    color: '#fff',
    fontWeight: 'bold',
  },
  navbar: {
    position: 'relative',
    bottom: 0,
    left: 0,
    right: 0,
    height: 60,
    backgroundColor: '#fff',
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    paddingBottom: 10,
    paddingTop: 10,
  },
});
