import { Router } from "express";
import {
  createArticles,
  updateArticles,
  deleteArticles,
  getAllArticles,
  getMyArticles,
  getArticleById,
} from "../controllers/ArticlesControllers";
import { Auth } from "../middlewares/Auth";

const router = Router();

// Public routes
router.get("/", getAllArticles);

// Protected routes
router.get("/my-articles", Auth, getMyArticles);
router.post("/", Auth, createArticles);
router.put("/:id", Auth, updateArticles);
router.delete("/:id", Auth, deleteArticles);

// This must be last
router.get("/:id", getArticleById);

export default router;
