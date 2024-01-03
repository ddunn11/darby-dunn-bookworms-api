import { Router } from "express";
import {
  createUser,
  editUser,
  getUserDetails,
  loginUser,
} from "../controllers/user-controller";

const router = Router();

router.route("/").post(createUser).get(getUserDetails);

router.route("/:userID").put(editUser);

router.route("/login").post(loginUser);

export { router as userRoutes };
