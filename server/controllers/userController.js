import User from "../models/User.js";
import bcrypt from "bcrypt";

const getUser = async (req, res) => {
  const user = await User.find().sort({ createdAt: -1 }).lean();
  if(!user.length) {
    return res.status(404).json({message: "No user found"})
  }

  res.json(user)
}

const createUser = async (req, res) => {
  const { username, password, role } = req.body;

  //forms not filled properly
  if (!username || !password || !Array.isArray(role) || !role.length) {
    return res.status(400).json({ message: "All fields are required" });
  }

  //duplicate user
  const duplicate = await User.findOne({ username }).collation({ locale: "en", strength: 2 }).lean().exec();
  if (duplicate) {
    return res.status(409).json({ message: "Duplicate Username" });
  }

  //hash password
  const hashedPwd = await bcrypt.hash(password, 10); //10 salt rounds

  const userObject = { username, password: hashedPwd, role };

  //store new user
  const user = await User.create(userObject);

  if (user) {
    return res.status(201).json({ message: `New User ${username} created!` });
  } else {
    res.status(400).json({ message: "Invalid user data received" })
  }
};


const updateUser = async (req, res) => {
  const { id } = req.params;
  
  const { username, password, role } = req.body;

  //check data
  if (!id || !username || !Array.isArray(role) || !role.length) {
    return res.status(400).json({message: 'Username and roles are required'})
  }

  const user = await User.findById(id).exec()

  if (!user) {
    return res.status(400).json({ message: "User not found" });
  }

  //check for duplicate
  const duplicate = await User.findOne({username}).collation({ locale: "en", strength: 2 }).lean().exec()
  if(duplicate && duplicate?._id.toString() !== id) {
    return res.status(409).json({message: 'Duplicate username'})
  }

  user.username = username;
  user.role = role;
  
  if (password) {
      user.password = await bcrypt.hash(password, 10); //hash password
  }

  const updatedUser = await user.save();
  res.json({ message: `Username ${updatedUser.username} has been updated` });
};

const deleteUser = async (req, res) => {
    const {id} = req.params

    //check data
    if (!id) {
        return res.status(400).json({message: 'User ID required'})
    }

    const user = await User.findById(id).exec()

    if(!user) {
        return res.status(400).json({message: 'User not found'})
    }

    const result = await User.deleteOne({_id: id})

    res.json({message: `User ${user.username} with ID ${id} deleted`})
}

export { getUser, createUser, updateUser, deleteUser };
