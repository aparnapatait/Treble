import librosa
import librosa.display
import numpy as np
import matplotlib.pyplot as plt

y, sr = librosa.load("trial lil dancing pieces.wav")
plt.figure(figsize=(10, 4))
librosa.display.waveshow(y, sr=sr)
plt.title("Waveform")
plt.xlabel("Time (s)")
plt.ylabel("Amplitude")
plt.tight_layout()
plt.savefig("waveform.png")

y = y[int(sr * 5):int(sr * 10)]

# Run pitch estimation
f0, voiced_flag, voiced_probs = librosa.pyin(
    y,
    fmin=librosa.note_to_hz('C2'),
    fmax=librosa.note_to_hz('C7'),
    sr=sr
)

# Filter out NaN values before converting to notes
f0_clean = f0[~np.isnan(f0)]
notes = librosa.hz_to_note(f0_clean, octave=True, cents=True)

print("First 10 notes:", notes[:10])
# Plot
times = librosa.times_like(f0)
plt.figure(figsize=(14, 4))
plt.plot(times, f0, label='F0', color='magenta')
plt.xlabel("Time (s)")
plt.ylabel("Frequency (Hz)")
plt.title("Estimated Pitch (f0)")
plt.grid()
plt.savefig("waveform2")