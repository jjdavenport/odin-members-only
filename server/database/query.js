const pool = require("./pool");

const getMessages = async () => {
  const { rows } = await pool.query(`SELECT * FROM messages`);
  return rows;
};

module.exports = { getMessages };
