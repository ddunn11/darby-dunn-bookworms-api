import { Router } from "express";
import { createMeeting } from "../controllers/meetings-controller";

const router = Router();

router.route("/add-a-meeting").post(createMeeting);

export { router as meetingRoutes };
