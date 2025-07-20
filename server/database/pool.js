require("dotenv").config();
const { Pool } = require("pg");

const USER = process.env.USER;
const PASSWORD = process.env.PASSWORD;
const PORT = process.env.DB_PORT;
const DATABASE = process.env.DATABASE;
const HOSTNAME = process.env.HOSTNAME;

module.exports = new Pool({
  user: USER,
  password: PASSWORD,
  port: PORT,
  database: DATABASE,
  host: HOSTNAME,
});
