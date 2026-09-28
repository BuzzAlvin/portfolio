import User from "../models/User.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

const isProduction = process.env.NODE_ENV === "production";

const login = async (req, res) => {
  const { username, password } = req.body;

  if (!username || !password) {
    return res.status(400).json({ message: "All fields are required" });
  }

  const foundUser = await User.findOne({ username }).exec();

  //check user
  if (!foundUser) {
    return res.status(400).json({ message: "Invalid username or password" });
  }

  const match = await bcrypt.compare(password, foundUser.password);

  if (!match)
    return res.status(401).json({ message: "Invalid username or password" });

  //JWT COOKIE
  const accessToken = jwt.sign(
    {
      userInfo: {
        username: foundUser.username,
        role: foundUser.role,
      },
    },
    process.env.ACCESS_TOKEN_SECRET,
    { expiresIn: "10m" },
  );

  // REFRESH TOKEN
  const refreshToken = jwt.sign(
    { username: foundUser.username },
    process.env.REFRESH_TOKEN_SECRET,
    { expiresIn: "1d" },
  );

  //CREATE THE REFRESH TOKEN
  res.cookie("jwt", refreshToken, {
    httpOnly: true,
    secure: isProduction,
    sameSite: isProduction ? "none" : "lax",
    maxAge: 7 * 24 * 60 * 60 * 1000,
  });
  res.json({ accessToken });
};

const refresh = async (req, res) => {
  const cookies = req.cookies;
  if (!cookies?.jwt) return res.status(401).json({ message: "Unauthorized" });

  const refreshToken = cookies.jwt;
  jwt.verify(
    refreshToken,
    process.env.REFRESH_TOKEN_SECRET,
    async (err, decoded) => {
      if (err) return res.status(403).json({ message: "Forbidden" });
      const foundUser = await User.findOne({ username: decoded.username });

      if (!foundUser) return res.status(401).json({ message: "Unauthorized" });
      const accessToken = jwt.sign(
        {
          userInfo: {
            username: foundUser.username,
            role: foundUser.role,
          },
        },
        process.env.ACCESS_TOKEN_SECRET,
        { expiresIn: "10m" },
      );
      res.json({ accessToken });
    },
  );
};

const logout = async (req, res) => {
  const cookies = req.cookies;
  if (!cookies?.jwt) return res.sendStatus(204);

  res.clearCookie("jwt", {
    httpOnly: true,
    secure: isProduction,
    sameSite: isProduction ? "none" : "lax",
  });
  res.json({ message: "Logged out successfully! " });
};

export { login, refresh, logout };
