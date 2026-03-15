import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { User } from "../models/user.model.js";

const register = async (req, res) => {
  try {
    const { fullName, email, password, role } = req.body;

    const userExists = await User.findOne({ email });

    if (userExists) {
      return res.status(400).json({
        msg: "User already exists",
      });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    await User.create({
      fullName,
      email,
      password: hashedPassword,
      role,
    });

    return res.status(201).json({
      msg: "User registered",
    });
  } catch (error) {
    console.error("Registration Error ", error);
    return res.status(500).json({
      msg: "Registration failed",
    });
  }
};

const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });

    if (!user) {
      return res.status(400).json({
        msg: "Invalid credentials",
      });
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);

    if (!isPasswordValid) {
      return res.status(400).json({
        msg: "Invalid credentials",
      });
    }

    const token = jwt.sign(
      {
        id: user._id,
        role: user.role,
      },
      process.env.JWT_SECRET,
      { expiresIn: "1d" },
    );

    const cookieOptions = {
      httpOnly: true,
      secure: true,
    };

    return res.status(200).cookie("token", token, cookieOptions).json({
      msg: "Login successful",
    });
  } catch (error) {
    console.error("Login Error", error);
    return res.status(500).json({
      msg: "Login failed",
    });
  }
};

export { register, login };
