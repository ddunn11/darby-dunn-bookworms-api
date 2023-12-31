import dotenv from "dotenv";
import _knex from "knex";
import { knexConfig } from "../../knexfile";
import { Request, Response } from "express";
import { v4 as uuidv4 } from "uuid";
import { Club } from "../models/club";
import { Member } from "../models/member";

dotenv.config();
const nodeProfile = process.env.NODE_PROFILE;
const config =
  nodeProfile === "development"
    ? knexConfig.development
    : knexConfig.production;
const knex = _knex(config);

//creating a club
export const createClub = async (req: Request, res: Response) => {
  const { clubName, description } = req.body;
  if (!clubName || !description) {
    return res.status(400).json({ message: "All fields are required" });
  }
  try {
    const club: Club = {
      clubID: uuidv4(),
      clubName: clubName,
      description: description,
    };
    await knex("bookclub").insert(club);
    res.json(club);
  } catch (error) {
    res.status(400).send("Error creating an account: ${error}");
  }
};

//join club endpoint
export const joinClub = async (req: Request, res: Response) => {
  const { userID, clubID, role } = req.body;
  if (!userID || !clubID || !role) {
    return res.status(400).json({ message: "All fields are required" });
  }
  try {
    const member: Member = {
      userID: uuidv4(),
      clubID: uuidv4(),
      role: role,
    };
    await knex("clubmember").insert(member);
    res.json(member);
  } catch (error) {
    res.status(404).send("Error joing the club: ${error}");
  }
};
