const db = require("../config/db");
const bcrypt = require("bcryptjs");

exports.changePassword = async (req, res) => {
  const { currentPassword, newPassword } = req.body;
  const userId = req.user.id; // From our auth middleware

  if (!currentPassword || !newPassword) {
    return res.status(400).json({ message: "Please provide all fields." });
  }

  try {
    // 1. Fetch the current user's hashed password
    const { rows } = await db.query(
      "SELECT password FROM users WHERE id = $1",
      [userId]
    );
    const user = rows[0];

    if (!user) {
      return res.status(404).json({ message: "User not found." });
    }

    // 2. Verify the current password
    const isMatch = await bcrypt.compare(currentPassword, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: "Incorrect current password." });
    }

    // 3. Hash the new password
    const salt = await bcrypt.genSalt(10);
    const hashedNewPassword = await bcrypt.hash(newPassword, salt);

    // 4. Update the database with the new password
    await db.query("UPDATE users SET password = $1 WHERE id = $2", [
      hashedNewPassword,
      userId,
    ]);

    res.json({ message: "Password updated successfully." });
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server error");
  }
};

exports.getProfile = async (req, res) => {
  try {
    const { rows } = await db.query(
      "SELECT id, email, role, first_name, last_name, phone, location, department, join_date, bio FROM users WHERE id = $1",
      [req.user.id]
    );
    if (rows.length === 0) {
      return res.status(404).json({ message: "User not found." });
    }
    res.json(rows[0]);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
};

// PUT (update) the current user's profile
exports.editProfile = async (req, res) => {
  const { firstName, lastName, phone, location, department, bio } = req.body;

  try {
    const queryText = `
      UPDATE users 
      SET 
        first_name = $1, 
        last_name = $2, 
        phone = $3, 
        location = $4, 
        department = $5, 
        bio = $6
      WHERE id = $7
      RETURNING *;
    `;
    const values = [
      firstName,
      lastName,
      phone,
      location,
      department,
      bio,
      req.user.id,
    ];
    const { rows } = await db.query(queryText, values);
    res.json(rows[0]);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
};


exports.getUserById = async (req, res) => {
  try {
    const { rows } = await db.query(
      "SELECT id, email, role, first_name, last_name FROM users WHERE id = $1",
      [req.params.id]
    );
    if (rows.length === 0) {
      return res.status(404).json({ message: "User not found." });
    }
    res.json(rows[0]);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
};

