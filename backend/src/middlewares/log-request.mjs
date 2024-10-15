import { RequestHistory } from "../models/request-history.mjs";
import jwt from "jsonwebtoken";

const logRequest = async (req, res, next) => {
  const refreshToken = req.cookies["jwt-refresh"];

  const claims = jwt.verify(refreshToken, "process.env.JWT_SECRET_REFRESH_KEY");

  if (!claims) res.status(401).send({ message: "unaunthenticated" });

  const userId = claims._id;

  let description = "";

  switch (req.url) {
    case "/api/solve/gauss":
      description = "Gauss method of solving equations";
      break;
    case "/api/solve/cramer":
      description = "Cramer method of solving equations";
      break;
    case "/api/solve/jakobi":
      description = "Jakobi method of solving equations";
      break;
    default:
      description = "General API request";
  }

  const originalSend = res.send;
  res.send = function (body) {
    const { result, complexity } = body;

    const log = new RequestHistory({
      description: description,
      user: userId,
      outputResult: result,
      outputComplexity: complexity,
    });

    log
      .save()
      //.then(() => console.log("Запит збережено"))
      .catch((err) => console.error(""));

    originalSend.apply(res, arguments);
  };

  next();
};

export default logRequest;
