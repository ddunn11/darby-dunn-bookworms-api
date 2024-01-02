import { Router } from "express";
import { createMeeting, editMeeting } from "../controllers/meetings-controller";

const router = Router();

router.route("/add-meeting").post(createMeeting);

router.route("/edit-meeting").put(editMeeting);

export { router as meetingRoutes };
