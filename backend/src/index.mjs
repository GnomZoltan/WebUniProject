import express from "express";
import mongoose from "mongoose";
import routes from "./routers/main-router.mjs";
import cors from "cors";
import cookieParser from "cookie-parser";
import dotenv from "dotenv";

dotenv.config();

mongoose
  .connect("mongodb://localhost/web_uni_project")
  .then(() => console.log("Connected to Database"))
  .catch((err) => console.log(`Error: ${err}`));

const app = express();

app.use(cookieParser());

app.use(
  cors({
    credentials: true,
    origin: "http://localhost:3000",
  })
);

app.use(express.json());

app.use(routes);

const PORT = process.env.PORT || 8000;

app.listen(PORT, () => {
  console.log(`Running on Port ${PORT}`);
});
