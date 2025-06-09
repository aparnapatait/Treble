# --- midi_utils.py ---
import pretty_midi
import matplotlib.pyplot as plt
import matplotlib.patches as patches

def export_notes_to_midi(grouped_notes, output_path="output/melody.mid", instrument_name="Acoustic Grand Piano"):
    print("\nExporting to MIDI...")
    midi = pretty_midi.PrettyMIDI()
    instrument = pretty_midi.Instrument(program=pretty_midi.instrument_name_to_program(instrument_name))

    for note in grouped_notes:
        try:
            note_name = note["note"].replace("\u266f", "#")
            pitch = pretty_midi.note_name_to_number(note_name)
        except:
            print(f"Skipping invalid note: {note['note']}")
            continue

        midi_note = pretty_midi.Note(
            velocity=100,
            pitch=pitch,
            start=note["start"],
            end=note["end"]
        )
        instrument.notes.append(midi_note)

    midi.instruments.append(instrument)
    midi.write(output_path)
    print(f"MIDI file saved to {output_path}")

def plot_grouped_notes(grouped_notes, output_path="plots/piano_roll.png"):
    print("\nGenerating piano roll visualization...")
    fig, ax = plt.subplots(figsize=(12, 6))

    for note in grouped_notes:
        try:
            note_name = note["note"].replace("\u266f", "#")
            pitch = pretty_midi.note_name_to_number(note_name)
        except Exception as e:
            print(f"Skipping note {note['note']} - error: {e}")
            continue

        rect = patches.Rectangle(
            (note["start"], pitch - 0.4),
            note["end"] - note["start"],
            0.8,
            color="purple"
        )
        ax.add_patch(rect)

    if grouped_notes:
        max_time = max(note["end"] for note in grouped_notes)
        min_pitch = min(pretty_midi.note_name_to_number(n["note"].replace("\u266f", "#")) for n in grouped_notes)
        max_pitch = max(pretty_midi.note_name_to_number(n["note"].replace("\u266f", "#")) for n in grouped_notes)
        ax.set_xlim(0, max(5, max_time))
        ax.set_ylim(min_pitch - 2, max_pitch + 2)
        ax.set_yticks(range(min_pitch, max_pitch + 1))

    ax.set_xlabel("Time (s)")
    ax.set_ylabel("Pitch (MIDI number)")
    ax.set_title("Piano Roll (Grouped Notes)")
    ax.grid(True, axis='y', linestyle='--', alpha=0.3)
    plt.tight_layout()
    plt.savefig(output_path)
    print(f"Piano roll saved to {output_path}")
