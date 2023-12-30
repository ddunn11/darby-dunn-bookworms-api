// Update with your config settings.
import dotenv from "dotenv";
dotenv.config();

export const knexConfig = {
  development: {
    client: "mysql2",
    connection: {
      host: process.env.DB_HOST,
      user: process.env.DB_USER,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_NAME,
    },
    migrations: {
      tableName: "knex_migrations",
      directory: "./migrations",
    },
  },

  production: {
    client: "mysql2",
    connection: process.env.BOOKWORMSDB_URL,
    migrations: {
      tableName: "knex_migrations",
      directory: "./migrations",
    },
  },
};
