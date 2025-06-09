# --- rhythm_utils.py ---
import librosa

def estimate_multiple_tempos(y, sr):
    print("\nEstimating multiple tempo candidates...")
    onset_env = librosa.onset.onset_strength(y=y, sr=sr)
    tempos = librosa.beat.tempo(onset_envelope=onset_env, sr=sr, aggregate=None)
    print("Top 5 tempo candidates (BPM):")
    for bpm in tempos[:5]:
        print(f"  {bpm:.2f}")
    return tempos

def group_notes_into_measures(grouped_notes, tempo, time_signature="4/4"):
    print("\nGrouping notes into measures...")
    bps = tempo / 60.0
    beats_per_measure = int(time_signature.split("/")[0])
    for note in grouped_notes:
        start_beat = note["start"] * bps
        end_beat = note["end"] * bps
        note["start_beat"] = start_beat
        note["duration_beats"] = end_beat - start_beat
        note["measure"] = int(start_beat // beats_per_measure)
    return grouped_notes

def filter_by_duration_fill_gaps(grouped_notes, tempo, min_note_ratio=0.2):
    beat_duration = 60.0 / tempo
    min_duration = beat_duration * min_note_ratio
    filtered = [n for n in grouped_notes if (n["end"] - n["start"]) >= min_duration]
    if not filtered:
        return []
    result = [filtered[0]]
    for i in range(1, len(filtered)):
        prev = result[-1]
        curr = filtered[i]
        if curr["start"] > prev["end"]:
            prev = prev.copy()
            prev["end"] = curr["start"]
            result[-1] = prev
        result.append(curr)
    return result

def sample_dominant_notes(grouped_notes, interval_sec=0.5):
    sampled = []
    t = 0
    max_end = max(n["end"] for n in grouped_notes)
    while t < max_end:
        candidates = [n for n in grouped_notes if n["start"] <= t < n["end"]]
        if candidates:
            dominant = max(candidates, key=lambda n: n["end"] - n["start"])
            if not sampled or sampled[-1]["note"] != dominant["note"]:
                sampled.append(dominant)
        t += interval_sec
    return sampled
