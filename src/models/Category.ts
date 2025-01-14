import { Schema, model, models } from "mongoose";

// Define the schema for categories
const categorySchema = new Schema<ICategory>({
  name: {
    type: String,
    required: true,
    unique: true,
  },
});

// Define the TypeScript interface for Category
export interface ICategory {
  name: string;
}

export interface ICategories extends Array<ICategory> {}
const Category =
  models.Category || model<ICategory>("Category", categorySchema);

export default Category;
