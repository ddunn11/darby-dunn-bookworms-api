import { Router } from "express";
import {
  createUser,
  editUser,
  loginUser,
} from "../controllers/user-controller";

const router = Router();

router.route("/").post(createUser);

router.route("/:userID").put(editUser);

router.route("/login").post(loginUser);

export { router as userRoutes };
