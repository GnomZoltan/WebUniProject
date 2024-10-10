import { Router } from "express";
import { User } from "../models/user.mjs";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import authenticateJWT from "../middlewares/verify-jwt.mjs";

const router = Router();

router.post("/register", async (req, res) => {
  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(req.body.password, salt);

  const user = new User({
    username: req.body.username,
    email: req.body.email,
    password: hashedPassword,
  });

  const savedUser = await user.save();

  const { password, ...data } = await savedUser.toJSON();

  const accessToken = jwt.sign(
    { _id: savedUser._id },
    "process.env.JWT_SECRET_ACCESS_KEY",
    { expiresIn: "1m" }
  );

  const refreshToken = jwt.sign(
    { _id: savedUser._id },
    "process.env.JWT_SECRET_REFRESH_KEY"
  );

  res.cookie("jwt-refresh", refreshToken, {
    httpOnly: true,
    maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
  });

  res.send(accessToken);
});

router.post("/login", async (req, res) => {
  const user = await User.findOne({ email: req.body.email });

  if (!user) return res.status(404).send({ message: "User not found" });

  if (!(await bcrypt.compare(req.body.password, user.password)))
    return res.status(400).send({ message: "Bad credentials" });

  const accessToken = jwt.sign(
    { _id: user._id },
    "process.env.JWT_SECRET_ACCESS_KEY",
    { expiresIn: "1m" }
  );

  const refreshToken = jwt.sign(
    { _id: user._id },
    "process.env.JWT_SECRET_REFRESH_KEY"
  );

  res.cookie("jwt-refresh", refreshToken, {
    httpOnly: true,
    maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
  });

  res.send(accessToken);
});

router.get("/refresh", async (req, res) => {
  try {
    const refreshToken = req.cookies["jwt-refresh"];

    const claims = jwt.verify(
      refreshToken,
      "process.env.JWT_SECRET_REFRESH_KEY"
    );

    if (!claims) res.status(401).send({ message: "unaunthenticated" });

    const accessToken = jwt.sign(
      { _id: claims._id },
      "process.env.JWT_SECRET_ACCESS_KEY",
      { expiresIn: "1m" }
    );

    res.send(accessToken);
  } catch (err) {
    return res.status(401).send({ message: "Unautheticated" });
  }
});

router.use(authenticateJWT);
router.delete("/logout", (req, res) => {
  res.cookie("jwt-refresh", "", { maxAge: 0 });

  res.send({
    message: "success",
  });
});

export default router;
