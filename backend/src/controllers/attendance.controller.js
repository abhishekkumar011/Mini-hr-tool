import { Attendance } from "../models/attendance.model.js";

const markAttendance = async (req, res) => {
  try {
    const { status } = req.body;

    const today = new Date().setHours(0, 0, 0, 0);

    const attendance = await Attendance.create({
      employeeId: req.user._id,
      date: today,
      status,
    });

    return res.status(201).json({
      attendance,
      msg: "Attendance marked successfully",
    });
  } catch (error) {
    return res.status(400).json({
      msg: "Attendance already marked",
    });
  }
};

const getMyAttendance = async (req, res) => {
  const records = await Attendance.find({
    employeeId: req.user._id,
  });

  return res.status(200).json(records);
};

export { markAttendance, getMyAttendance };
