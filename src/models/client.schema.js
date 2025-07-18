import mongoose from 'mongoose';
const clientSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true
  },
  phoneNumber: {
    type: String,
    required: [true, 'El número de teléfono es obligatorio y único.'],
    unique: true,
    validate: {
      validator: (v) => { return /^\d{10}$/.test(v); },
      message: props => `${props.value} no es un número válido de 10 dígitos`
    },
    set: v => v.replace(/\D/g, '')
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});
export default mongoose.model('Client', clientSchema);