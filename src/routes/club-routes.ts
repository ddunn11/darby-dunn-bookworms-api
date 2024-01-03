import { Router } from "express";
import {
  createClub,
  editClub,
  editRole,
  getAllClubsForUser,
  getAllMeetingsForClub,
  getAllUsersForClub,
  getClubDetails,
  joinClub,
} from "../controllers/club-controller";

const router = Router();

router.route("/").post(createClub);

router.route("/join/:clubID").post(joinClub);

router.route("/:clubID").put(editClub).get(getClubDetails);

router.route("/:clubID/users").get(getAllUsersForClub);

router.route("/:clubID/meetings").get(getAllMeetingsForClub);

router.route("/edit-role/:userID/:clubID").put(editRole);

router.route("/:userID").get(getAllClubsForUser);

export { router as clubRoutes };
