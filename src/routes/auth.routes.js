import { Router } from "express"
import { signIn, signUp } from "../controllers/auth.controllers"
import {
  checkDuplicateUser,
  checkRolesExisted,
} from "../middleware/verifySignup"

const router = Router()

router.use((req, res, next) => {
  res.header(
    "Access-Control-Allow-Headers",
    "x-access-token, Origin, Content-Type, Accept"
  )
  next()
})

router.post("/signup", [checkDuplicateUser, checkRolesExisted], signUp)

router.post("/signin", signIn)

export default router
