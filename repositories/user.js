const UserModel = require("../models/user");
const bycrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const getAll = async () => {
  try {
    const users = await UserModel.findAll({
      attributes: { exclude: ["password"] },
    });
    return users;
  } catch (error) {
    console.error("Error fetching users:", error);
    throw error;
  }
};

const getById = async (id) => {
  try {
    const user = await UserModel.findByPk(id, {
      attributes: { exclude: ["password"] },
    });
    if (!user) {
      throw new Error("User not found");
    }
    return user;
  } catch (error) {
    console.error(`Error fetching user with ID ${id}:`, error);
    throw error;
  }
};

const store = async (userData) => {
  try {
    const passwordHash = await bycrypt.hash(userData.password, 10);
    const user = await UserModel.create({
      ...userData,
      password: passwordHash,
    });
    return user;
  } catch (error) {
    console.error("Error creating user:", error);
    throw error;
  }
};

const update = async (id, userData) => {
  try {
    if (userData.password) {
      userData.password = await bycrypt.hash(userData.password, 10);
    }
    const [affectedRows] = await UserModel.update(userData, {
      where: { id },
    });
    if (affectedRows === 0) {
      throw new Error("User not found or no changes made");
    }
    const updatedUser = await UserModel.findByPk(id, {
      attributes: { exclude: ["password"] },
    });
    if (!updatedUser) {
      throw new Error("User not found after update");
    }
    return updatedUser;
  } catch (error) {
    console.error(`Error updating user with ID ${id}:`, error);
    throw error;
  }
};

const destroy = async (id) => {
  try {
    const user = await UserModel.destroy({
      where: { id },
    });
    if (!user) {
      throw new Error("User not found");
    }
    return { message: "User deleted successfully" };
  } catch (error) {
    console.error(`Error deleting car with ID ${id}:`, error);
    throw error;
  }
};

const login = async (username, password) => {
  try {
    const user = await UserModel.findOne({
      where: { username },
    });
    if (!user) throw new Error("User not found");
    const isPasswordValid = await bycrypt.compare(password, user.password);
    if (!isPasswordValid) throw new Error("Invalid password");

    const token = generateToken(user);
    return {
      user: {
        id: user.id,
        username: user.username,
      },
      token,
    };
  } catch (error) {
    console.error("Error during login:", error);
    throw error;
  }
};

const generateToken = (user) => {
  const token = jwt.sign(
    { id: user.id, username: user.username },
    process.env.JWT_SECRET,
    { expiresIn: "1d" }
  );

  return token;
};

const userRepository = {
  getAll,
  getById,
  store,
  update,
  destroy,
  login,
};

module.exports = userRepository;
