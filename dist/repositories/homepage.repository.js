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
};
exports.default = HomePageRepository;
