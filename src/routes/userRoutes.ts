import { Router } from "express"
import * as userController from "../controllers/userController"
import passport from "passport"

const router = Router()

router.get('/get-pending-users', 
    passport.authenticate("jwt", { session: false }), 
    userController.getPendingUsers
)

export default router