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
    res.status(500).send("Error joing the club: ${error}");
  }
};

// get club details
export const getClubDetails = async (req: Request, res: Response) => {
  const clubID = req.params.clubID;
  try {
    const clubDetails = await knex
      .select("clubName", "Description")
      .from("bookclub")
      .where("ClubID", clubID);
    res.json(clubDetails);
  } catch (error) {
    res.status(500).json({ error: "Internal server error" });
  }
};

//get all users in a club

// get every club one user is in
export const getAllClubsForUser = async (req: Request, res: Response) => {
  const userID = req.params.userID;
  try {
    const userClubInfo = await knex
      .select(
        "user.UserID",
        "user.Username",
        "user.Name",
        "bookclub.ClubID",
        "bookclub.ClubName",
        "bookclub.Description",
        "clubmember.Role"
      )
      .from("user")
      .where("user.UserID", userID)
      .join("clubmember", "user.UserID", "clubmember.UserID")
      .join("bookclub", "clubmember.ClubID", "bookclub.ClubID");
    res.json(userClubInfo);
  } catch (error) {
    res.status(500).json({ error: "Internal server error" });
  }
};

// endpoint to edit club
export const editClub = async (req: Request, res: Response) => {
  const { clubID } = req.params;
  const { clubName, description } = req.body;

  try {
    // check that the club exists
    const clubExists = await knex("bookclub").where("ClubID", clubID).first();

    if (!clubExists) {
      return res.status(404).json({ error: "Club not found" });
    }
    // update club details
    await knex("bookclub")
      .where("ClubID", clubID)
      .update({ ClubName: clubName, Description: description });

    res.json({ message: "Club updated successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal server error" });
  }
};

// edit a clubmember's role
export const editRole = async (req: Request, res: Response) => {
  const { userID, clubID } = req.params;
  const { role } = req.body;

  try {
    // update clubmember's role in specific bookclub
    await knex("clubmember")
      .where({ UserID: userID, ClubID: clubID })
      .update({ Role: role });
    res.json({ message: "Club member role updated successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal server error" });
  }
};
