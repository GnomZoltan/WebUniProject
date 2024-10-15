import { Router } from "express";
import { User } from "../models/user.mjs";
import resolveUserById from "../middlewares/resolve-user-by-id.mjs";

const router = Router();

router.get("/", async (req, res) => {
  return res.status(200).send(await User.find());
});

router.put("/:id", resolveUserById, async (req, res) => {
  const { body, user } = req;

  try {
    const updatedUser = await User.findByIdAndUpdate(user._id, body, {
      new: true,
    });

    if (!updatedUser) {
      return res.status(404).send({ message: "User not found" });
    }

    return res.status(200).send(updatedUser);
  } catch (err) {
    return res.status(400).send({ message: "Error updating user", error: err });
  }
});

router.delete("/:id", resolveUserById, async (req, res) => {
  const { user } = req;

  try {
    await User.findByIdAndDelete(user._id);
    return res.sendStatus(200);
  } catch (err) {
    return res
      .status(400)
      .send({ message: "Error deleting user history", error: err });
  }
});

export default router;
