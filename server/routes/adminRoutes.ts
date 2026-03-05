import { Router } from "express";
import { Auth, isAdmin } from "../middlewares/Auth";
import {
  getAllUsers,
  getAdminStats,
  deleteUserByAdmin,
} from "../controllers/AdminControllers";

const router = Router();

// Admin routes are protected by Auth and isAdmin middlewares
router.get("/stats", Auth, isAdmin, getAdminStats);
router.get("/users", Auth, isAdmin, getAllUsers);
router.delete("/users/:userId", Auth, isAdmin, deleteUserByAdmin);

export default router;
