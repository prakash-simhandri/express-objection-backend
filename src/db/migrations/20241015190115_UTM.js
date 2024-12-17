/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function (knex) {
  return knex.schema.createTable("UTM", (table) => {
    table.increments("id").primary(); // Auto-incrementing ID as primary key
    table.string("UTM_url").notNullable(); // URL stored as a string and required
    table.string("created_at").notNullable(); // Adds created_at and updated_at timestamps
    table.string("updated_at").nullable(); // Adds created_at and updated_at timestamps
  });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function (knex) {
  return knex.schema.dropTableIfExists("UTM");
};
