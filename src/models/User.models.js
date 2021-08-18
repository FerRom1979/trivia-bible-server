import { Schema, model } from "mongoose"
import bcrypt from "bcryptjs"

const UserSchema = new Schema(
  {
    username: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    roles: [
      {
        ref: "Role",
        type: Schema.Types.ObjectId,
      },
    ],
  },
  {
    timestamps: true,
    versionKey: false,
  }
)

UserSchema.statics.encryptPassword = async (password) => {
  const salt = await bcrypt.genSalt(8)

  return await bcrypt.hash(password, salt)
}

UserSchema.statics.comparePassword = async (password, receivePassword) => {
  return await bcrypt.compare(password, receivePassword)
}

export default model("UserSchema", UserSchema)
