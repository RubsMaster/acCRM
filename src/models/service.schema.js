import mongoose from 'mongoose';
const clientSchema = new mongoose.Schema({
  client: {
    type: mongoose.Schema.ObjectId,
    ref: 'Client',
    required: [true, 'La referencia al cliente es obligatoria']
  },
  date: {
    type: Date,
    required: [true, 'La fecha de servicio es obligatoria']
  },
  type: {
    type: String,
    required: [true, 'El tipo de servicio es obligatorio'],
    enum: ['Instalación', 'Mantenimiento Preventivo', 'Reparación', 'Diagnóstico']
  },
  cost: {
    type: Number,
    required: true,
  },
  equipment: {
    brand: String,
    model: String,
    serialNumber: String,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});
export default mongoose.model('Client', clientSchema);