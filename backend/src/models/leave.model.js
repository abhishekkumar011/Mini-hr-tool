import mongoose, { Schema } from "mongoose";

const leaveSchema = new mongoose.Schema(
  {
    employeeId: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    leaveType: {
      type: String,
      enum: ["casual", "sick", "paid"],
      required: true,
    },
    startDate: Date,
    endDate: Date,
    totalDays: Number,
    reason: String,
    status: {
      type: String,
      enum: ["pending", "approved", "rejected"],
      default: "pending",
    },
    appliedDate: {
      type: Date,
      default: Date.now,
    },
  },
  { timestamps: true },
);

export const Leave = mongoose.model("Leave", leaveSchema);
