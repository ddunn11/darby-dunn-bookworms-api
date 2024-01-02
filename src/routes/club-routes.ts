import { Router } from "express";
import {
  createClub,
  editClub,
  getAllUserClubs,
  joinClub,
} from "../controllers/club-controller";

const router = Router();

router.route("/").post(createClub);

router.route("/join/:clubID").post(joinClub);

router.route("/:clubID").put(editClub);

router.route("/:userID").get(getAllUserClubs);

export { router as clubRoutes };
