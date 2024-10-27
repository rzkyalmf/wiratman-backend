import express from "express";

import HomePageController from "../controllers/homepage.controller";
import { upload } from "../libs/upload";

const HomePageRouter = express.Router();

HomePageRouter.get("/", HomePageController.handleGetAllHero);

HomePageRouter.post(
  "/create-hero",
  upload.single("image"),
  HomePageController.handleCreateHero
);

HomePageRouter.patch(
  "/update-hero/:id",
  upload.single("image"),
  HomePageController.handleUpdateHero
);

HomePageRouter.delete("/delete-hero/:id", HomePageController.handleDeleteHero);

HomePageRouter.get("/:id", HomePageController.handleGetHeroById);

export default HomePageRouter;
