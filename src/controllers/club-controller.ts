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
