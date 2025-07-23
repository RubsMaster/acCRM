import Service from "../models/service.schema.js";
import Client from "../models/client.schema.js";
import { buildServicesFilter } from '../utils/filterBuilder.js'; 
import APIFeatures from "../utils/apiFeatures.js";
export const createService = async (req, res) => {
  try {
    const { client, date, address, type, cost, equipment } = req.body;

    const clientExists = await Client.findById(client);
    if (!clientExists) {
      return res.status(404).json({ message: 'El cliente especificado no existe' });
    }

    const newService = new Service({
      client,
      date,
      address,
      type,
      cost,
      equipment
    });

    const savedService = await newService.save();
    res.status(201).json(savedService);

  } catch (error) {
    if (error.name === 'ValidationError') {
      return res.status(400).json({ message: error.message });
    }
    res.status(400).json({
      message: error.message || 'Error al crear el servicio'
    });
  }
};

export const getAllServices = async (req, res) => {
  try {
    const filter = buildServicesFilter(req.query);

    const totalServices = await Service.countDocuments(filter);

    const features = new APIFeatures(Service.find(filter), req.query)
      .sort()
      .paginate();

    const services = await features.query.populate('client', 'name phoneNumber');
    res.status(200).json({
      ok: true,
      totalServices,
      results: services.length, 
      totalPages: Math.ceil(totalServices / (parseInt(req.query.limit, 10) || 10)),
      currentPage: parseInt(req.query.page, 10) || 1,
      data: {
        services,
      },
    });
  } catch (error) {
    res.status(500).json({ ok: false, message: 'Error al obtener los servicios', error });
  }
};

export const getServiceById = async (req, res) => {
  try {
    const service = await Service.findById(req.params.id).populate('client', 'name phoneNumber');
    if (!service) {
      return res.status(404).json({ message: 'Servicio no encontrado' });
    }
    res.status(200).json(service);
  } catch (error) {
    res.status(500).json({ message: 'Error al obtener el servicio', error });
  }
};

export const updateService = async (req, res) => {
  try {
    if (req.body.client) {
      const clientExists = await Client.findById(req.body.client);
      if (!clientExists) {
        return res.status(404).json({ message: 'El cliente especificado no existe' });
      }
    }
    
    const updatedService = await Service.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true
    });

    if (!updatedService) {
      return res.status(404).json({ message: 'Servicio no encontrado' });
    }
    res.status(200).json(updatedService);
  } catch (error) {
     if (error.name === 'ValidationError') {
      return res.status(400).json({ message: error.message });
    }
    res.status(500).json({ message: 'Error al actualizar el servicio', error });
  }
};

export const deleteService = async (req, res) => {
  try {
    const deletedService = await Service.findByIdAndDelete(req.params.id);
    if (!deletedService) {
      return res.status(404).json({ message: 'Servicio no encontrado' });
    }
    res.status(204).send();
  } catch (error) {
    res.status(500).json({ message: 'Error al eliminar el servicio', error });
  }
};