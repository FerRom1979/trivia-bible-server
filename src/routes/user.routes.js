import { Router } from "express"
import { createUser } from "../controllers/user.controllers"
import {
  verifyToken,
  isModerator,
  isAdmin,
  checkRolesExisted,
  checkDuplicateUser,
} from "../middleware"

const router = Router()

router.post("/create", [verifyToken, isAdmin, checkDuplicateUser], createUser)

export default router
