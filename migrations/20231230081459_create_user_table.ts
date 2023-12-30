import type { Knex } from "knex";

export async function up(knex: Knex): Promise<void> {
  return knex.schema.createTable("User", function (table) {
    table.uuid("UserID").primary();
    table.string("Username", 30);
    table.string("Name");
    table.string("Password");
  });
}

export async function down(knex: Knex): Promise<void> {
  return knex.schema.dropTable("User");
}
