# --- key_utils.py ---
import librosa
import numpy as np
import pretty_midi

def estimate_key(y, sr):
    print("\nEstimating key using chroma analysis...")
    chroma = librosa.feature.chroma_stft(y=y, sr=sr)
    chroma_mean = np.mean(chroma, axis=1)
    key_index = np.argmax(chroma_mean)
    key_list = ['C', 'C#', 'D', 'D#', 'E', 'F', 
                'F#', 'G', 'G#', 'A', 'A#', 'B']
    estimated_key = key_list[key_index]
    print(f"Estimated Key: {estimated_key}")
    return estimated_key

def transpose_to_key(notes, from_key, to_key):
    key_list = ['C', 'C#', 'D', 'D#', 'E', 'F', 
                'F#', 'G', 'G#', 'A', 'A#', 'B']
    shift = key_list.index(to_key) - key_list.index(from_key)

    transposed_notes = []
    for note in notes:
        try:
            midi_number = pretty_midi.note_name_to_number(note["note"].replace("\u266f", "#"))
            midi_number += shift
            transposed_name = pretty_midi.note_number_to_name(midi_number)
            note_copy = note.copy()
            note_copy["note"] = transposed_name
            transposed_notes.append(note_copy)
        except:
            print(f"Skipping transposition for note: {note['note']}")
            continue

    return transposed_notes
