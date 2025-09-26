
const pool = require('../config/db.config');

const projectController = {
    // Create new project
    createProject: async (req, res) => {
        try {
            const { 
                projectName, clientName, projectManager, duration, 
                country, region, status, budget, progress 
            } = req.body;

            const query = `
                INSERT INTO projects (project_name, client_name, project_manager, 
                    duration, country, region, status, budget, progress)
                VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9)
                RETURNING *
            `;

            const values = [
                projectName, clientName, projectManager, duration,
                country, region, status, budget, progress
            ];

            const result = await pool.query(query, values);
            res.status(201).json(result.rows[0]);
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    },

    // Get all projects with filters
    getProjects: async (req, res) => {
        try {
            const { region, status } = req.query;
            let query = 'SELECT * FROM projects WHERE 1=1';
            const values = [];

            if (region) {
                values.push(region);
                query += ` AND region = $${values.length}`;
            }

            if (status) {
                values.push(status);
                query += ` AND status = $${values.length}`;
            }

            const result = await pool.query(query, values);
            res.json(result.rows);
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    },

    // Update project
    updateProject: async (req, res) => {
        try {
            const { id } = req.params;
            const { 
                projectName, clientName, projectManager, duration,
                country, region, status, budget, progress 
            } = req.body;

            const query = `
                UPDATE projects 
                SET project_name = $1, client_name = $2, project_manager = $3,
                    duration = $4, country = $5, region = $6, status = $7,
                    budget = $8, progress = $9, updated_at = CURRENT_TIMESTAMP
                WHERE id = $10
                RETURNING *
            `;

            const values = [
                projectName, clientName, projectManager, duration,
                country, region, status, budget, progress, id
            ];

            const result = await pool.query(query, values);
            
            if (result.rows.length === 0) {
                return res.status(404).json({ message: "Project not found" });
            }

            res.json(result.rows[0]);
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    },

    // Delete project
    deleteProject: async (req, res) => {
        try {
            const { id } = req.params;
            const query = 'DELETE FROM projects WHERE id = $1 RETURNING *';
            const result = await pool.query(query, [id]);

            if (result.rows.length === 0) {
                return res.status(404).json({ message: "Project not found" });
            }

            res.json({ message: "Project deleted successfully" });
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    }
};

module.exports = projectController;