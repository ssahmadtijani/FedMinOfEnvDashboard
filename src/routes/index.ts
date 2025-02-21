import { Router } from "express"
import authRoutes from "./auth"
import departmentRoutes from "./departmentRoutes"

const router = Router()

router.use("/", authRoutes)
router.use("/", departmentRoutes)

export default router
