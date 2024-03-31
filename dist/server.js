"use strict";
//const express = require('express');//Require method only in Node --> @types/node  helps understand / translate node ka code to TS
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const todos_1 = __importDefault(require("./routes/todos"));
const body_parser_1 = __importDefault(require("body-parser"));
const app = (0, express_1.default)();
app.use(body_parser_1.default.json());
app.use(todos_1.default);
//default route
app.use((req, res, next) => {
    res.status(200).json("Seems like you hit the default response, I guess nothing else was hit!");
});
app.listen(9090, "localhost", () => console.log("Listening to PORT 9090"));
