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
const mongoose_1 = __importDefault(require("mongoose"));
const path_1 = __importDefault(require("path"));
const zod_1 = __importDefault(require("zod"));
const homepage_repository_1 = __importDefault(require("../repositories/homepage.repository"));
const CreateHeroSchema = zod_1.default.object({
    title: zod_1.default.string().min(3, { message: "Title Wajib diisi" }),
    buttonUrl: zod_1.default.string().url({ message: "URL tidak valid" }),
    image: zod_1.default.object({
        filename: zod_1.default.string(),
        originalName: zod_1.default.string(),
        path: zod_1.default.string(),
        size: zod_1.default.number(),
        mimetype: zod_1.default.string(),
    }),
});
const HomePageServices = {
    getAllHero: () => __awaiter(void 0, void 0, void 0, function* () {
        return yield homepage_repository_1.default.getAllHero();
    }),
    getHeroById: (id) => __awaiter(void 0, void 0, void 0, function* () {
        if (!mongoose_1.default.Types.ObjectId.isValid(id)) {
            return {
                status: "error",
                message: "Format ID tidak valid",
            };
        }
        const hero = yield homepage_repository_1.default.getHeroById(id);
        if (!hero) {
            return {
                status: "error",
                message: "Hero tidak ditemukan",
            };
        }
        return {
            status: "success",
            data: hero,
        };
    }),
    createHero: (heroData) => __awaiter(void 0, void 0, void 0, function* () {
        var _a;
        const dataValidated = CreateHeroSchema.safeParse(heroData);
        if (!dataValidated.success) {
            return {
                status: "error",
                errors: (_a = dataValidated.error) === null || _a === void 0 ? void 0 : _a.flatten().fieldErrors,
                message: dataValidated.error.issues[0].message,
            };
        }
        const newHero = yield homepage_repository_1.default.createHero(dataValidated.data);
        return { newHero, dataValidated };
    }),
    updateHero: (id, heroData) => __awaiter(void 0, void 0, void 0, function* () {
        var _a;
        const dataValidated = CreateHeroSchema.safeParse(heroData);
        if (!dataValidated.success) {
            return {
                status: "error",
                errors: (_a = dataValidated.error) === null || _a === void 0 ? void 0 : _a.flatten().fieldErrors,
            };
        }
        return yield homepage_repository_1.default.updateHero(id, heroData);
    }),
    deleteHero: (id) => __awaiter(void 0, void 0, void 0, function* () {
        const data = yield homepage_repository_1.default.deleteHero(id);
        if ((data === null || data === void 0 ? void 0 : data.image) && data.image.path) {
            try {
                // Hapus file gambar
                const imagePath = path_1.default.join(__dirname, "../../", data.image.path);
                if (fs_1.default.existsSync(imagePath)) {
                    fs_1.default.unlinkSync(imagePath);
                }
            }
            catch (error) {
                console.error("Error deleting image file:", error);
            }
        }
        return data;
    }),
};
exports.default = HomePageServices;
