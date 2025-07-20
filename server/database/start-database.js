require("dotenv").config();
const { Client } = require("pg");

const USER = process.env.USER;
const PASSWORD = process.env.PASSWORD;
const PORT = process.env.DB_PORT;
const DATABASE = process.env.DATABASE;
const HOSTNAME = process.env.HOSTNAME;

const SQL = `
CREATE TABLE IF NOT EXISTS users (
    id INTEGER PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
    email VARCHAR (255 ),
    password VARCHAR (255),
    first_name VARCHAR (255),
    last_name VARCHAR (255),
    admin BOOLEAN
);
`;

const startDatabase = async () => {
  console.log("starting database");
  const client = new Client({
    connectionString: `postgres://${USER}:${PASSWORD}@${HOSTNAME}:${PORT}/${DATABASE}`,
  });
  await client.connect();
  await client.query(SQL);
  await client.end();
  console.log("done");
};

startDatabase();
