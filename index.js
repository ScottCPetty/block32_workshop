const pg = require("pg");
const express = require("express");
const client = new pg.Client(
  process.env.DATABASE_URL || "postgres://localhost/the_acme_ice_cream_db"
);
const app = express();

app.use(express.json());
app.use(require("morgan")("dev"));
// Return array of flavors
app.get("/api/flavors", async (req, res, next) => {
  try {
    const SQL = `
        SELECT * from flavors ORDER BY created_at DESC;
    `;
    const response = await client.query(SQL);
    res.send(response.rows);
  } catch (error) {
    console.log(error);
  }
});
// Return single flavor
app.get("/api/flavors/:id", async (req, res, next) => {
  try {
    const SQL = ``;
    const response = await client.query(SQL);
  } catch (error) {
    console.log(error);
  }
});
// Create new flavor
app.post("/api/flavors", async (req, res, next) => {
  try {
    const SQL = ``;
    const response = await client.query(SQL);
  } catch (error) {
    console.log(error);
  }
});
// Delete flavor
app.delete("/api/flavors/:id", async (req, res, next) => {
  try {
    const SQL = ``;
    const response = await client.query(SQL);
  } catch (error) {
    console.log(error);
  }
});
// Update flavor
app.put("/api/flavors/:id", async (req, res, next) => {
  try {
    const SQL = ``;
    const response = await client.query(SQL);
  } catch (error) {
    console.log(error);
  }
});

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
  const port = process.env.PORT || 3000;
  app.listen(port, () => console.log(`listening on port ${port}`));
}
init();
