import type { Knex } from "knex";

export async function up(knex: Knex): Promise<void> {
  return knex.schema.createTable("BookClub", function (table) {
    table.uuid("ClubID").primary();
    table.string("ClubName");
    table.string("Description");
  });
}

export async function down(knex: Knex): Promise<void> {
  return knex.schema.dropTable("BookClub");
}
