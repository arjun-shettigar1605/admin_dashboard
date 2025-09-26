// filepath: backend/routes/project.routes.js
const router = require("express").Router();
const projectController = require("../controllers/project.controller");
const { verifyToken } = require("../middleware/auth.middleware");

// Apply verifyToken middleware to all routes
router.use(verifyToken);

router.get("/", projectController.getProjects);
router.post("/", projectController.createProject);
router.put("/:id", projectController.updateProject);
router.delete("/:id", projectController.deleteProject);

module.exports = router;
