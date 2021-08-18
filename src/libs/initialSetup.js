import Role from "../models/Role.models"
import User from "../models/User.models"

export const createRoles = async () => {
  try {
    // count document
    const countRoles = await Role.estimatedDocumentCount()
    // check existing roles
    if (countRoles > 0) return
    // create default roles
    const values = await Promise.all([
      new Role({ name: "user" }).save(),
      new Role({ name: "moderator" }).save(),
      new Role({ name: "admin" }).save(),
    ])
  } catch (error) {
    console.error(error)
  }
}

/* 
export const createAdmin = async () => {
  // check for an existing admin user
  const user = await User.findOne({ email: "admin@localhost" });
  // get roles _id
  const roles = await Role.find({ name: { $in: ["admin", "moderator"] } });

  if (!user) {
    // create a new admin user
    await User.create({
      username: "admin",
      email: "admin@localhost",
      password: await bcrypt.hash("admin", 10),
      roles: roles.map((role) => role._id),
    });
    console.log('Admin User Created!')
  }
}; */
