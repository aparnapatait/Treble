// record.tsx
import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  Switch
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import type { RootStackParamList } from '../app/AppNavigator';
import DropdownSelector from './DropdownSelector';
import { Image } from 'react-native';
import { useAudioRecorder, RecordingOptions, AudioModule, RecordingPresets } from 'expo-audio';
import * as FileSystem from 'expo-file-system';
import { Audio } from 'expo-av';
import { useEffect } from 'react';
import { Alert } from 'react-native';

export default function RecordInAppScreen() {
  const [tempo, setTempo] = useState(71);
  const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>();

  const timeSignatures = ['2/2', '2/4', '3/4', '4/4', '5/4', '6/8', '7/8'];
  const keySignatures = [
  'C Major', 'G Major', 'D Major', 'A Major', 'E Major', 'B Major', 'F# Major', 'C# Major',
  'F Major', 'Bb Major', 'Eb Major', 'Ab Major', 'Db Major', 'Gb Major', 'Cb Major',
  'A Minor', 'E Minor', 'B Minor', 'F# Minor', 'C# Minor', 'G# Minor', 'D# Minor', 'A# Minor',
  'D Minor', 'G Minor', 'C Minor', 'F Minor', 'Bb Minor', 'Eb Minor', 'Ab Minor'
];

const [selectedInstruments, setSelectedInstruments] = useState([
  'Piano', 'Guitar', 'Strings', 'Drums'
]);
const [searchQuery, setSearchQuery] = useState('');
const allInstruments = ['Piano', 'Guitar', 'Strings', 'Drums', 'Bass', 'Synth', 'Violin', 'Flute', 'Trumpet', 'Saxophone', 'Choir', 'Harp', 'Cello', 'Clarinet'];

const [showInstrumentModal, setShowInstrumentModal] = useState(false);

const [selectedTimeSig, setSelectedTimeSig] = useState('Auto');

const [selectedKeySig, setSelectedKeySig] = useState('Auto');

const [sentimentOn, setSentimentOn] = useState(false);
const [metronomeOn, setMetronomeOn] = useState(false);

const OnOffPill = ({ enabled, onToggle }: { enabled: boolean; onToggle: () => void }) => (
  <TouchableOpacity
    style={[styles.pill, { backgroundColor: '#fff', borderColor: '#470A4E' }]}
    onPress={onToggle}
  >
    <Text style={[styles.pillText, { color: '#470A4E' }]}>
      {enabled ? 'On' : 'Off'}
    </Text>
  </TouchableOpacity>
);

// recording audio
  const audioRecorder = useAudioRecorder(RecordingPresets.HIGH_QUALITY);
  const [isRecording, setIsRecording] = useState(false);
  const [recording, setRecording] = useState<Audio.Recording | null>(null);
  const [recordedURI, setRecordedURI] = useState<string | null>(null);
  const [sound, setSound] = useState<Audio.Sound | null>(null);

  const startRecording = async () => {
  try {
    await Audio.setAudioModeAsync({
      allowsRecordingIOS: true,
      playsInSilentModeIOS: true,
    });

    const { recording } = await Audio.Recording.createAsync(
      Audio.RecordingOptionsPresets.HIGH_QUALITY
    );
    setRecording(recording);
    setIsRecording(true);
  } catch (err) {
    console.error('Failed to start recording', err);
  }
};

const stopRecording = async () => {
  try {
    if (!recording) return;

    await recording.stopAndUnloadAsync();
    const uri = recording.getURI();
    setRecordedURI(uri);
    console.log('Recording stored at:', uri);

    setRecording(null);
    setIsRecording(false);
  } catch (err) {
    console.error('Failed to stop recording', err);
  }
};

const playRecording = async () => {
  if (!recordedURI) return;

  try {
    const { sound: playbackObject } = await Audio.Sound.createAsync(
      { uri: recordedURI },
      { shouldPlay: true }
    );
    setSound(playbackObject);

    playbackObject.setOnPlaybackStatusUpdate((status) => {
      if ((status as any).didJustFinish) {
        playbackObject.unloadAsync();
        setSound(null);
      }
    });
  } catch (error) {
    console.error('Error playing audio:', error);
  }
};

  useEffect(() => {
    (async () => {
      const status = await AudioModule.requestRecordingPermissionsAsync();
      if (!status.granted) {
        Alert.alert('Permission to access microphone was denied');
      }
    })();
  }, []);

  return (
    <LinearGradient colors={['#470A4E', '#DBAAE0']} style={styles.gradient}>
      <ScrollView contentContainerStyle={styles.container}>
        <Text style={styles.header}>Create new song</Text>

{/* key signature dropdown */}
<DropdownSelector
  label="Choose key signature"
  options={keySignatures}
  selectedValue={selectedKeySig}
  onSelect={setSelectedKeySig}
/>

<DropdownSelector
  label="Choose time signature"
  options={timeSignatures}
  selectedValue={selectedTimeSig}
  onSelect={setSelectedTimeSig}
/>

        {/* Tempo Picker */}
        <Text style={styles.label}>Choose tempo</Text>
        <View style={styles.tempoControl}>
          <TouchableOpacity onPress={() => setTempo(t => Math.max(20, t - 1))}>
            <Ionicons name="remove" size={24} color="#fff" />
          </TouchableOpacity>
          <View style={styles.tempoBox}>
            <Text style={styles.tempoText}>{tempo}</Text>
            <Text style={styles.tapTempo}>Tap Tempo</Text>
          </View>
          <TouchableOpacity onPress={() => setTempo(t => t + 1)}>
            <Ionicons name="add" size={24} color="#fff" />
          </TouchableOpacity>
        </View>

        {/* Instruments */}
        <Text style={styles.label}>Choose instruments</Text>

        <View style={styles.instrumentBox}>
            {selectedInstruments.map((inst, idx) => (
            <TouchableOpacity key={idx} style={styles.tag}
                onPress={() => setSelectedInstruments((prev) => prev.filter((_, i) => i !== idx)
            )}>
                <Text style={styles.tagText}>{inst} ✕</Text>
            </TouchableOpacity>
        ))}
        </View>
        <TouchableOpacity style={styles.addBtn} onPress={() => setShowInstrumentModal(true)}>
                <Ionicons name="add" size={30} color="#470A4E" />
            </TouchableOpacity>

        {showInstrumentModal && (
  <View style={styles.modalOverlay}>
    <View style={styles.modalBox}>
      <Text style={styles.modalTitle}>Add Instrument</Text>
      <TextInput
        placeholder="Search..."
        style={styles.searchInput}
        placeholderTextColor="#999"
        value={searchQuery}
        onChangeText={setSearchQuery}
      />
      <ScrollView style={{ maxHeight: 150 }}>
        {allInstruments
          .filter((inst) =>
            inst.toLowerCase().includes(searchQuery.toLowerCase())
          )
          .map((inst, idx) => (
            <TouchableOpacity
              key={idx}
              style={styles.dropdownItem}
              onPress={() => {
                if (!selectedInstruments.includes(inst)) {
                  setSelectedInstruments([...selectedInstruments, inst]);
                }
                setShowInstrumentModal(false);
                setSearchQuery('');
              }}
            >
              <Text>{inst}</Text>
            </TouchableOpacity>
          ))}
      </ScrollView>

      <TouchableOpacity
        onPress={() => setShowInstrumentModal(false)}
        style={{ marginTop: 10 }}
      >
        <Text style={{ color: '#470A4E', textAlign: 'center' }}>Cancel</Text>
      </TouchableOpacity>
    </View>
  </View>
)}

        {/* Lyrics Box */}
        <Text style={styles.label}>Lyrics</Text>
        <TextInput
          multiline
          style={styles.lyricInput}
          placeholder="Enter your lyrics..."
          placeholderTextColor="#aaa"
        />

          {/* Toggles */}
        <View style={styles.toggleRow}>
          <Text style={styles.label}>Sentiment analysis:</Text>
          <View style={{ right: 1000 }}>
          <OnOffPill enabled={sentimentOn} onToggle={() => setSentimentOn(!sentimentOn)} />
            </View>
        </View>

        <View style={styles.toggleRow}>
          <View style={{ flexDirection: 'row', alignItems: 'center' }}>
            <Text style={styles.label}>Record audio</Text>
            <Text style={styles.metronomeText}>Metronome</Text>
            <OnOffPill enabled={metronomeOn} onToggle={() => setMetronomeOn(!metronomeOn)} />
          </View>
        </View>

        {/* Record Button */}
        <TouchableOpacity style={styles.recordBtn} onPress={isRecording ? stopRecording : startRecording}>
          <Ionicons name={isRecording ? 'stop' : 'mic'} size={24} color="#470A4E" />
        </TouchableOpacity>
        {recordedURI && (
        <TouchableOpacity style={styles.recordBtn} onPress={playRecording}>
          <Ionicons name="play" size={24} color="#470A4E" />
        </TouchableOpacity>
)}
      </ScrollView>

      {/* Navbar */}
      <View style={styles.navbar}>
        <TouchableOpacity onPress={() => navigation.navigate('home')}>
            <Image source={require('./assets/icons/House.png')} style={{ width: 32, height: 33 }} />
        </TouchableOpacity>
        <Image source={require('./assets/icons/PurpleMic.png')} style={{ width: 33, height: 33 }} />
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
  container: { padding: 20, flexGrow: 1 },
  header: { fontSize: 24, fontWeight: 'bold', color: '#fff', marginBottom: 20 },
  label: { fontSize: 16, fontWeight: '600', color: '#000', marginBottom: 8 },

  tempoControl: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#7E3E95',
    padding: 8,
    paddingBottom: 16,
    borderRadius: 20,
    marginBottom: 16,
    justifyContent: 'space-between',
    width: 335,
    height: 50,
  },
  tempoBox: {
    alignItems: 'center',
    paddingHorizontal: 16,
  },
  tempoText: { fontSize: 24, color: '#fff', fontWeight: 'bold' },
  tapTempo: { fontSize: 10, color: '#fff' },

  dropdown: {
    backgroundColor: '#fff',
    padding: 12,
    borderRadius: 20,
    marginBottom: 16,
  },

  instrumentBox: {
    backgroundColor: '#fff',
    borderRadius: 20,
    width: 335,
    height: 76,
    padding: 10,
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 6,
    marginBottom: 10,
  },
  tag: {
    backgroundColor: '#A2D5F2',
    paddingHorizontal: 4,
    height: 18,
    borderRadius: 18,
    fontSize: 12,
    color: '#470A4E',
    fontWeight: '400',
    textAlign:'center',
  },

  addBtn: {
    backgroundColor: '#BB76DA',
    width: 50,
    height: 50,
    borderRadius: 100,
    justifyContent: 'center',
    alignItems: 'center',
    left: 315,
    bottom: 40,
  },

  lyricInput: {
    backgroundColor: '#fff',
    borderRadius: 20,
    width: 335,
    height: 96,
    padding: 10,
    textAlignVertical: 'top',
    marginBottom: 20,
  },

  analyzeBtn: {
    position: 'absolute',
    left: 330,
    bottom: 180,
    height: 50,
    width: 50,
    backgroundColor: '#BB76DA',
    padding: 10,
    borderRadius: 100,
    justifyContent: 'center',
    alignItems: 'center',
  },

  toggleRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
  },

  recordBtn: {
    backgroundColor: '#BB76DA',
    alignSelf: 'center',
    padding: 14,
    borderRadius: 100,
    marginTop: 10,
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
  dropdownItem: {
  backgroundColor: '#fff',
  padding: 10,
  borderRadius: 10,
  marginBottom: 5,
  marginLeft: 8,
  marginRight: 8,
  elevation: 1,
},

tagText: {
  fontSize: 12,
  color: '#470A4E',
  fontWeight: '400',
},

modalOverlay: {
  position: 'absolute',
  top: 0,
  left: 0,
  right: 0,
  bottom: 0,
  backgroundColor: 'rgba(0,0,0,0.4)',
  justifyContent: 'center',
  alignItems: 'center',
  zIndex: 999,
},

modalBox: {
  backgroundColor: '#fff',
  padding: 20,
  borderRadius: 16,
  width: 300,
},

modalTitle: {
  fontWeight: 'bold',
  fontSize: 18,
  marginBottom: 10,
  color: '#470A4E',
},

searchInput: {
  backgroundColor: '#f0f0f0',
  borderRadius: 10,
  padding: 10,
  marginBottom: 10,
  color: '#000',
},

pill: {
  paddingHorizontal: 10,
  paddingVertical: 4,
  borderRadius: 16,
  shadowOffset: {width: 0, height: 1},
  width: 60,
  height: 28,
},
pillText: {
  fontSize: 12,
  fontWeight: '600',
  alignSelf:'center',
},
metronomeText: {
  fontSize: 12,
  color: '#000',
  marginLeft: 12,
  marginRight: 6,
  marginTop: -3,
},

});