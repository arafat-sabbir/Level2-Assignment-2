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
exports.getAllOrders = exports.createNewOrder = void 0;
const order_zod_validation_1 = __importDefault(require("./order.zod.validation"));
const order_service_1 = require("./order.service");
// Create A New Order To Database
const createNewOrder = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { email, productId, price, quantity } = req.body;
        const validOrderData = order_zod_validation_1.default.parse({
            email,
            productId: productId,
            price,
            quantity,
        });
        const newOrder = yield order_service_1.OrderService.AddNewOrderToDb(validOrderData);
        res.status(200).json({
            success: true,
            message: 'Order created successfully!',
            data: newOrder,
        });
    }
    catch (err) {
        res.status(400).json({
            success: false,
            message: (Array.isArray(err.issues) &&
                err.issues.map((issue) => issue.message)) ||
                'Error Ordering Product',
            error: err.message,
        });
    }
});
exports.createNewOrder = createNewOrder;
// Get All Order Or Orders By Email From DataBase
const getAllOrders = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        let result;
        const { email } = req.query;
        if (email) {
            result = yield order_service_1.OrderService.getOrderByEmailFromDb(email);
        }
        else {
            result = yield order_service_1.OrderService.getAllOrderFromDb();
        }
        res.status(200).json({
            success: true,
            message: email
                ? 'Orders fetched successfully for user email!'
                : "'Orders fetched successfully!'",
            data: result,
        });
    }
    catch (err) {
        res.status(400).json({
            success: false,
            message: 'Error fetching Order!',
            error: err.message,
        });
    }
});
exports.getAllOrders = getAllOrders;
