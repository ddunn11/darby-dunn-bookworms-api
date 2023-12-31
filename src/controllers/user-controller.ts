import { Request, Response, NextFunction } from "express";
import { User } from "../models/user";
import { v4 as uuidv4 } from "uuid";
import dotenv from "dotenv";
import _knex from "knex";
import { knexConfig } from "../../knexfile";
import jwt from "jsonwebtoken";
import { TokenUser } from "../models/token-user";

dotenv.config();
const nodeProfile = process.env.NODE_PROFILE;
const config =
  nodeProfile === "development"
    ? knexConfig.development
    : knexConfig.production;
const knex = _knex(config);

//creating an account - includes validation that all fields are filled in
export const createUser = async (req: Request, res: Response) => {
  const { username, name, password } = req.body;
  if (!username || !name || !password) {
    return res.status(400).json({ message: "All fields are required" });
  }
  try {
    const user: User = {
      userID: uuidv4(),
      username: username,
      name: name,
      password: password,
    };
    await knex("user").insert(user);
    res.json(user);
  } catch (error) {
    res.status(400).send("Error creating an account: ${err}");
  }
};

//login endpoint
export const loginUser = async (req: Request, res: Response) => {
  const { username, password } = req.body;
  //Check if username and password are valid
  try {
    const user = await knex("user")
      .where({ username: username, password: password })
      .first();

    if (user) {
      const token = generateToken(user);
      res.json({ message: "Login successful", token });
    } else {
      res.status(401).json({ message: "Invalid credentials" });
    }
  } catch {
    res.status(500).json({ message: "Internal server error" });
  }
};

//midleware generates JWT on successful login
const generateToken = (user: User): string => {
  const jwtSecret = process.env.JWT_SECRET || "";

  const token = jwt.sign(
    { userID: user.userID, username: user.username },
    jwtSecret,
    { expiresIn: "24h" }
  );
  return token;
};

//middleware verifies JWT for protected routes (must be logged in to access)
const verifyToken = (req: Request, res: Response, next: NextFunction) => {
  const jwtSecret = process.env.JWT_SECRET || "";
  const token = req.header("Authorization")?.replace("Bearer", "");

  if (!token) {
    return res.status(401).json({ message: "Unauthorized access" });
  }
  try {
    const userDecoded: TokenUser = jwt.verify(token, jwtSecret) as {
      userID: string;
      username: string;
    };
    //attach user info to the request
    req["user"] = userDecoded;
    next();
  } catch (error) {
    return res.status(401).json({ message: "Unauthorized access" });
  }
};

// const editUser = async (req: Request, res: Response) => {
//   const { username, name, password } = req.body;
//   if (!username || !name || !password) {
//     return res.status(400).json({ message: "All fields are required" });
//   }
//   try {
//     const result = await knex("users").insert(user);
//   } catch (err) {
//     res.status(400).send("Error creating an account: ${err}");
//   }
// };
