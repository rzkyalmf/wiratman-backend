"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const body_parser_1 = __importDefault(require("body-parser"));
const cookie_parser_1 = __importDefault(require("cookie-parser"));
const dotenv_1 = __importDefault(require("dotenv"));
const express_1 = __importDefault(require("express"));
const mongoose_1 = __importDefault(require("mongoose"));
const auth_route_1 = __importDefault(require("./routes/auth.route"));
const homepage_route_1 = __importDefault(require("./routes/homepage.route"));
dotenv_1.default.config();
const app = (0, express_1.default)();
mongoose_1.default
    .connect(process.env.MONGO_URI)
    .then(() => {
    console.log("Connected to MongoDB");
})
    .catch((err) => {
    console.log("Error connecting to MongoDB", err);
});
app.use(express_1.default.json());
app.use((0, cookie_parser_1.default)());
app.use(body_parser_1.default.urlencoded({ extended: true }));
app.use("/api/v1/auth", auth_route_1.default);
app.use("/api/v1/homepage", homepage_route_1.default);
app.listen(8000, () => {
    console.log("Server running on port 8000");
});
