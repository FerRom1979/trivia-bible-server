import User from "../models/User.models"
import Role from "../models/Role.models"
import jwt from "jsonwebtoken"
import config from "../config"

export const signUp = async (req, res) => {
  try {
    const { username, email, password, roles } = req.body

    // Creating new user
    const newUser = new User({
      username,
      email,
      password: await User.encryptPassword(password),
    })
    // Checking roles
    if (roles) {
      const foundRoles = await Role.find({ name: { $in: roles } })
      newUser.roles = foundRoles.map((role) => role._id)
    } else {
      const role = await Role.findOne({ name: "user" })
      newUser.roles = [role._id]
    }
    // Save user in MongoDb
    const saveUser = await newUser.save()
    console.log(saveUser)
    // Create token
    const token = jwt.sign({ id: saveUser._id }, config.SECRET, {
      // 24 horas
      expiresIn: 86400,
    })

    return res.json({ token })
  } catch (error) {
    return res.status(500).json(error)
  }
}

export const signIn = async (req, res) => {
  try {
    const userFound = await User.findOne({ email: req.body.email }).populate(
      "roles"
    )

    if (!userFound) return res.status(400).json({ message: "User not found" })

    const matchPassword = await User.comparePassword(
      req.body.password,
      userFound.password
    )

    if (!matchPassword)
      return res.status(401).json({ message: "User not found password" })

    const token = jwt.sign({ id: userFound._id }, config.SECRET, {
      // 24 horas
      expiresIn: 86400,
    })
    res.json({ token })
  } catch (error) {
    return res.status(500).json(error)
  }
}
