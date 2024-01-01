import { Router } from "express";
import {
  createClub,
  getAllUserClubs,
  joinClub,
} from "../controllers/club-controller";

const router = Router();

router.route("/").post(createClub);

router.route("/join/:clubID").post(joinClub);

router.route("/:userID").get(getAllUserClubs);

export { router as clubRoutes };
