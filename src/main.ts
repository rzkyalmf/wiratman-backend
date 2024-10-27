import bodyParser from "body-parser";
import cookieParser from "cookie-parser";
import dotenv from "dotenv";
import express from "express";
import { Express } from "express";
import mongoose from "mongoose";

import AuthRouter from "./routes/auth.route";
import HomePageRouter from "./routes/homepage.route";

dotenv.config();
const app: Express = express();

mongoose
  .connect(process.env.MONGO_URI as string)
  .then(() => {
    console.log("Connected to MongoDB");
  })
  .catch((err: unknown) => {
    console.log("Error connecting to MongoDB", err);
  });

app.use(express.json());
app.use(cookieParser());
app.use(bodyParser.urlencoded({ extended: true }));

app.use("/user", AuthRouter);
app.use("/homepage", HomePageRouter);

app.listen(8000, () => {
  console.log("Server running on port 8000");
});
