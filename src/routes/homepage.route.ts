import express from "express";

import HomePageController from "../controllers/homepage.controller";
import { upload } from "../libs/upload";

const HomePageRouter = express.Router();

// Hero Section
HomePageRouter.get("/hero", HomePageController.handleGetAllHero);
HomePageRouter.get("/hero/:id", HomePageController.handleGetHeroById);
HomePageRouter.post("/hero", upload.single("image"), HomePageController.handleCreateHero);
HomePageRouter.patch("/hero/:id", upload.single("image"), HomePageController.handleUpdateHero);
HomePageRouter.delete("/hero/:id", HomePageController.handleDeleteHero);

// Home Description Section
HomePageRouter.get("/descriptions", HomePageController.handleGetAllHomeDescription);
HomePageRouter.get("/descriptions/:id", HomePageController.handleGetHomeDescriptionById);
HomePageRouter.post("/descriptions", HomePageController.handleCreateHomeDescription);
HomePageRouter.patch("/descriptions/:id", HomePageController.handleUpdateHomeDescription);
HomePageRouter.delete("/descriptions/:id", HomePageController.handleDeleteHomeDescription);

// Features
HomePageRouter.get("/features", HomePageController.handleGetAllFeatures);
HomePageRouter.get("/features/:id", HomePageController.handleGetFeaturesById);
HomePageRouter.post("/features", HomePageController.handleCreateFeatures);
HomePageRouter.patch("/features/:id", HomePageController.handleUpdateFeatures);
HomePageRouter.delete("/features/:id", HomePageController.handleDeleteFeatures);

export default HomePageRouter;
