import userModel from "../models/userModel.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import validator from "validator";

// login user
const loginUser = async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await userModel.findOne({ email });
    if (!user) {
      return res.json({ success: false, message: "User Doesn't exist" });
    }
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.json({ success: false, message: "Invalid Credentials" });
    }
    const role = user.role;
    const token = createToken(user._id);
    res.json({ success: true, token, role });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: "Error" });
  }
};

// Create token
const createToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET);
};

// register user
const registerUser = async (req, res) => {
  try {
    const { name, email, password, role, adminKey } = req.body;

    // First check if all required fields are present
    if (!name || !email || !password) {
      return res.json({ 
        success: false, 
        message: "Name, email and password are required" 
      });
    }

    // Check if trying to create admin account
    if (role === "admin") {
      console.log('Received adminKey:', adminKey);
      console.log('Expected adminKey:', process.env.ADMIN_KEY);
      console.log('Match:', adminKey === process.env.ADMIN_KEY);
      
      if (!adminKey || adminKey !== process.env.ADMIN_KEY) {
        return res.json({ 
          success: false, 
          message: "Unauthorized admin creation" 
        });
      }
    }

    // checking user is already exist
    const exists = await userModel.findOne({ email });
    if (exists) {
      return res.json({ success: false, message: "User already exists" });
    }

    // validating email format and strong password
    if (!validator.isEmail(email)) {
      return res.json({ success: false, message: "Please enter valid email" });
    }
    if (password.length < 8) {
      return res.json({
        success: false,
        message: "Please enter strong password",
      });
    }

    // hashing user password
    const salt = await bcrypt.genSalt(Number(process.env.SALT));
    const hashedPassword = await bcrypt.hash(password, salt);

    const newUser = new userModel({
      name: name,
      email: email,
      password: hashedPassword,
      role: role || "user"  // If role is not provided, defaults to "user"
    });

    const user = await newUser.save();
    const userRole = user.role;
    const token = createToken(user._id);
    res.json({ success: true, token, role: userRole });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: "Error" });
  }
};

export { loginUser, registerUser };