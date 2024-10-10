import { RequestHistory } from "../models/request-history.mjs";
import jwt from "jsonwebtoken";

const logRequest = async (req, res, next) => {
  const refreshToken = req.cookies["jwt-refresh"];

  const claims = jwt.verify(refreshToken, "process.env.JWT_SECRET_REFRESH_KEY");

  if (!claims) res.status(401).send({ message: "unaunthenticated" });

  const userId = claims._id;
  console.log(userId);

  const log = new RequestHistory({
    method: req.method,
    url: req.url,
    headers: req.headers,
    body: req.body,
    query: req.query,
    params: req.params,
    user: userId,
  });

  log
    .save()
    .then(() => console.log("Запит збережено"))
    .catch((err) => console.error("Помилка при збереженні запиту:", err));

  next();
};

export default logRequest;
