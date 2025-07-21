require("dotenv").config();
const { Client } = require("pg");

const HOSTNAME = process.env.HOSTNAME;
const USER = process.env.USER;
const DATABASE = process.env.DATABASE;
const PASSWORD = process.env.PASSWORD;
const PORT = process.env.DB_PORT;

const messages = [
  {
    title: "test",
    message: "test",
  },
  {
    title: "test 2",
    message: "test",
  },
  {
    title: "test 3",
    message: "test",
  },
];

const SQL = `
CREATE TABLE IF NOT EXISTS users (
  id INTEGER PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
  email VARCHAR(255),
  password VARCHAR(255),
  first_name VARCHAR(255),
  last_name VARCHAR(255),
  admin BOOLEAN
);

CREATE TABLE IF NOT EXISTS messages (
  id SERIAL PRIMARY KEY,
  email INTEGER REFERENCES users(id) ON DELETE CASCADE,
  title VARCHAR(255),
  message VARCHAR(255),
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

${messages
  .map(
    (msg) =>
      `INSERT INTO messages (title, message) VALUES ('${msg.title}', '${msg.message}');`
  )
  .join("\n")}
`;

async function startDatabase() {
  console.log("starting database...");
  const client = new Client({
    connectionString: `postgres://${USER}:${PASSWORD}@${HOSTNAME}:${PORT}/${DATABASE}`,
  });

  await client.connect();
  await client.query(SQL);
  await client.end();
  console.log("done");
}

startDatabase();
