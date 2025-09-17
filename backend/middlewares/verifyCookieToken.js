import jwt from "jsonwebtoken";

export const verifyCookieToken = (req, res, next) => {
  const token = req.cookies.token;
  if (!token) return res.status(401).json({ message: "Not authenticated" });

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.userId = decoded.userId;
    next(); // user is authenticated
  } catch (err) {
    return res.status(403).json({ message: "Invalid token" });
  }
};
