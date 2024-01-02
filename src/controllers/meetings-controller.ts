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
  if (!clubID || !date || !location || !book) {
    return res.status(400).json({ message: "All fields are required" });
  }
  try {
    const meeting: Meeting = {
      meetingID: uuidv4(),
      clubID: clubID,
      date: new Date(date),
      location: location,
      book: book,
    };
    await knex("meetings").insert(meeting);
    res.json(meeting);
  } catch (error) {
    res.status(400).send("Error creating a meeting: ${error}");
  }
};

//edit a meeting
export const editMeeting = async (req: Request, res: Response) => {
  const { date, location, book } = req.body;
  const meetingID = req.params.meetingID;
  const clubID = req.params.clubID;

  if (!date || !location || !book) {
    return res.status(400).json({ message: "All fields are required" });
  }
  try {
    //check the meeting exists
    const meetingExists = await knex("meetings")
      .where("MeetingID", meetingID)
      .first();

    if (!meetingExists) {
      return res.status(404).json({ error: "Club not found" });
    }
    // update meeting details
    await knex("meetings")
      .where("MeetingID", meetingID)
      .update({ Date: new Date(), Location: location, Book: book });
    res.json({ message: "Club updated successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).send("Error joing the club: ${error}");
  }
};
