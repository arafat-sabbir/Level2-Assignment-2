import mongoose, { model } from 'mongoose';
import { TInventory, TProduct, TVariant } from './product.interface';
const { Schema } = mongoose;
// VariantSchema For TVariant Interface
const VariantSchema = new Schema<TVariant>({
  type: { type: String, required: true },
  value: { type: String, required: true },
});

// InventorySchema For TInventory Interface
const InventorySchema = new Schema<TInventory>({
  quantity: { type: Number, required: true },
  inStock: { type: Boolean, required: true },
});

// Product Schema For TProduct Interface
const ProductSchema = new Schema<TProduct>({
  name: { type: String, required: true, unique: true },
  description: { type: String, required: true },
  price: { type: Number, required: true },
  category: { type: String, required: true },
  tags: { type: [String], required: true },
  variants: { type: [VariantSchema], required: true },
  inventory: { type: InventorySchema, required: true },
});

ProductSchema.index({ name: 'text', description: 'text', category: 'text' });

const ProductModel = model('Product', ProductSchema);
export default ProductModel;
