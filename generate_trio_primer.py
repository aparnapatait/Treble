from note_seq import NoteSequence, sequence_proto_to_midi_file

seq = NoteSequence()
seq.ticks_per_quarter = 220
seq.tempos.add(qpm=120)
seq.time_signatures.add(numerator=4, denominator=4)

# Lead (program 0)
for i in range(0, 32, 4):
    note = seq.notes.add()
    note.instrument = 0
    note.program = 0
    note.pitch = 60 + (i % 4)  # C-D-E-F loop
    note.velocity = 100
    note.start_time = i
    note.end_time = i + 1

# Bass (program 32)
for i in range(0, 32, 4):
    note = seq.notes.add()
    note.instrument = 1
    note.program = 32
    note.pitch = 36 + (i % 4)  # Low notes
    note.velocity = 100
    note.start_time = i
    note.end_time = i + 1

# Drums (channel 9)
for i in range(0, 32, 2):
    note = seq.notes.add()
    note.instrument = 9
    note.is_drum = True
    note.pitch = 36 if i % 4 == 0 else 38  # Kick and snare pattern
    note.velocity = 100
    note.start_time = i
    note.end_time = i + 0.5

seq.total_time = 32

sequence_proto_to_midi_file(seq, "trio_primer.mid")
print("Saved trio_primer.mid")
