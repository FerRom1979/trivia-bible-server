import { Router } from "express"
import {
  getQuestions,
  getQuestionsById,
  editQuestionsById,
  deleteQuestionsById,
  createQuestions,
} from "../controllers/questions.controllers"
import { verifyToken, isModerator, isAdmin } from "../middleware"

const router = Router()

router.get("/", getQuestions)
router.get("/:id", getQuestionsById)
router.post("/", [verifyToken, isAdmin], createQuestions)
router.put("/:id", [verifyToken, isAdmin], editQuestionsById)
router.delete("/:id", [verifyToken, isModerator], deleteQuestionsById)

export default router
