import { Router } from "express";
import { createClub, joinClub } from "../controllers/club-controller";

const router = Router();

router.route("/").post(createClub);

router.route("/join/:clubID").post(joinClub);

export { router as clubRoutes };
