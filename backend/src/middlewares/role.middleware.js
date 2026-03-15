export const requireEmployee = (req, res, next) => {
  if (req.user.role !== "employee") {
    return res.status(403).json({
      msg: "Employee access required",
    });
  }
  next();
};

export const requireAdmin = (req, res, next) => {
  if (req.user.role !== "admin") {
    return res.status(403).json({
      msg: "Admin access required",
    });
  }
  next();
};
