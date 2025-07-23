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
    required: [true, 'La dirección del servicio es obligatoria'],
    trim: true
  },
  type: {
    type: String,
    required: [true, 'El tipo de servicio es obligatorio'],
    enum: ['Instalación', 'Mantenimiento Preventivo', 'Reparación', 'Diagnóstico']
  },
  cost: {
    type: Number,
    required: [true, 'Debe registrar un costo, si no se cobró, ingresar 0'],
    min: [0, 'El valor mínimo es 0. No se pueden ingresar valores negativos']
  },
  equipment: {
    brand: { 
      type: String, 
      trim: true,
      required: [true, 'La marca del equipo es obligatoria']
    },
    model: { 
      type: String, 
      trim: true,
      required: [true, 'El modelo del equipo es obligatoria']
    },
    compressor: {
      type: String,
      trim: true,
      required: [true, 'El tipo de compresor del equipo es obligatoria'],
      enum: {
        values: ['Inverter', 'Convencional'],
        message: 'El compresor debe ser "Inverter" o "Convencional"'
      }
    },
    tonnage: {
      type: Number,
      min: [0, 'El tonelaje no puede ser negativo']
    },
    gas: {
      type: String,
      trim: true,
      required: [true, 'El tipo de gas compatible con el equipo es obligatorio'],
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
  notes: {
    type: String,
    trim: true,
    maxlength: [255, 'La dirección no puede exceder los 255 caracteres']
  }
}, {
  timestamps: true
});
serviceSchema.index({ client: 1, date: -1 });
export default mongoose.model('Service', serviceSchema);