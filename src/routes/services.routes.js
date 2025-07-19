import { Router } from "express";
import { 
    createService,
    getAllServices,
    getServiceById,
    updateService,
    deleteService
} from "../controllers/services.controller.js"

const router = Router();

router.get('/', getAllServices)
router.get('/:id', getServiceById)
router.post('/', createService,)
router.put('/:id', updateService);
router.delete('/:id', deleteService);
export default router;