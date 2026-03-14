import bcrypt from "bcryptjs";
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

    res.status(201).json({
      msg: "User registered",
    });
  } catch (error) {
    console.error("Registration Error ", error);
    res.status(500).json({
      msg: "Registration failed",
    });
  }
};

export { register };
