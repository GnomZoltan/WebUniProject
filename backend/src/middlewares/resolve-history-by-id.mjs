import { RequestHistory } from "../models/request-history.mjs";

const resolveHistoryById = async (req, res, next) => {
  const {
    params: { id },
  } = req;

  try {
    const historyItem = await RequestHistory.findById(id);

    if (!historyItem) {
      return res.status(404).send({ message: "Request history not found" });
    }

    req.historyItem = historyItem;
    next();
  } catch (err) {
    return res.status(400).send({ message: "Invalid request history ID" });
  }
};

export default resolveHistoryById;
