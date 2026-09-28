import express from "express"
import {getPublicProject} from "../controllers/publicProjectController.js"

const router = express.Router()

router.route("/")
    .get(getPublicProject)

export default router