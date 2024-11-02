"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const fs_1 = __importDefault(require("fs"));
const homepage_services_1 = __importDefault(require("../services/homepage.services"));
const HomePageController = {
    // Hero Section
    handleGetAllHero: (_, res) => __awaiter(void 0, void 0, void 0, function* () {
        const heroes = yield homepage_services_1.default.getAllHero();
        res.status(200).json({ data: heroes });
        return;
    }),
    handleGetHeroById: (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        const { id } = req.params;
        const data = yield homepage_services_1.default.getHeroById(id);
        if (data.status === "error") {
            res.status(404).json({ message: data.message });
            return;
        }
        res.status(200).json(data);
        return;
    }),
    handleCreateHero: (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        const heroData = req.body;
        const file = req.file;
        if (!file) {
            res.status(403).json({ message: "Cover image is required" });
            return;
        }
        heroData.image = {
            filename: file.filename,
            originalName: file.originalname,
            path: file.path,
            size: file.size,
            mimetype: file.mimetype,
        };
        const data = yield homepage_services_1.default.createHero(heroData);
        if (data.status === "error") {
            fs_1.default.unlink(file.path, () => {
                "File not deleted";
            });
            res.status(403).json({
                message: data.message,
            });
            return;
        }
        res.status(201).json({
            message: "Hero created successfully",
            // data: data.newHero,
            status: "success",
        });
        return;
    }),
    handleUpdateHero: (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        const { id } = req.params;
        const heroData = req.body;
        const file = req.file;
        if (!file) {
            res.json({ error: "Cover image is required" });
            return;
        }
        heroData.image = {
            filename: file.filename,
            originalName: file.originalname,
            path: file.path,
            size: file.size,
            mimetype: file.mimetype,
        };
        const updatedHero = yield homepage_services_1.default.updateHero(id, heroData);
        if (updatedHero === null || updatedHero === void 0 ? void 0 : updatedHero.errors) {
            fs_1.default.unlink(file.path, () => {
                "File not deleted";
            });
            res.status(403).json({ message: updatedHero.errors });
            return;
        }
        res.status(200).json({
            // data: updatedHero,
            message: "Hero updated successfully",
            status: "success",
        });
        return;
    }),
    handleDeleteHero: (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        const { id } = req.params;
        yield homepage_services_1.default.deleteHero(id);
        res.status(200).json({ message: "Hero deleted successfully" });
        return;
    }),
    // Home Description
    handleGetAllHomeDescription: (_, res) => __awaiter(void 0, void 0, void 0, function* () {
        const data = yield homepage_services_1.default.getAllHomeDescription();
        res.status(200).json({ data });
        return;
    }),
    handleGetHomeDescriptionById: (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        const { id } = req.params;
        const data = yield homepage_services_1.default.getHomeDescriptionById(id);
        if (data.status === "error") {
            res.status(404).json({ message: data.message });
            return;
        }
        res.status(200).json(data);
        return;
    }),
    handleCreateHomeDescription: (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        const getData = req.body;
        const data = yield homepage_services_1.default.createHomeDescription(getData);
        if (data.status === "error") {
            res.status(403).json({
                message: data.message,
            });
            return;
        }
        res.status(201).json({
            message: "Home Description created successfully",
            status: "success",
        });
        return;
    }),
    handleUpdateHomeDescription: (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        const { id } = req.params;
        const getData = req.body;
        const updatedHomeDescription = yield homepage_services_1.default.updateHomeDescription(id, getData);
        if (updatedHomeDescription === null || updatedHomeDescription === void 0 ? void 0 : updatedHomeDescription.errors) {
            res.status(403).json({ message: updatedHomeDescription.errors });
            return;
        }
        res.status(200).json({
            message: "Home Description updated successfully",
            status: "success",
        });
        return;
    }),
    handleDeleteHomeDescription: (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        const { id } = req.params;
        yield homepage_services_1.default.deleteHomeDescription(id);
        res.status(200).json({ message: "Home Description deleted successfully" });
        return;
    }),
    // Features
    handleGetAllFeatures: (_, res) => __awaiter(void 0, void 0, void 0, function* () {
        const data = yield homepage_services_1.default.getAllFeatures();
        res.status(200).json({ data });
        return;
    }),
    handleGetFeaturesById: (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        const { id } = req.params;
        const data = yield homepage_services_1.default.getFeaturesById(id);
        if (data.status === "error") {
            res.status(404).json({ message: data.message });
            return;
        }
        res.status(200).json(data);
        return;
    }),
    handleCreateFeatures: (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        const getData = req.body;
        const data = yield homepage_services_1.default.createFeatures(getData);
        if (data.status === "error") {
            res.status(403).json({
                message: data.message,
            });
            return;
        }
        res.status(201).json({
            message: "Features created successfully",
            status: "success",
        });
        return;
    }),
    handleUpdateFeatures: (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        const { id } = req.params;
        const getData = req.body;
        const updatedFeatures = yield homepage_services_1.default.updateFeatures(id, getData);
        if (updatedFeatures === null || updatedFeatures === void 0 ? void 0 : updatedFeatures.errors) {
            res.status(403).json({ message: updatedFeatures.errors });
            return;
        }
        res.status(200).json({
            message: "Features updated successfully",
            status: "success",
        });
        return;
    }),
    handleDeleteFeatures: (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        const { id } = req.params;
        yield homepage_services_1.default.deleteFeatures(id);
        res.status(200).json({ message: "Features deleted successfully" });
        return;
    }),
};
exports.default = HomePageController;
