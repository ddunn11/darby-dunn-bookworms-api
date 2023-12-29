// Update with your config settings.
const dotenv = require("dotenv");
dotenv.config();
/**
 * @type { Object.<string, import("knex").Knex.Config> }
 */
module.exports = {
  development: {
    client: "mysql",
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
    client: "mysql",
    connection: process.env.BOOKWORMSDB_URL,
    migrations: {
      tableName: "knex_migrations",
      directory: "./migrations",
    },
  },
};
