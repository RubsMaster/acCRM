import { Router } from "express";
import {
  createService,
  getAllServices,
  getServiceById,
  updateService,
  deleteService,
  getDailyIncomeSummary,
} from "../controllers/services.controller.js";

const router = Router();

router.get("/", getAllServices);
router.post("/", createService);
router.get("/summary/daily-income", getDailyIncomeSummary);
router.get("/:id", getServiceById);
router.put("/:id", updateService);
router.delete("/:id", deleteService);

export default router;
