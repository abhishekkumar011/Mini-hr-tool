import { User } from "../models/user.model.js";

const getEmployees = async (req, res) => {
  const employees = await User.find({
    role: "employee",
  });

  return res.status(200).json({
    employees,
    msg: "Employees data fetched successfully",
  });
};

export { getEmployees };
