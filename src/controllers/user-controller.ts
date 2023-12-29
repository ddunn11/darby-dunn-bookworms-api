import { Request, Response } from "express";

const knex = require("knex")(require("../knexfile"));

const createUser = async (req: Request, res: Response) => {
  const { username, name, password } = req.body;
  if (!username || !name || !password) {
    return res.status(400).json({ message: "All fields are required" });
  }
  try {
    const result = await knex("users").insert(req.body);
  } catch (err) {
    res.status(400).send("Error creating an account: ${err}");
  }
};
