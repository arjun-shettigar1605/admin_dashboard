const express = require("express");
const router = express.Router();
const {
  getProjects,
  addProject,
  updateProject,
  deleteProjects,
} = require("../controllers/projectController");
const { protect, isAdmin } = require("../middleware/authMiddleware");

// @route   GET api/projects
// @desc    Get all projects
// @access  Private (Both Admin and User)
router.get("/", protect, getProjects);

// @route   POST api/projects
// @desc    Add a new project
// @access  Private (Admin only)
router.post("/", [protect, isAdmin], addProject);

// @route   PUT api/projects/:id
// @desc    Update a project
// @access  Private (Admin only)
router.put("/:id", [protect, isAdmin], updateProject);

// @route   DELETE api/projects
// @desc    Delete one or more projects
// @access  Private (Admin only)
router.delete("/", [protect, isAdmin], deleteProjects);

module.exports = router;
