import { Router } from "express";
import { createUser } from "../controllers/user-controller";

const router = Router();

router.route("/").post(createUser);

export { router as userRoutes };
