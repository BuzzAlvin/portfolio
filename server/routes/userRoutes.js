import express from "express";
import {
  getUser,
  createUser,
  updateUser,
  deleteUser,
} from "../controllers/userController.js";
import verifyJWT from "../middleware/verifyJWT.js";

const router = express.Router();

router.use(verifyJWT)

router.route("/")

  .get(getUser)
  .post(createUser)

  router.route("/:id")
  .patch(updateUser)
  .delete(deleteUser);

export default router;
