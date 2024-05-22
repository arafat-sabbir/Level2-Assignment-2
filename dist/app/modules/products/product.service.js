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
exports.ProductService = void 0;
const product_model_1 = __importDefault(require("./product.model"));
const addProductToDb = (product) => __awaiter(void 0, void 0, void 0, function* () {
    const newProduct = product_model_1.default.create(product);
    return newProduct;
});
const getAllProductFromDb = () => __awaiter(void 0, void 0, void 0, function* () {
    const AllProduct = yield product_model_1.default.find();
    if (!AllProduct.length) {
        throw new Error('No Product Found');
    }
    return AllProduct;
});
const getSingleProductFromDb = (_id) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const SingleProduct = yield product_model_1.default.findById({ _id });
        if (!SingleProduct) {
            throw new Error('No Product Found');
        }
        return SingleProduct;
    }
    catch (error) {
        if (error instanceof Error && error.name === 'CastError') {
            throw new Error('No Product Found');
        }
        else {
            throw new Error('Error updating product');
        }
    }
});
const updateSingleProductFromDb = (_id, data) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const updatedProduct = yield product_model_1.default.findByIdAndUpdate(_id, data, {
            new: true,
        });
        return updatedProduct;
    }
    catch (error) {
        if (error instanceof Error && error.name === 'CastError') {
            throw new Error('No Product Found');
        }
        else {
            throw new Error('Error updating product');
        }
    }
});
const deleteProductFromDb = (_id) => __awaiter(void 0, void 0, void 0, function* () {
    const deletedProduct = yield product_model_1.default.findByIdAndDelete({ _id });
    return deletedProduct;
});
const getSearchProductsFromDb = (searchTerm) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield product_model_1.default.find({
        $text: { $search: searchTerm },
    });
    if (!result.length) {
        throw new Error(`No Product Found For searchTerm ${searchTerm}`);
    }
    return result;
});
exports.ProductService = {
    addProductToDb,
    getAllProductFromDb,
    getSingleProductFromDb,
    updateSingleProductFromDb,
    deleteProductFromDb,
    getSearchProductsFromDb,
};
