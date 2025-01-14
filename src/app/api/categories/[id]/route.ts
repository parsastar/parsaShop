import { NextRequest, NextResponse } from "next/server";
import Category from "@/models/Category";
import connectDB from "@/utils/connectDB";

export async function GET(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  await connectDB();
  try {
    const { id } = params;

    // Fetch the category by ID
    const category = await Category.findById(id);

    if (!category) {
      return NextResponse.json(
        { error: "Category not found", status: 404 },
        { status: 404 }
      );
    }

    return NextResponse.json({ category, status: 200 });
  } catch (error) {
    console.error("Error fetching category:", error);
    return NextResponse.json(
      { error: "An error occurred while fetching the category", status: 500 },
      { status: 500 }
    );
  }
}

export async function PUT(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  await connectDB();
  try {
    const { id } = params;
    const body = await req.json();
    const { name } = body;
    console.log(name, id, body);
    // Fetch the category to update
    const category = await Category.findById(id);
    if (!category) {
      return NextResponse.json(
        { error: "Category not found", status: 404 },
        { status: 404 }
      );
    }

    // Update category fields
    category.name = name || category.name;

    // Save updated category
    const updatedCategory = await category.save();

    return NextResponse.json({
      message: "Category updated successfully",
      category: updatedCategory,
      status: 200,
    });
  } catch (error) {
    console.error("Error updating category:", error);
    return NextResponse.json(
      { error: "An error occurred while updating the category", status: 500 },
      { status: 500 }
    );
  }
}

export async function DELETE(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  await connectDB();
  try {
    const { id } = params;
    // Find and delete the category
    const category = await Category.findByIdAndDelete(id);

    if (!category) {
      return NextResponse.json(
        { error: "Category not found", status: 404 },
        { status: 404 }
      );
    }

    return NextResponse.json({
      message: "Category deleted successfully",
      status: 200,
    });
  } catch (error) {
    console.error("Error deleting category:", error);
    return NextResponse.json(
      { error: "An error occurred while deleting the category", status: 500 },
      { status: 500 }
    );
  }
}
