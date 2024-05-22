"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const order_controller_1 = require("./order.controller");
const router = express_1.default.Router();
// Routes to CreateNewOrder
router.post('/', order_controller_1.createNewOrder);
// Routes to get AllOrder Or OrderByEmail
router.get('/', order_controller_1.getAllOrders);
exports.default = router;
