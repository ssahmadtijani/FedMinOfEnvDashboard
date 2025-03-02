import { Router } from "express"
import authRoutes from "./auth"
import departmentRoutes from "./departmentRoutes"
import userRoutes from "./userRoutes"

const router = Router()

router.use("/", authRoutes)
router.use("/", departmentRoutes)
router.use('/', userRoutes)

export default router
