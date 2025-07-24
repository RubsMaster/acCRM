import Client from "../models/client.schema.js";

export const createClient = async (req, res) => {
  try {
    const { name, phoneNumber } = req.body;
    
    if (!phoneNumber) {
      throw new Error('El número de teléfono es requerido');
    }
    
    const cleanPhone = phoneNumber.toString().replace(/\D/g, '');
    
    if (cleanPhone.length !== 10) {
      throw new Error('El número debe contener exactamente 10 dígitos');
    }

    const newClient = new Client({ 
      name, 
      phoneNumber: cleanPhone
    });

    const savedClient = await newClient.save();
    res.status(201).json(savedClient);
    
  } catch (error) {
    if (error.code === 11000) {
      return res.status(400).json({ message: 'El número ya está registrado' });
    }
    
    if (error.name === 'ValidationError') {
      return res.status(400).json({ message: error.message });
    }

    res.status(400).json({ 
      message: error.message || 'Error al crear cliente' 
    });
  }
};

export const getAllClients = async (req, res) => {
  try {
    const clients = await Client.find();

    res.status(200).json({data: clients});
  } catch (error) {
    res.status(500).json({ message: 'Error al obtener los clientes', error });
  }
};

export const getClientById = async (req, res) => {
  try {
    const client = await Client.findById(req.params.id);

    if (!client) {
      return res.status(404).json({ message: 'Cliente no encontrado' });
    }

    res.status(200).json(client);
  } catch (error) {
    res.status(500).json({ message: 'Error al obtener el cliente', error });
  }
};

export const updateClient = async (req, res) => {
  try {
    const updatedClient = await Client.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true
    });

    if (!updatedClient) {
      return res.status(404).json({ message: 'Cliente no encontrado' });
    }

    res.status(200).json(updatedClient);
  } catch (error) {
     if (error.code === 11000) {
      return res.status(400).json({ message: 'El número de teléfono ya está en uso por otro cliente.' });
    }
    res.status(500).json({ message: 'Error al actualizar el cliente', error });
  }
};

export const deleteClient = async (req, res) => {
  try {
    const deletedClient = await Client.findByIdAndDelete(req.params.id);

    if (!deletedClient) {
      return res.status(404).json({ message: 'Cliente no encontrado' });
    }

    res.status(204).send();
  } catch (error) {
    res.status(500).json({ message: 'Error al eliminar el cliente', error });
  }
};