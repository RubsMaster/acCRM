import Client from "../models/client.schema.js";

export const createClient = async (req, res) => {
  try {
    const { name, phoneNumber } = req.body;

    const newClient = new Client({ name, phoneNumber });

    const savedClient = await newClient.save();

    res.status(201).json(savedClient);
  } catch (error) {
    // Si el phoneNumber ya existe, Mongoose lanzará un error con código 11000
    if (error.code === 11000) {
      return res.status(400).json({ message: 'El número de teléfono ya está registrado.' });
    }
    res.status(500).json({ message: 'Error al crear el cliente', error });
  }
};

export const getAllClients = async (req, res) => {
  try {
    const clients = await Client.find();

    res.status(200).json(clients);
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