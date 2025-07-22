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

module.exports = { getMessages, getMessageById };
