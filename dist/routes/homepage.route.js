"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const homepage_controller_1 = __importDefault(require("../controllers/homepage.controller"));
const upload_1 = require("../libs/upload");
const HomePageRouter = express_1.default.Router();
HomePageRouter.get("/", homepage_controller_1.default.handleGetAllHero);
HomePageRouter.post("/create-hero", upload_1.upload.single("image"), homepage_controller_1.default.handleCreateHero);
HomePageRouter.patch("/update-hero/:id", upload_1.upload.single("image"), homepage_controller_1.default.handleUpdateHero);
HomePageRouter.delete("/delete-hero/:id", homepage_controller_1.default.handleDeleteHero);
HomePageRouter.get("/:id", homepage_controller_1.default.handleGetHeroById);
exports.default = HomePageRouter;
