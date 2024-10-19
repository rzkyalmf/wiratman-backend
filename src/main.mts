import dotenv from "dotenv";
import express, { Application } from "express";
import mongoose from "mongoose";

import UserRouter from "./routes/user.route";

dotenv.config();

mongoose
  .connect(process.env.MONGO_URI as string)
  .then(() => console.log("Connected to MongoDB"))
  .catch((err) => console.log("Error connecting to MongoDB", err));

const app: Application = express();
app.use(express.json());

app.use("/user", UserRouter);

const PORT = process.env.PORT || 8001;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
