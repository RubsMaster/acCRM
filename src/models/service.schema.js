import mongoose from 'mongoose';

const serviceSchema = new mongoose.Schema({
  client: {
    type: mongoose.Schema.ObjectId,
    ref: 'Client',
    required: [true, 'La referencia al cliente es obligatoria']
  },
  date: {
    type: Date,
    required: [true, 'La fecha de servicio es obligatoria']
  },
  address: {
    type: String,
    required: true
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
    compressor: {
      type: String,
      enum: {
        values: ['Inverter', 'Convencional'],
        message: 'El compresor debe ser "Inverter" o "Convencional"'
      }
    },
    tonnage: Number,
    gas: {
      type: String,
      enum: {
        values: ['R-410A', 'R-32', 'R-22'],
        message: 'El gas debe ser "R-410A", "R-32" o "R-22"'
      }
    },
  },
  done: {
    type: Boolean,
    default: false
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

export default mongoose.model('Service', serviceSchema);