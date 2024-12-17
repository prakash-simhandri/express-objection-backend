// src/db/dbChecker.js
const knex = require("./knex"); // Import the configured Knex instance

/**
 * Checks the database connection and verifies if the database exists.
 * @returns {Promise<void>}
 */
async function checkDatabaseConnection() {
  try {
    // Run a simple query to check the database connection
    await knex.raw("SELECT 1");
    console.log("✅ Database connection established.");

    // Optionally, check if a specific table exists to ensure the database is properly set up
    const result = await knex.schema.hasTable("UTM"); // Replace 'UTM' with a table name you expect
    if (!result) {
      console.error(
        '❌ Database is connected but required table "UTM" does not exist.'
      );
      throw new Error(
        'Required table "UTM" is missing. Please run the migrations.'
      );
    }
  } catch (error) {
    // Handle specific errors if the database does not exist or connection fails
    if (error.message.includes("does not exist")) {
      console.error(
        "❌ Database does not exist. Please ensure the database is created."
      );
    } else if (error.code === "ECONNREFUSED") {
      console.error(
        "❌ Database connection refused. Please check your database server."
      );
    } else {
      console.error("❌ Failed to connect to the database:", error.message);
    }

    throw error; // Re-throw the error to stop the server from starting
  }
}

module.exports = checkDatabaseConnection;
