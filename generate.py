from magenta.models.music_vae import configs
from magenta.models.music_vae.trained_model import TrainedModel
from note_seq import midi_io
import note_seq

# Load the model config
config = configs.CONFIG_MAP['hierdec-trio_16bar']

# Load your primer NoteSequence
primer_path = "trio_primer.mid"  # this should be a trio MIDI file
primer_ns = midi_io.midi_file_to_note_sequence(primer_path)

# Initialize the model
model = TrainedModel(
    config=config,
    batch_size=1,
    checkpoint_dir_or_path="checkpoints/hierdec-trio_16bar/hierdec-trio_16bar.ckpt"
)

# # Encode the primer to latent vector
# z = model.encode([primer_ns] * 4)

# print("Latent z shape:", z.shape)

# # Decode it into a new sample based on the encoded vector
# generated_sequence = model.decode(z, length=256)[0]

# # Save the result
# output_path = "trio_output_from_primer.mid"
# midi_io.sequence_proto_to_midi_file(generated_sequence, output_path)
# print(f"Saved generated trio to {output_path}")

# Encode the primer
z_tuple = model.encode([primer_ns] * 4)

# Unpack the tuple — we only care about the first element, the latents
z = z_tuple[0]  # This should be the actual latent vector array

# Print to debug
import numpy as np
z = np.array(z)
print("Latent vector shape:", z.shape)

# Stack if necessary
if z.shape == (4,) and hasattr(z[0], 'shape') and z[0].shape == (512,):
    z = np.stack(z)

# Decode
generated_sequence = model.decode(z, length=256)[0]
midi_io.sequence_proto_to_midi_file(generated_sequence, "trio_output_from_primer.mid")
print("Saved generated trio to trio_output_from_primer.mid")