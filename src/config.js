import dotenv from "dotenv"

dotenv.config()

export default {
  SECRET: process.env.KEY_SECRET,
  MONGODB_URI: process.env.MONGODB_URI,
  PORT: process.env.PORT,
}
