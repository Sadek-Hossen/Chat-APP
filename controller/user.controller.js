import User from "../model/model.js";
import jwtToken from "../jwt/jwtToken.js";
import bcrypt from "bcryptjs";

export const createUser = async (req, res) => {
  try {
    const { name, email, password, confirmPassword } = req.body;

    if (!name || !email || !password || !confirmPassword) {
      return res.status(400).json({ message: "All fields are required" });
    }

    if (password !== confirmPassword) {
      return res.status(400).json({ message: "Password not matched" });
    }

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: "User already exists" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = new User({
      name,
      email,
      password: hashedPassword,
    });

    await newUser.save();

    // set jwt cookie
    jwtToken(newUser._id, res);

    // remove password from response
    const { password: _, ...userWithoutPassword } = newUser._doc;

    res.status(201).json({
      message: "User created successfully",
      user: userWithoutPassword,
    });
  } catch (error) {
    res.status(500).json({
      message: "Error creating user",
      error: error.message,
    });
  }
};

export const login = async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await User.findOne({ email });
    const isMatch = await bcrypt.compare(password, user.password);
    if (!user || !isMatch) {
      return res.status(400).json({ message: "Invalid email or password" });
    }
    jwtToken(user._id, res);
    res.status(200).json({
      message: "Login successful",
      user: {
        _id: user._id,
        name: user.name,
        email: user.email,
      }
    });
  } catch (error) {
    res.status(500).json({
      message: "Error logging in",
      error: error.message,
    });
  }
};

export const logout = (req, res) => {
 try {
    res.clearCookie("jwt");
  res.status(200).json({ message: "Logout successful" });
 } catch (error) {
    res.status(500).json({
      message: "Error logging out",
      error: error.message,
    });
 }
}

export const getUser =async (req, res) => {
  try {
    const user = await User.findById(req.user._id).select("-password"); 
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    res.status(200).json({ user });
  } catch (error) {
    res.status(500).json({
      message: "Error fetching user", 
      error: error.message,
    });
  } 
}

// get all users 
export const getUserProfile = async (req, res)=>{
  try {
    const logedUser = req.user._id;
    const filterUser = await User.find({_id: {$ne: logedUser}}).select("-password"); // Exclude password field
    res.status(201).json({message:"All users fetched successfully", filterUser});
 //  console.log('all users : ' + filterUser)
  } catch (error) {
    res.status(500).json({
      message: "Error fetching all users",
      error: error.message,
    });
  }
}