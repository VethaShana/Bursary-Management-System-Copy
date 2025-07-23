import express from "express";
import {
  getInstallments,
  createInstallments,
} from "../controllers/installment.js";
import auth from "../middleware/auth.js";

const router = express.Router();

router.get("/", getInstallments);
router.post("/", createInstallments);
export default router;
