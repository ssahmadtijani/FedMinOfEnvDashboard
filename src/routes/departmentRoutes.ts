import { Router } from "express"
import * as departmentController from "../controllers/departmentController"
import passport from "passport"
import { hasAccess } from "../middlewares/authMiddlewares"

const router = Router()

router.post(
    "/add-department", 
    passport.authenticate("jwt", { session: false }),
    hasAccess("admin"), 
    departmentController.addDepartment
)

export default router
