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
    "INSERT INTO users (email, first_name, last_name, password, admin) VALUES ($1, $2, $3, $4, false)",
    [email, firstName, lastName, password]
  );
};

const addAdminById = async (id) => {
  await pool.query("UPDATE users SET admin = TRUE WHERE id = $1", [id]);
};

const newMessage = async (id, title, message) => {
  await pool.query(
    "INSERT INTO messages (user_id, title, message) VALUES ($1, $2, $3)",
    [id, title, message]
  );
};

const deleteMessageById = async (id) => {
  await pool.query("DELETE FROM messages WHERE id = $1", [id]);
};

module.exports = {
  getMessages,
  getMessageById,
  getEmails,
  getUserByEmail,
  getUserById,
  registerUser,
  addAdminById,
  newMessage,
  deleteMessageById,
};
