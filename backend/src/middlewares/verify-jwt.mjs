import jwt from "jsonwebtoken";
import { User } from "../models/user.mjs";

const authenticateJWT = async (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;

    const [header, token] = authHeader.split(" ");

    if (!(header && token)) {
      return res.status(401).send("Authentication credentials are required.");
    }

    const claims = jwt.verify(token, "process.env.JWT_SECRET_ACCESS_KEY");

    if (!claims) res.status(401).send({ message: "unaunthenticated" });
    const user = await User.findOne({ _id: claims._id });

    const { password, ...data } = await user.toJSON();

    req.data = data;
    next();
  } catch (err) {
    return res.status(401).send({ message: "JWT must be provided" });
  }
};

export default authenticateJWT;
