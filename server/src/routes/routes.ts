import express from "express";
import { deleteUser, editUser, getAllUsers, getUser, login, register } from "../controllers/auth";
import { requireAuth } from "../middlewares/requireAuth";
import { requireAdmin } from "../middlewares/requireAdmin";

const router = express.Router();

router.post("/register", register);
router.post("/login", login);
router.patch("/editUser", requireAdmin, editUser);
router.get("/getAllUsers", requireAdmin, getAllUsers);
router.delete("/deleteUser/:id", requireAdmin, deleteUser);
router.get("/getUser", requireAuth, getUser);

export default router;
