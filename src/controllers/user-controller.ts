import { Request, Response } from "express";
import { User } from "../models/user";
import { v4 as uuidv4 } from "uuid";
import dotenv from "dotenv";
import _knex from "knex";
import { knexConfig } from "../../knexfile";

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
  } catch (err) {
    res.status(400).send("Error creating an account: ${err}");
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
