# --- audio_utils.py ---
import librosa
import librosa.display
import matplotlib.pyplot as plt
import os

def load_audio(path, sr=16000):
    y, sr = librosa.load(path, sr=sr, mono=True)
    print(f"Audio loaded: {len(y)} samples at {sr} Hz")
    return y, sr

def plot_waveform(y, sr, output_path="plots/waveform.png"):
    plt.figure(figsize=(10, 4))
    librosa.display.waveshow(y, sr=sr)
    plt.title("Waveform")
    plt.xlabel("Time (s)")
    plt.ylabel("Amplitude")
    plt.tight_layout()
    plt.savefig(output_path)
    print(f"Waveform saved to {output_path}")
