# --- main.py ---
import os
from audio_utils import load_audio, plot_waveform
from pitch_utils import get_pitch_predictions, group_pitch_into_notes
from rhythm_utils import estimate_multiple_tempos, group_notes_into_measures, filter_by_duration_fill_gaps
from key_utils import estimate_key, transpose_to_key
from midi_utils import export_notes_to_midi, plot_grouped_notes
# from magenta.music import midi_io

# CONFIG
AUDIO_PATH = "trial lil dancing pieces.wav"
USER_KEY = "D"  # Optional user key (None = accept estimated)
TIME_SIGNATURE = "4/4"

def main():
    os.makedirs("plots", exist_ok=True)
    os.makedirs("output", exist_ok=True)

    y, sr = load_audio(AUDIO_PATH)
    plot_waveform(y, sr)

    t, f0 = get_pitch_predictions(y, sr)
    tempo_candidates = estimate_multiple_tempos(y, sr)

    grouped_notes = group_pitch_into_notes(t, f0)
    grouped_notes = group_notes_into_measures(grouped_notes, tempo=70, time_signature=TIME_SIGNATURE)

    estimated_key = estimate_key(y, sr)
    target_key = USER_KEY or estimated_key
    
    if estimated_key != target_key:
        print(f"Transposing from {estimated_key} to {target_key}...")
        grouped_notes = transpose_to_key(grouped_notes, estimated_key, target_key)

    filtered_notes = filter_by_duration_fill_gaps(grouped_notes, tempo=70)

    # Save notes text
    with open("output/notes.txt", "w") as f:
        for note in filtered_notes:
            f.write(f"{note['note']} {note['start']:.2f}–{note['end']:.2f}\n")
        f.write("\nTempo Candidates (BPM):\n")
        for bpm in tempo_candidates[:5]:
            f.write(f"{bpm:.2f}\n")
        f.write(f"\nEstimated Key: {estimated_key}\n")

    export_notes_to_midi(grouped_notes, output_path="output/full_melody.mid")
    export_notes_to_midi(filtered_notes, output_path="output/filtered_melody.mid")
    # ns = midi_io.midi_file_to_note_sequence("output/filtered_melody.mid")

    plot_grouped_notes(grouped_notes, output_path="plots/piano_roll.png")
    plot_grouped_notes(filtered_notes, output_path="plots/piano_roll_filtered.png")

if __name__ == "__main__":
    main()