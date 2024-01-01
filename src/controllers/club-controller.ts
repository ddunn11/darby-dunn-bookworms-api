import dotenv from "dotenv";
import _knex from "knex";
import { knexConfig } from "../../knexfile";
import { Request, Response } from "express";
import { v4 as uuidv4 } from "uuid";
import { Club } from "../models/club";
import { ClubMember } from "../models/club-member";

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

//joining a club
export const joinClub = async (req: Request, res: Response) => {
  const { userID, role } = req.body;
  const clubID = req.params.clubID;
  if (!userID || !clubID || !role) {
    return res.status(400).json({ message: "All fields are required" });
  }
  try {
    // uuid already exists for user and club
    // uuidv4() creates new uuid, not needed here
    const clubMember: ClubMember = {
      userID: userID,
      clubID: clubID,
      role: role,
    };
    //adds user to list of clubmembers for the chosen club
    await knex("clubmember").insert(clubMember);
    res.json(clubMember);
  } catch (error) {
    res.status(404).send("Error joing the club: ${error}");
  }
};
