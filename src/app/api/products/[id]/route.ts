import { NextRequest, NextResponse } from "next/server";
import Product from "@/models/Product";
import Category from "@/models/Category";
import connectDB from "@/utils/connectDB";

export async function GET(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    await connectDB();
    const { id } = params;

    // Fetch the product by ID and populate the category
    const product = await Product.findById(id).populate("category");

    if (!product) {
      return NextResponse.json(
        { error: "Product not found", status: 404 },
        { status: 404 }
      );
    }

    return NextResponse.json({ product, status: 200 });
  } catch (error) {
    console.error("Error fetching product:", error);
    return NextResponse.json(
      { error: "An error occurred while fetching the product", status: 500 },
      { status: 500 }
    );
  }
}

export async function PUT(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    await connectDB();

    const { id } = params;
    const body = await req.json();
    const { name, description, count, price, categoryId, image } = body;

    // Fetch the product to update
    const product = await Product.findById(id);
    if (!product) {
      return NextResponse.json(
        { error: "Product not found", status: 404 },
        { status: 404 }
      );
    }

    // Validate category if provided
    if (categoryId) {
      const category = await Category.findById(categoryId);
      if (!category) {
        return NextResponse.json(
          { error: "Invalid categoryId", status: 404 },
          { status: 404 }
        );
      }
    }

    // Update product fields
    product.name = name || product.name;
    product.description = description || product.description;
    product.price = price || product.price;
    product.count = count || product.count;
    product.category = categoryId || product.category;
    product.image = image || product.image;

    // Save updated product
    const updatedProduct = await product.save();

    return NextResponse.json({
      message: "Product updated successfully",
      product: updatedProduct,
      status: 200,
    });
  } catch (error) {
    console.error("Error updating product:", error);
    return NextResponse.json(
      { error: "An error occurred while updating the product", status: 500 },
      { status: 500 }
    );
  }
}

export async function DELETE(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    await connectDB();
    const { id } = params;

    // Find and delete the product
    const product = await Product.findByIdAndDelete(id);

    if (!product) {
      return NextResponse.json(
        { error: "Product not found", status: 404 },
        { status: 404 }
      );
    }

    return NextResponse.json({
      message: "Product deleted successfully",
      status: 200,
    });
  } catch (error) {
    console.error("Error deleting product:", error);
    return NextResponse.json(
      { error: "An error occurred while deleting the product", status: 500 },
      { status: 500 }
    );
  }
}
