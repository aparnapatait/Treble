# --- pitch_utils.py ---
import crepe
import librosa
import numpy as np

def get_pitch_predictions(y, sr, confidence_threshold=0.8):
    print("Running pitch prediction with CREPE...")
    time, frequency, confidence, activation = crepe.predict(y, sr, viterbi=True)
    valid = confidence > confidence_threshold
    f0 = frequency[valid]
    t = time[valid]
    print("Pitch prediction complete. First 5 values:")
    print(f0[:5])
    print(librosa.hz_to_note(f0))
    return t, f0

def group_pitch_into_notes(t, f0):
    grouped_notes = []
    if len(t) == 0 or len(f0) == 0:
        return grouped_notes

    current_note = librosa.hz_to_note(f0[0], octave=True, cents=False)
    start_time = t[0]

    for i in range(1, len(f0)):
        note = librosa.hz_to_note(f0[i], octave=True, cents=False)
        if note != current_note:
            grouped_notes.append({
                "note": current_note,
                "start": float(start_time),
                "end": float(t[i])
            })
            current_note = note
            start_time = t[i]

    grouped_notes.append({
        "note": current_note,
        "start": float(start_time),
        "end": float(t[-1])
    })

    return grouped_notes
