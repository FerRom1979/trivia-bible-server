import { Schema, model } from "mongoose"

const questionSchema = new Schema(
  {
    question: String,
    responseOne: String,
    responseTwo: String,
    responseTree: String,
    responseCorrect: String,
    type: String,
    nameBook: String,
  },
  {
    timestamps: true,
    versionKey: false,
  }
)

export default model("question", questionSchema)
