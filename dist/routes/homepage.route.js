"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const homepage_controller_1 = __importDefault(require("../controllers/homepage.controller"));
const upload_1 = require("../libs/upload");
const HomePageRouter = express_1.default.Router();
// Hero Section
HomePageRouter.get("/hero", homepage_controller_1.default.handleGetAllHero);
HomePageRouter.get("/hero/:id", homepage_controller_1.default.handleGetHeroById);
HomePageRouter.post("/hero", upload_1.upload.single("image"), homepage_controller_1.default.handleCreateHero);
HomePageRouter.patch("/hero/:id", upload_1.upload.single("image"), homepage_controller_1.default.handleUpdateHero);
HomePageRouter.delete("/hero/:id", homepage_controller_1.default.handleDeleteHero);
// Home Description Section
HomePageRouter.get("/descriptions", homepage_controller_1.default.handleGetAllHomeDescription);
HomePageRouter.get("/descriptions/:id", homepage_controller_1.default.handleGetHomeDescriptionById);
HomePageRouter.post("/descriptions", homepage_controller_1.default.handleCreateHomeDescription);
HomePageRouter.patch("/descriptions/:id", homepage_controller_1.default.handleUpdateHomeDescription);
HomePageRouter.delete("/descriptions/:id", homepage_controller_1.default.handleDeleteHomeDescription);
// Features
HomePageRouter.get("/features", homepage_controller_1.default.handleGetAllFeatures);
HomePageRouter.get("/features/:id", homepage_controller_1.default.handleGetFeaturesById);
HomePageRouter.post("/features", homepage_controller_1.default.handleCreateFeatures);
HomePageRouter.patch("/features/:id", homepage_controller_1.default.handleUpdateFeatures);
HomePageRouter.delete("/features/:id", homepage_controller_1.default.handleDeleteFeatures);
exports.default = HomePageRouter;
