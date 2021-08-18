import mongoose from "mongoose"
import config from "./config"

mongoose
  .connect(config.MONGODB_URI, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
  })
  .then((db) => console.log("Db is connected"))
  .catch((error) => console.log(error))
