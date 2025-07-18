import { Router } from "express";
import { 
    createClient,
    getAllClients,
    getClientById,
    updateClient,
    deleteClient
} from "../controllers/clients.controller.js"

const router = Router();

router.get('/api/acCRM/clients', getAllClients)
router.get('/api/acCRM/clients/:id', getClientById)
router.post('/api/acCRM/clients/create', createClient)
router.put('/api/acCRM/clients/update/:id', updateClient);

export default router;