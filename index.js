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
const express_1 = __importDefault(require("express")); //creating the express interface
const dotenv_1 = __importDefault(require("dotenv"));
const promises_1 = __importDefault(require("fs/promises"));
dotenv_1.default.config();
const app = (0, express_1.default)();
const PORT = process.env.PORT;
app.use(express_1.default.json());
app.use(express_1.default.urlencoded({ extended: true }));
app.use(express_1.default.json());
app.use(express_1.default.urlencoded({ extended: true }));
app.get("/", (req, res) => {
    res.status(200).send("Hello world!!!");
});
app.get("/products", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    //   const products = JSON.parse(await fs.readFile("products.json", "utf-8"));
    //   res.status(200).send(products);
    try {
        const productsJson = yield promises_1.default.readFile("products.json", "utf-8");
        const products = JSON.parse(productsJson);
        res.status(200).send(products);
    }
    catch (err) {
        console.error("Error reading file:", err);
        res.status(500).send("Internal server error");
    }
}));
app.post("/", (req, res) => {
    console.log(req.body);
    return res.sendStatus(200);
});
app.post("/products", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const productsJson = yield promises_1.default.readFile("products.json", "utf-8");
        const products = JSON.parse(productsJson);
        const valueID = parseInt(new Date().getTime().toString());
        const product = {
            id: valueID,
            name: req.body.name,
            price: Number(req.body.price),
        };
        products.push(product);
        yield promises_1.default.writeFile("products.json", JSON.stringify(products));
        res.status(201).send({ product });
    }
    catch (err) {
        console.error("Error writing file:", err);
        res.status(500).send("Internal server error");
    }
}));
app.listen(PORT, () => {
    console.log(`Server running at http://127.0.0.1:${PORT}/`);
});
