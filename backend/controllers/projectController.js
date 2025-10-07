const db = require("../config/db");

// GET all projects
exports.getProjects = async (req, res) => {
  try {
    const queryText = `
      SELECT 
        project_id AS "Project_Id",
        project_name AS "ProjectName",
        project_manager AS "ProjectManager",
        (duration_value::text || ' ' || duration_unit) AS "Duration",
        status AS "Status",
        progress_percent AS "Progress",
        client_name AS "ClientName",
        (string_to_array(country, ','))[1] AS "Country",
        "project link" AS "ProjectLink",
        project_type AS "ProjectType",
        location_data AS "Location",
        created_at_date AS "CreatedAtDate"
      FROM projects 
      ORDER BY project_id ASC;
    `;
    const { rows } = await db.query(queryText);
    res.json(rows);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
};

// POST a new project
exports.addProject = async (req, res) => {
  // Assuming frontend sends PascalCase keys, map them to snake_case for DB
  const {
    ProjectName,
    ProjectManager,
    Duration,
    Status,
    Progress,
    ClientName,
    Country,
    ProjectLink,
    ProjectType,
    Location,
    CreatedAtDate,
  } = req.body;

  // You'll need to parse the combined Duration string back into value and unit
  const [duration_value, duration_unit] = Duration.split(" ");

  try {
    const queryText = `
      INSERT INTO projects (
        project_name, project_manager, duration_value, duration_unit, status, 
        progress_percent, client_name, country, "project link", project_type, location_data, created_at_date
      )
      VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12)
      RETURNING *;
    `;
    const values = [
      ProjectName,
      ProjectManager,
      parseInt(duration_value),
      duration_unit,
      Status,
      Progress,
      ClientName,
      Country,
      ProjectLink,
      ProjectType,
      Location,
      CreatedAtDate,
    ];
    const { rows } = await db.query(queryText, values);
    res.status(201).json(rows[0]);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
};

// PUT (update) an existing project
exports.updateProject = async (req, res) => {
  const { id } = req.params;
  const {
    ProjectName,
    ProjectManager,
    Duration,
    Status,
    Progress,
    ClientName,
    Country,
    ProjectLink,
    ProjectType,
    Location,
    CreatedAtDate,
  } = req.body;

  const [duration_value, duration_unit] = Duration.split(" ");

  try {
    const queryText = `
      UPDATE projects
      SET 
        project_name = $1, project_manager = $2, duration_value = $3, duration_unit = $4, 
        status = $5, progress_percent = $6, client_name = $7, country = $8, 
        "project link" = $9, project_type = $10, location_data = $11, created_at_date = $12
      WHERE project_id = $13
      RETURNING *;
    `;
    const values = [
      ProjectName,
      ProjectManager,
      parseInt(duration_value),
      duration_unit,
      Status,
      Progress,
      ClientName,
      Country,
      ProjectLink,
      ProjectType,
      Location,
      CreatedAtDate,
      id,
    ];
    const { rows } = await db.query(queryText, values);
    if (rows.length === 0) {
      return res.status(404).json({ message: "Project not found." });
    }
    res.json(rows[0]);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
};

// DELETE one or more projects
exports.deleteProjects = async (req, res) => {
  const { ids } = req.body;
  if (!ids || !Array.isArray(ids) || ids.length === 0) {
    return res
      .status(400)
      .json({ message: "Please provide an array of project IDs to delete." });
  }
  try {
    // Use the correct column name for deletion
    const queryText = `DELETE FROM projects WHERE project_id = ANY($1::int[])`;
    await db.query(queryText, [ids]);
    res.json({ message: "Projects deleted successfully." });
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
};
