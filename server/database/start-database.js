require("dotenv").config();
const { Client } = require("pg");

const HOSTNAME = process.env.HOSTNAME;
const USER = process.env.USER;
const DATABASE = process.env.DATABASE;
const PASSWORD = process.env.PASSWORD;
const PORT = process.env.DB_PORT;

const messages = [
  {
    userId: 1,
    title: "test",
    message: "test",
  },
  {
    userId: 1,
    title: "test 2",
    message: "test",
  },
  {
    userId: 1,
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
  user_id INTEGER REFERENCES users(id) ON DELETE CASCADE,
  title VARCHAR(255),
  message VARCHAR(255),
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

INSERT INTO users (email, password, first_name, last_name, admin)
VALUES ('${process.env.EMAIL}', '${process.env.USER_PASSWORD}', '${
  process.env.FIRST_NAME
}', '${process.env.LAST_NAME}', '${process.env.ADMIN}');

${messages
  .map(
    (msg) =>
      `INSERT INTO messages (user_id, title, message) VALUES ('${msg.userId}', '${msg.title}', '${msg.message}');`
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
