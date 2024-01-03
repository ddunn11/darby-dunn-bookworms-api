import { Router } from "express";
import { createMeeting, editMeeting } from "../controllers/meetings-controller";

const router = Router();

router.route("/").post(createMeeting);

router.route("/:meetingID").put(editMeeting);

export { router as meetingRoutes };
