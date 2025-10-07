const { Pool } = require("pg");
require("dotenv").config();

const pool = new Pool({
  user: process.env.PG_USER,
  host: process.env.PG_HOST,
  database: process.env.PG_DATABASE,
  password: process.env.PG_PASSWORD,
  port: process.env.PG_PORT,
});

// ADD THIS BLOCK TO TEST THE CONNECTION
(async () => {
  try {
    const client = await pool.connect();
    console.log("✅ PostgreSQL database connected successfully!");
    client.release();
  } catch (err) {
    console.error("❌ Error connecting to the PostgreSQL database:");
    console.error(err.stack);
  }
})();
// END OF BLOCK TO ADD

module.exports = {
  query: (text, params) => pool.query(text, params),
};
