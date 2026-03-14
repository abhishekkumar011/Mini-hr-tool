import jwt from "jsonwebtoken";
import { User } from "../models/user.model.js";

export const verifyJWT = async (req, res, next) => {
  try {
    const token =
      req.cookies?.token || req.header("Authorization")?.replace("Bearer ", "");

    if (!token) {
      return res.status(401).json({ msg: "Unauthorized request" });
    }

    const decodedToken = jwt.verify(token, process.env.JWT_SECRET);

    const user = await User.findById(decodedToken?.id).select("-password");

    if (!user) {
      return res.status(401).json({
        msg: "Invalid Token",
      });
    }

    req.user = user;
    next();
  } catch (error) {
    console.error("User token error ", error);
    return res.status(401).json({
      msg: "Unauthorized",
    });
  }
};
