const pool = require("./pool");

const getMessages = async () => {
  const { rows } = await pool.query(`SELECT * FROM messages`);
  return rows;
};

const getMessageById = async (id) => {
  const { rows } = await pool.query("SELECT * FROM messages WHERE id = $1", [
    id,
  ]);
  return rows[0];
};

const getEmails = async (email) => {
  const { rows } = await pool.query("SELECT * FROM users WHERE email = $1", [
    email,
  ]);
  return rows[0];
};

const getUserByEmail = async (email) => {
  const { rows } = await pool.query("SELECT * FROM users WHERE email = $1", [
    email,
  ]);
  return rows[0];
};

const getUserById = async (id) => {
  const { rows } = await pool.query("SELECT * FROM users WHERE id = $1", [id]);
  return rows[0];
};

const registerUser = async (email, firstName, lastName, password) => {
  await pool.query(
    "INSERT INTO users (email, first_name, last_name, password)",
    [email, firstName, lastName, password]
  );
};

module.exports = {
  getMessages,
  getMessageById,
  getEmails,
  getUserByEmail,
  getUserById,
  registerUser,
};
