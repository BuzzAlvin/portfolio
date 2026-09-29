import express from "express";
import {
  getUser,
  createUser,
  updateUser,
  deleteUser,
} from "../controllers/userController.js";
import verifyJWT from "../middleware/verifyJWT.js";
import requireRole from "../middleware/requireRole.js";

const router = express.Router();

router.use(verifyJWT)

router.use(requireRole("Admin"))

router.route("/")

  .get(getUser)
  .post(createUser)

  router.route("/:id")
  .patch(updateUser)
  .delete(deleteUser);

export default router;
