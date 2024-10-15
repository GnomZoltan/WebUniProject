import { User } from "../models/user.mjs";

const resolveUserById = async (req, res, next) => {
  const {
    params: { id },
  } = req;

  try {
    const user = await User.findById(id);

    if (!user) {
      return res.status(404).send({ message: "User not found" });
    }

    req.user = user;
    next();
  } catch (err) {
    return res.status(400).send({ message: "Invalid user ID" });
  }
};

export default resolveUserById;
