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
exports.OrderService = void 0;
const product_service_1 = require("../products/product.service");
const order_model_1 = __importDefault(require("./order.model"));
const AddNewOrderToDb = (data) => __awaiter(void 0, void 0, void 0, function* () {
    const Product = yield product_service_1.ProductService.getSingleProductFromDb(String(data.productId));
    const availAbleQuantity = Product === null || Product === void 0 ? void 0 : Product.inventory.quantity;
    const updatedQuantity = availAbleQuantity - data.quantity;
    if (availAbleQuantity < 0 || updatedQuantity < 0) {
        yield product_service_1.ProductService.updateSingleProductFromDb(String(data.productId), {
            'inventory.inStock': false,
        });
        throw new Error('Insufficient quantity available in inventory');
    }
    if (data.quantity > availAbleQuantity) {
        throw new Error('Insufficient quantity available in inventory');
    }
    const newOrder = yield order_model_1.default.create(data);
    yield product_service_1.ProductService.updateSingleProductFromDb(String(data.productId), {
        'inventory.quantity': updatedQuantity,
    });
    return newOrder;
});
const getAllOrderFromDb = () => __awaiter(void 0, void 0, void 0, function* () {
    const allOrders = yield order_model_1.default.find();
    if (!allOrders.length) {
        throw new Error('Order not found');
    }
    return allOrders;
});
const getOrderByEmailFromDb = (email) => __awaiter(void 0, void 0, void 0, function* () {
    const orderByEmail = yield order_model_1.default.find({ email }).exec();
    if (!orderByEmail.length) {
        throw new Error('Order not found');
    }
    return orderByEmail;
});
exports.OrderService = {
    AddNewOrderToDb,
    getAllOrderFromDb,
    getOrderByEmailFromDb,
};
