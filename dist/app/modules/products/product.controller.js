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
exports.deleteSingleProduct = exports.updateSingleProductById = exports.getSingleProductById = exports.getAllProduct = exports.addNewProduct = void 0;
const product_service_1 = require("./product.service");
const product_zod_validation_1 = require("./product.zod.validation");
const addNewProduct = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const productData = req.body;
        const zodParseProduct = product_zod_validation_1.ProductValidationSchema.parse(productData);
        const newProduct = yield product_service_1.ProductService.addProductToDb(zodParseProduct);
        res.status(200).json({
            success: true,
            message: 'Product created successfully!',
            data: newProduct,
        });
    }
    catch (err) {
        res.status(400).json({
            success: false,
            message: (Array.isArray(err.issues) &&
                err.issues.map((issue) => issue.message)) ||
                'Error Creating Product',
            error: err,
        });
    }
});
exports.addNewProduct = addNewProduct;
const getAllProduct = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        let result;
        const { searchTerm } = req.query;
        if (searchTerm) {
            result = yield product_service_1.ProductService.getSearchProductsFromDb(searchTerm);
        }
        else {
            result = yield product_service_1.ProductService.getAllProductFromDb();
        }
        res.status(200).json({
            success: true,
            message: searchTerm
                ? `Products matching search term '${searchTerm}' fetched successfully!`
                : 'Product Fetched successfully!',
            data: result,
        });
    }
    catch (err) {
        res.status(400).json({
            success: false,
            message: (Array.isArray(err.issues) &&
                err.issues.map((issue) => issue.message)) ||
                'Error Fetching Products',
            error: err.message || err,
        });
    }
});
exports.getAllProduct = getAllProduct;
const getSingleProductById = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const _id = req.params.productId;
        const singleProduct = yield product_service_1.ProductService.getSingleProductFromDb(_id);
        res.status(200).json({
            success: true,
            message: 'Product Fetched successfully!',
            data: singleProduct,
        });
    }
    catch (err) {
        res.status(400).json({
            success: false,
            message: 'Error Fetching Products',
            error: err.message || err,
        });
    }
});
exports.getSingleProductById = getSingleProductById;
const updateSingleProductById = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const _id = req.params.productId;
        const newData = req.body;
        const updatedProduct = yield product_service_1.ProductService.updateSingleProductFromDb(_id, newData);
        res.status(200).json({
            success: true,
            message: 'Product updated successfully!',
            data: updatedProduct,
        });
    }
    catch (err) {
        res.status(400).json({
            success: false,
            message: 'Error Updating Products',
            error: err,
        });
    }
});
exports.updateSingleProductById = updateSingleProductById;
// Delete A Specific Order From Database With Id
const deleteSingleProduct = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const _id = req.params.productId;
        yield product_service_1.ProductService.deleteProductFromDb(_id);
        res.status(200).json({
            success: true,
            message: 'Product deleted successfully!',
            data: null,
        });
    }
    catch (err) {
        res.status(400).json({
            success: false,
            message: 'Error While Deleting Products',
            error: err,
        });
    }
});
exports.deleteSingleProduct = deleteSingleProduct;
