const pg = require("pg");
const express = require("express");
const client = new pg.Client(
  process.env.DATABASE_URL || "postgres://localhost/the_acme_ice_cream_db"
);
const app = express();

async function init() {
  await client.connect();
  console.log("connected to database");
  let SQL = ``;
  await client.query(SQL);
  console.log("tables created");
  SQL = ``;
  await client.query(SQL);
  console.log("data seeded");
}
init();
