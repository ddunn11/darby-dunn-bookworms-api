import type { Knex } from "knex";

export async function up(knex: Knex): Promise<void> {
  return knex.schema.createTable("Meetings", function (table) {
    table.uuid("MeetingId").primary();
    table.uuid("ClubID").references("ClubID").inTable("BookClub");
    table.dateTime("Date");
    table.string("Location");
    table.string("Book");
  });
}

export async function down(knex: Knex): Promise<void> {
  return knex.schema.dropTable("Meetings");
}
