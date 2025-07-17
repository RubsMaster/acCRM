import mongoose from 'mongoose';
const clientSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true
  },
  phoneNumber: {
    type: Number,
    required: [true, 'El número de teléfono es obligatorio y único.'],
    unique: true
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});
export default mongoose.model('Client', clientSchema);