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
Object.defineProperty(exports, "__esModule", { value: true });
const homepage_model_1 = require("../models/homepage.model");
const HomePageRepository = {
    // Hero Section
    getAllHero: () => __awaiter(void 0, void 0, void 0, function* () {
        return yield homepage_model_1.Hero.find();
    }),
    getHeroById: (id) => __awaiter(void 0, void 0, void 0, function* () {
        const hero = yield homepage_model_1.Hero.findById(id);
        return hero;
    }),
    createHero: (heroData) => __awaiter(void 0, void 0, void 0, function* () {
        const hero = new homepage_model_1.Hero(heroData);
        const newHero = yield hero.save();
        return newHero;
    }),
    updateHero: (id, heroData) => __awaiter(void 0, void 0, void 0, function* () {
        return yield homepage_model_1.Hero.findByIdAndUpdate(id, heroData, { new: true });
    }),
    deleteHero: (id) => __awaiter(void 0, void 0, void 0, function* () {
        return yield homepage_model_1.Hero.findByIdAndDelete(id);
    }),
    // Home Description
    getAllHomeDescription: () => __awaiter(void 0, void 0, void 0, function* () {
        return yield homepage_model_1.HomeDescription.find();
    }),
    getHomeDescriptionById: (id) => __awaiter(void 0, void 0, void 0, function* () {
        const homeDescription = yield homepage_model_1.HomeDescription.findById(id);
        return homeDescription;
    }),
    createHomeDescription: (data) => __awaiter(void 0, void 0, void 0, function* () {
        const homeDescription = new homepage_model_1.HomeDescription(data);
        const newHomeDescription = yield homeDescription.save();
        return newHomeDescription;
    }),
    updateHomeDescription: (id, data) => __awaiter(void 0, void 0, void 0, function* () {
        return yield homepage_model_1.HomeDescription.findByIdAndUpdate(id, data, { new: true });
    }),
    deleteHomeDescription: (id) => __awaiter(void 0, void 0, void 0, function* () {
        return yield homepage_model_1.HomeDescription.findByIdAndDelete(id);
    }),
    // Features
    getAllFeatures: () => __awaiter(void 0, void 0, void 0, function* () {
        return yield homepage_model_1.Features.find();
    }),
    getFeaturesById: (id) => __awaiter(void 0, void 0, void 0, function* () {
        const features = yield homepage_model_1.Features.findById(id);
        return features;
    }),
    createFeatures: (data) => __awaiter(void 0, void 0, void 0, function* () {
        const features = new homepage_model_1.Features(data);
        const newFeatures = yield features.save();
        return newFeatures;
    }),
    updateFeatures: (id, data) => __awaiter(void 0, void 0, void 0, function* () {
        return yield homepage_model_1.Features.findByIdAndUpdate(id, data, { new: true });
    }),
    deleteFeatures: (id) => __awaiter(void 0, void 0, void 0, function* () {
        return yield homepage_model_1.Features.findByIdAndDelete(id);
    }),
};
exports.default = HomePageRepository;
