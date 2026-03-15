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

    return res.status(201).json({
      leave,
      msg: "Leave applied successfully",
    });
  } catch (error) {
    console.error("Leave request error ", error);
    return res.status(500).json({
      msg: "Leave request failed",
    });
  }
};

const getMyLeaves = async (req, res) => {
  const leaves = await Leave.find({
    employeeId: req.user?._id,
  });

  return res.status(200).json({
    leaves,
    msg: "Leave fetched successfully",
  });
};

const cancelLeave = async (req, res) => {
  try {
    const leave = await Leave.findById(req.params.id);

    if (!leave) {
      return res.status(404).json({
        msg: "Leave not found",
      });
    }

    if (leave.employeeId.toString() !== req.user._id.toString()) {
      return res.status(403).json({
        msg: "You cannot cancel this leave",
      });
    }

    if (leave.status !== "pending") {
      return res.status(400).json({
        msg: "Only pending leave can be cancelled",
      });
    }

    await leave.deleteOne();

    return res.status(200).json({
      msg: "Leave cancelled successfully",
    });
  } catch (error) {
    return res.status(500).json({
      msg: "Error cancelling leave",
    });
  }
};

export { applyLeave, getMyLeaves, cancelLeave };
