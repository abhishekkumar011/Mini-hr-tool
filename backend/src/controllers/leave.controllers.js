import { Leave } from "../models/leave.model.js";

const applyLeave = async (req, res) => {
  try {
    const { leaveType, startDate, endDate, reason } = req.body;

    const totalDays =
      (new Date(endDate) - new Date(startDate)) / (1000 * 60 * 60 * 24) + 1;

    const leave = await Leave.create({
      employeeId: req.user._id,
      leaveType,
      startDate,
      endDate,
      totalDays,
      reason,
    });

    res.status(201).json(leave);
  } catch (error) {
    res.status(500).json({
      msg: "Leave request failed",
    });
  }
};

export { applyLeave };
