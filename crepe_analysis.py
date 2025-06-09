import librosa
import crepe

# Load audio
audio, sr = librosa.load("trial lil dancing pieces.wav", sr=16000)

# Get pitch predictions
time, frequency, confidence, activation = crepe.predict(audio, sr, viterbi=True)

# Optional: Filter low-confidence frames
import numpy as np
valid = confidence > 0.8
notes = librosa.hz_to_note(frequency[valid])
print(notes)
print("Pitch values (Hz):", frequency[:10])
