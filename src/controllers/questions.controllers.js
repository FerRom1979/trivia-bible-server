import Question from "../models/Questions.models"

// create question
export const createQuestions = async (req, res) => {
  try {
    const {
      question,
      responseOne,
      responseTwo,
      responseTree,
      responseCorrect,
      type,
      nameBook,
    } = req.body
    const newQuestion = new Question({
      question,
      responseOne,
      responseTwo,
      responseTree,
      responseCorrect,
      type,
      nameBook,
    })

    const questionSaved = await newQuestion.save()

    res.status(201).json(questionSaved)
  } catch (error) {
    return res.status(500).json(error)
  }
}

// get all questions
export const getQuestions = async (req, res) => {
  try {
    const questions = await Question.find()
    res.json(questions)
  } catch (error) {
    return res.status(500).json(error)
  }
}

// get one questions
export const getQuestionsById = async (req, res) => {
  try {
    const question = await Question.findById(req.params.id)
    res.status(200).json(question)
  } catch (error) {
    return res.status(500).json(error)
  }
}

// delete question
export const deleteQuestionsById = async (req, res) => {
  try {
    const deleteQuestions = await Question.findByIdAndDelete(req.params.id)
    res.status(204).json(deleteQuestions)
  } catch (error) {
    return res.status(500).json(error)
  }
}

// update question
export const editQuestionsById = async (req, res) => {
  try {
    const updateQuestion = await Question.findByIdAndUpdate(
      req.params.id,
      req.body,
      {
        new: true,
      }
    )
    res.status(200).json(updateQuestion)
  } catch (error) {
    return res.status(500).json(error)
  }
}
