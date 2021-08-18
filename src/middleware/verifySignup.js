import { ROLES } from "../models/Role.models"
import User from "../models/User.models"

export const checkRolesExisted = async (req, res, next) => {
  try {
    if (req.body.roles) {
      for (let i = 0; i < req.body.length; i++) {
        if (!ROLES.includes(req.body.roles[i])) {
          return res
            .status(400)
            .json({ message: `Role ${req.body.roles[i]} does not exists` })
        }
      }
    }
    next()
  } catch (error) {
    res.status(500).json({ message: error })
  }
}

export const checkDuplicateUser = async (req, res, next) => {
  try {
    const user = await User.findOne({ email: req.body.email })

    if (user) return res.status(400).json({ message: "This email is use" })

    next()
  } catch (error) {
    res.status(500).json({ message: error })
  }
}
