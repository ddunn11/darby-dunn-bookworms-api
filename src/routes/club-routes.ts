import { Router } from "express";
import { createClub } from "../controllers/club-controller";

const router = Router();

router.route("/create-bookclub").post(createClub);

export { router as clubRoutes };
