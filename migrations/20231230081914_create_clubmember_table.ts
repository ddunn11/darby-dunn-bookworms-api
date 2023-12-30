import type { Knex } from "knex";

export async function up(knex: Knex): Promise<void> {
  return knex.schema.createTable("ClubMember", function (table) {
    table.uuid("UserID").references("UserID").inTable("User");
    table.uuid("ClubID").references("ClubID").inTable("BookClub");
    table.enum("Role", ["admin", "member"]).defaultTo("member");
  });
}

export async function down(knex: Knex): Promise<void> {
  return knex.schema.dropTable("ClubMember");
}
