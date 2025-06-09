//home.tsx
import 'react-native-gesture-handler';
import { handlePenPress, handleRefresh } from '../app/components';
import { LinearGradient } from 'expo-linear-gradient';
import { View, Text, ScrollView, StyleSheet, Dimensions, TouchableOpacity, TextInput } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useState } from 'react';
import { useNavigation } from '@react-navigation/native';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import type { RootStackParamList } from '../app/AppNavigator';
import { Pressable } from 'react-native';
import MemoOverlay from './MemoOverlay';
import UploadOverlay from './UploadOverlay';
import { Image } from 'react-native';

export default function HomeScreen() {
const [selectedMood, setSelectedMood] = useState('Melancholy');
const [dropdownVisible, setDropdownVisible] = useState(false);
const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>();
const moodOptions = ['Melancholy', 'Hopeful', 'Angry', 'Joyful'];
const [selectedMemo, setSelectedMemo] = useState(null);
const [overlayVisible, setOverlayVisible] = useState(false);
const [memos, setMemos] = useState([
    { title: 'those callaways', text: "i can't believe after all this time..." },
    { title: 'aladdin', text: "if you knew dreams could..." },
    { title: 'how a good girl...', text: "i’ll cry my angel tears..." },
    { title: 'better days', text: "ouija, we didn't watch it..." },
  ]);

const openOverlay = (memo, idx) => {
  setSelectedMemo(memo);
  setSelectedMemoIndex(idx);
  setOverlayVisible(true);
};

const deleteMemo = (idx: number) => {
  setLastDeletedMemo(memos[idx]);
  setLastDeletedIndex(idx);

  const updated = [...memos];
  updated.splice(idx, 1);
  setMemos(updated);
  setOverlayVisible(false);
};

const undoDelete = () => {
  if (lastDeletedMemo && lastDeletedIndex !== null) {
    const restored = [...memos];
    restored.splice(lastDeletedIndex, 0, lastDeletedMemo);
    setMemos(restored);
    setLastDeletedMemo(null);
    setLastDeletedIndex(null);
  }
};

const [lastDeletedMemo, setLastDeletedMemo] = useState(null);
const [lastDeletedIndex, setLastDeletedIndex] = useState<number | null>(null);
const [uploadOverlayVisible, setUploadOverlayVisible] = useState(false);
const [selectedMemoIndex, setSelectedMemoIndex] = useState<number | null>(null);

const updateMemoText = (idx, newText) => {
    const newMemos = [...memos];
    newMemos[idx].text = newText;
    setMemos(newMemos);
  };

const updateMemoTitle = (idx, newText) => {
    const newMemos = [...memos];
    newMemos[idx].title = newText;
    setMemos(newMemos);
  };

function toggleDropdown() {
    setDropdownVisible(prev => !prev);
  }

function selectMood(mood) {
    setSelectedMood(mood);
    setDropdownVisible(false);
  }

  return (
    <LinearGradient
      colors={['#470A4E', '#DBAAE0']}
      style={styles.gradient}
    >
    <Pressable style={{ flex: 1 }} onPress={() => setDropdownVisible(false)}>
      <ScrollView contentContainerStyle={styles.container}>
        <Text style={styles.header}>Hi, Mayim!</Text>
        <Text style={styles.subHeader}>Today’s lyrical suggestion</Text>
        <View style={styles.lyricBox}>
          <Text style={styles.lyric}>
            You took me like a prize and left{'\n'}
            An old discarded ornament{'\n'}
            When I fell to my knees and begged{'\n'}
            What was I to you?
          </Text>  
        <TouchableOpacity onPress={handleRefresh} style={styles.refreshBtn}>
            <Image source={require('./assets/icons/Refresh.png')} style={{ width: 24, height: 24 }} />
        </TouchableOpacity>
        <View style={styles.lyricControls}>
            <View style={{ position: 'relative', zIndex: 1 }}>
            <TouchableOpacity style={styles.dropdown} onPress={toggleDropdown}>
                <View style={styles.dropdownContent}>
                    <Text style={styles.dropdownText}>{selectedMood}</Text>
                    <Ionicons name="chevron-down" size={16} color="#470A4E" style={{ marginLeft: 4 }} />
                </View>
            </TouchableOpacity>

            {dropdownVisible && (
            <Pressable style={styles.dropdownList} onPress={(e) => e.stopPropagation()}>
                {moodOptions.map((mood, idx) => (
                    <TouchableOpacity key={idx} style={styles.dropdownItem} onPress={() => selectMood(mood)}>
                        <Text style={styles.dropdownItemText}>{mood}</Text>
                    </TouchableOpacity>
                ))}
                </Pressable>
            )}
            </View>
        </View>
    </View>
    <br></br>
    <Text style={styles.subHeader}>Your drafts and memos</Text>
    <View style={lyricContainer.lyricBox}>
      <ScrollView contentContainerStyle={styles.grid} showsHorizontalScrollIndicator={false}>
        {memos.map((memo, idx) => (
          <View key={idx} style={styles.memoBox}>
            <TouchableOpacity onPress={() => openOverlay(memo, idx)}>
            <Text style={styles.memoTitle}>{memo.title}</Text>
    </TouchableOpacity>
    <ScrollView style={{ maxHeight: 90 }} showsVerticalScrollIndicator={false}>
      <Text style={styles.memoText}>{memo.text}</Text>
    </ScrollView>
    <View style={styles.audioContainer}>
      <Ionicons name="mic-circle" size={20} color="white" />
    </View>
  </View>
        ))}
      </ScrollView>
      {selectedMemo && selectedMemoIndex !== null && (
  <MemoOverlay
    visible={overlayVisible}
    onClose={() => setOverlayVisible(false)}
    title={selectedMemo.title}
    text={selectedMemo.text}
    onChangeText={(text) => updateMemoText(selectedMemoIndex, text)}
    onChangeTitle={(title) => updateMemoTitle(selectedMemoIndex, title)}
    onDelete={() => deleteMemo(selectedMemoIndex)}
  />
)}

      <TouchableOpacity
  style={styles.newSongFloatingBtn}
  onPress={() => {
    const newMemo = { title: 'Untitled', text: '' };
    setMemos([newMemo, ...memos]);
  }}
>
  <Image source={require('./assets/icons/Pen.png')} style={{ width: 22, height: 28 }} />
</TouchableOpacity>

{lastDeletedMemo && (
  <TouchableOpacity
    style={{
      position: 'fixed',
      left: 285,
      bottom: -225,
      alignSelf: 'center',
      backgroundColor: '#A2C3E5',
      paddingHorizontal: 10,
      paddingVertical: 4,
      borderRadius: 20,
      zIndex: 999,
      shadowColor: '#000',
      shadowOpacity: 0.2,
      shadowOffset: { width: 0, height: 2 },
    }}
    onPress={undoDelete}
  >
    <Text style={{ color: '#470A4E', fontWeight: 'bold' }}>Undo Delete</Text>
  </TouchableOpacity>
)}
    </View>

    <TouchableOpacity
  style={styles.newSongBtn}
  onPress={() => setUploadOverlayVisible(true)}
>
  <Text style={styles.btnText}>Create new song!</Text>
</TouchableOpacity>
<UploadOverlay visible={uploadOverlayVisible} onClose={() => setUploadOverlayVisible(false)} />
    </ScrollView>  

    {/* Navbar */}
          <View style={styles.navbar}>
            <TouchableOpacity onPress={() => navigation.navigate('home')}>
                <Image source={require('./assets/icons/PurpleHouse.png')} style={{ width: 32, height: 33 }} />
            </TouchableOpacity>
            <TouchableOpacity onPress={() => navigation.navigate('record')}>
            <Image source={require('./assets/icons/Mic.png')} style={{ width: 33, height: 33 }} />
            </TouchableOpacity>
            <TouchableOpacity onPress={() => navigation.navigate('CreatedSongScreen')}>
              <Ionicons name="musical-notes" size={24} color="black" /></TouchableOpacity>
            <TouchableOpacity><Ionicons name="bookmark" size={24} color="black" /></TouchableOpacity>
            <TouchableOpacity><Ionicons name="person" size={24} color="black" /></TouchableOpacity>
          </View>
</Pressable>
</LinearGradient>
  );
}

const lyricContainer = StyleSheet.create({
    container: {
        padding: 46,
        flexGrow: 1,
    },
    lyricBox:{
        backgroundColor: '#fff',
        borderRadius: 20,
        padding: 20,
        height: 370,
        width: 345,
        flexShrink: 0,
    }
});

const styles = StyleSheet.create({
  gradient: {
    flex: 1,
  },
  container: {
    padding: 20,
    flexGrow: 1,
  },
  header: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 10,
    // fontFamily: 'Poppins_bold',
  },
  subHeader: {
    fontSize: 18,
    color: '#000',
    fontWeight: 'bold',
    marginBottom: 10,
    // fontFamily: 'Poppins_400Regular',
  },
  lyricBox: {
    backgroundColor: '#fff',
    borderRadius: 15,
    padding: 12,
    marginBottom: 20,
    width:347,
    height:'auto',
    paddingLeft:20,
    position:'relative',
    zIndex: 1,               
    overflow: 'visible',
  },
  lyric: {
    fontSize: 14,
    color: '#000',
    // fontFamily: 'Poppins_400Regular',
  },
  memoText: {
    fontSize: 12,
    color: '#fff',
    // fontFamily: 'PoorStory_400Regular',
    borderRadius: 6,
    padding: 2,
    height: 90, 
    textAlignVertical: 'top',
    overflow: 'hidden',
  },
  memoTitle: {
    fontWeight: '600',
    backgroundColor: '#A2C3E5',
    width: 131,
    height: 26, 
    borderRadius: 18,
    textAlign:'center',
    fontSize: 14,
    color: '#fff',
    alignSelf:'center',
    marginBottom: 4,
    // fontFamily: 'PoorStory_400Regular',
  },
  memoBox: {
    width: 149,
    height:140,
    backgroundColor: '#BB76DA',
    borderRadius: 10,
    padding: 12,
    marginBottom: 15,
  },
  grid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },

  btnText: {
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
    penBtn: {
  backgroundColor: '#fff',
  padding: 10,
  borderRadius: 20,
  elevation: 2,
  shadowColor: '#000',
  shadowOpacity: 0.1,
  shadowOffset: { width: 0, height: 1 },
},
lyricControls: {
  flexDirection: 'row',
  justifyContent: 'center',
  alignItems: 'center',
  marginTop: 10,
  gap: 12,
},

refreshBtn: {
  position:'absolute',
  bottom: -25,
  width: 50,
  left: 150,
  height: 50,
  backgroundColor: '#BB76DA',
  justifyContent:'center',
  alignItems: 'center',
  borderRadius: 25,
  shadowColor: '#000',
  shadowOpacity: 0.2,
  shadowOffset: { width: 0, height: 2 },
  elevation: 4,
},

newSongFloatingBtn: {
  position: 'absolute',
  bottom: -25,
  alignSelf: 'center',
  backgroundColor: '#BB76DA',
  width: 50,
  height: 50,
  borderRadius: 25,
  justifyContent: 'center',
  alignItems: 'center',
  elevation: 4,
  shadowColor: '#000',
  shadowOffset: { width: 0, height: 2 },
  shadowOpacity: 0.2,
  shadowRadius: 4,
},

newSongBtn: {
    backgroundColor: '#BB76DA',
    borderRadius: 45,
    width: 300,
    height: 60,
    padding: 20,
    marginTop:40,
    alignItems:'center',
    alignSelf:'center',
},

dropdown: {
  backgroundColor: '#A2D5F2',
  paddingHorizontal: 10,
  paddingVertical: 4,
  borderRadius: 20,
  shadowColor: '#000',
  shadowOpacity: 0.2,
  shadowOffset: { width: 0, height: 2 },
  shadowRadius: 4,
  elevation: 3,
  left: 135,
  bottom: -25,
},

dropdownContent: {
  flexDirection: 'row',
  alignItems: 'center',
},

dropdownText: {
  color: '#470A4E',
  fontWeight: '700',
  fontSize: 13,
},
dropdownList: {
  position: 'absolute',
  top: 40,
  left: 150,
  backgroundColor: '#fff',
  borderRadius: 10,
  paddingVertical: 4,
  paddingHorizontal: 0,
  elevation: 10,
  shadowColor: '#000',
  shadowOpacity: 0.15,
  shadowOffset: { width: 0, height: 2 },
  shadowRadius: 4,
  zIndex: 9999,
},

dropdownItem: {
  paddingVertical: 8,
  paddingHorizontal: 16,
},

dropdownItemText: {
  color: '#470A4E',
  fontWeight: '500',
},

audioContainer: {
    height: 24,
    width: 149,
    backgroundColor: '#DBAAE0',
    left: -12,
    marginBottom: -12,
    borderBottomLeftRadius: 10,
    borderBottomRightRadius: 10,
    paddingLeft: 4,
},
});
