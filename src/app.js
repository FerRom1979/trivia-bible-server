import express from "express"
import cors from "cors"
import morgan from "morgan"
import helmet from "helmet"

import questionsRoutes from "./routes/questions.routes"
import authRoutes from "./routes/auth.routes"
import { createRoles } from "./libs/initialSetup"
import userRoutes from "./routes/user.routes"

const app = express()

createRoles()

app.use(morgan("dev"))

// Reading format json
app.use(express.json())

// routes
app.get("/", (req, res) => {
  res.send("welcome")
})
//setting
app.set("port", process.env.PORT || 4000)
app.set("json spaces", 4)
// Middleware
const corsOptions = {
  // origin: "http://localhost:3000",
}
app.use(cors(corsOptions))
app.use(helmet())
app.use(morgan("dev"))
app.use(express.json())
app.use(express.urlencoded({ extended: false }))
app.use("/questions", questionsRoutes)
app.use("/user", authRoutes)
app.use("/user", userRoutes)

export default app
