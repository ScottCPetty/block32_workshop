const pg = require("pg");
const express = require("express");
const client = new pg.Client(
  process.env.DATABASE_URL || "postgres://localhost/the_acme_ice_cream_db"
);
const app = express();

async function init() {
  await client.connect();
  console.log("connected to database");
  let SQL = `
    DROP TABLE IF EXISTS flavors;
    CREATE TABLE flavors(
        id SERIAL PRIMARY KEY,
        name VARCHAR(255) NOT NULL,
        is_favorite BOOLEAN DEFAULT FALSE,
        created_at TIMESTAMP DEFAULT now(),
        updated_at TIMESTAMP DEFAULT now(),
    );
  `;
  await client.query(SQL);
  console.log("tables created");
  SQL = `
    INSERT INTO notes(name, is_favorite) VALUES ('Chocolate', true);
    INSERT INTO notes(name) VALUES('Vanilla');
  `;
  await client.query(SQL);
  console.log("data seeded");
}
init();
