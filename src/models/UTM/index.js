const { Model } = require("objection");
const knex = require("../../db/knex");

// Bind knex instance to Objection Model
Model.knex(knex);

class UtmModel extends Model {
  // Specify the table name
  static get tableName() {
    return "UTM";
  }

  // Define the JSON schema for validation
  static get jsonSchema() {
    return {
      type: "object",
      required: ["UTM_url"], // Required fields for the model
      properties: {
        id: { type: "integer" },
        UTM_url: { type: "string" },
        created_at: { type: "string" }, // Could be refined to use a date format
        updated_at: { type: "string", nullable: true }, // Allow null for updated_at
      },
    };
  }

  // Hook to set the created_at field before insert
  $beforeInsert() {
    const now = Date.now();
    this.created_at = `${now}`;
  }

  // Hook to set the updated_at field before update
  $beforeUpdate() {
    const now = Date.now();
    this.updated_at = `${now}`;
  }

  // Override $patch method to ignore certain properties during updates
  $patch(patch) {
    // Define properties to ignore during the patching process
    const ignoredProperties = ["UTM_url"];

    // Filter out ignored properties
    const filteredPatch = Object.keys(patch)
      .filter((key) => !ignoredProperties.includes(key))
      .reduce((obj, key) => {
        obj[key] = patch[key]; // Build a new object without ignored properties
        return obj;
      }, {});

    return super.$patch(filteredPatch); // Call the original $patch method with filtered properties
  }
}

module.exports = {
  UtmModel,
};
