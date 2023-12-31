import dotenv from "dotenv";
import _knex from "knex";
import { knexConfig } from "../../knexfile";
import { v4 as uuidv4 } from "uuid";
import { Meeting } from "../models/meeting";
import { Request, Response } from "express";

dotenv.config();
const nodeProfile = process.env.NODE_PROFILE;
const config =
  nodeProfile === "development"
    ? knexConfig.development
    : knexConfig.production;
const knex = _knex(config);

//creating a meeting - includes validation
export const createMeeting = async (req: Request, res: Response) => {
  const { clubID, date, location, book } = req.body;
  if (!date || !location || !book) {
    return res.status(400).json({ message: "All fields are required" });
  }
  try {
    const meeting: Meeting = {
      meetingID: uuidv4(),
      clubID: clubID,
      date: date,
      location: location,
      book: book,
    };
  } catch (error) {
    res.status(400).send("Error creating a meeting: ${err}");
  }
};
