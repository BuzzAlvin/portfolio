
const requireRole = (...allowedRoles) => (req, res, next) => {
  const userRoles = Array.isArray(req.role) ? req.role : [req.role];

  const hasAccess = userRoles.some((role) => allowedRoles.includes(role));

  if (!hasAccess) {
    return res.status(403).json({ message: "Forbidden" });
  }

  next();
};

export default requireRole;