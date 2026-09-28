import express from "express";
import {
  getAllProjects,
  createNewProject,
  updateProject,
  deleteProject,
} from "../controllers/projectController.js";
import upload from "../middleware/upload.js";
import verifyJWT from "../middleware/verifyJWT.js";

const router = express.Router();

router.use(verifyJWT);

router
  .route("/")
  .get(getAllProjects)

  .post(upload.single("image"), createNewProject);

router
  .route("/:id")
  .patch(upload.single("image"), updateProject)
  .delete(deleteProject);

export default router;
