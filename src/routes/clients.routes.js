import { Router } from "express";
import { 
    createClient,
    getAllClients,
    getClientById,
    updateClient,
    deleteClient
} from "../controllers/clients.controller.js";

const router = Router();

router.get('/', getAllClients);
router.get('/:id', getClientById);
router.post('/', createClient);
router.put('/:id', updateClient);
router.delete('/:id', deleteClient);

export default router;