// Update with your config settings.

/**
 * @type { Object.<string, import("knex").Knex.Config> }
 */

const Dotenv = require("dotenv");
Dotenv.config({ path: `${__dirname}/../../.env` });

module.exports = {
  development: {
    client: "mysql",
    connection: {
      database: process.env.DB_NAME,
      user: process.env.DB_USERNAME,
      password: process.env.DB_PASSWORD,
    },
    pool: {
      min: 2,
      max: 20,
    },
    migrations: {
      tableName: "knex_migration",
      directory: `${__dirname}/migrations`, // Ensure this points to src/db/migrations
    },
  },

  staging: {
    client: "postgresql",
    connection: {
      database: "my_db",
      user: "username",
      password: "password",
    },
    pool: {
      min: 2,
      max: 10,
    },
    migrations: {
      tableName: "knex_migrations",
    },
  },

  production: {
    client: "postgresql",
    connection: {
      database: "my_db",
      user: "username",
      password: "password",
    },
    pool: {
      min: 2,
      max: 10,
    },
    migrations: {
      tableName: "knex_migrations",
    },
  },
};
