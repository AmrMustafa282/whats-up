import { Router } from "express";
import { addContact, getMe } from "../controllers/user.contorller";

const router = Router();

router.get("/get-me", getMe).post("/add-contact", addContact);

export default router;
