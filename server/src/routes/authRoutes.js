import { Router } from "express";

import { register } from "../controllers/authController.js";
import validateBody from "../middleware/validateRequest.js";
import { registerSchema } from "../validation/authSchemas.js";

const router = Router();

router.post("/register", validateBody(registerSchema), register);

export default router;
