import mongoose from 'mongoose';
const clientSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'El nombre es obligatorio'],
    trim: true,
    maxlength: [100, 'Máximo 100 caracteres'],
    minlength: [2, 'El nombre debe tener al menos 2 caracteres'],
    index: {
      collation: { locale: 'es', strength: 2 }
    }
  },
  phoneNumber: {
    type: String,
    required: [true, 'El número de teléfono es obligatorio y único.'],
    unique: true,
    validate: {
      validator: v => /^[0-9]{10}$/.test(v),
      message: 'Teléfono inválido, debe tener 10 dígitos'
    },
    set: v => v.replace(/\D/g, ''),
    immutable: true
  }
}, {
  timestamps: true
});
export default mongoose.model('Client', clientSchema);