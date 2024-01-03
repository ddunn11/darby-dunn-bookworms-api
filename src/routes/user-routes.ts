import { Router } from "express";
import {
  createUser,
  editUser,
  getUserDetails,
  loginUser,
} from "../controllers/user-controller";

const router = Router();

router.route("/").post(createUser);

router.route("/:userID").put(editUser).get(getUserDetails);

router.route("/login").post(loginUser);

export { router as userRoutes };
