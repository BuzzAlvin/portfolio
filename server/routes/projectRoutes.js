import express from "express";
import {
  getAllProjects,
  createNewProject,
  updateProject,
  deleteProject,
} from "../controllers/projectController.js";
import upload from "../middleware/upload.js";
import verifyJWT from "../middleware/verifyJWT.js";
import requireRole from "../middleware/requireRole.js";

const router = express.Router();

router.use(verifyJWT);

router
  .route("/")
  .get(getAllProjects)

  .post(requireRole("Admin"), upload.single("image"), createNewProject);

router
  .route("/:id")
  .patch(requireRole("Admin"), upload.single("image"), updateProject)
  .delete(requireRole("Admin"), deleteProject);

export default router;
