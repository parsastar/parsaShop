import Category, { ICategories } from "@/models/Category";
import connectDB from "@/utils/connectDB";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  await connectDB();
  try {
    const categories: ICategories = await Category.find();
    return NextResponse.json({
      categories,
      status: 200,
    });
  } catch (error) {
    console.error("Error fetching categories:", error);
    return NextResponse.json(
      { error: "An error occurred while fetching categories", status: 500 },
      { status: 500 }
    );
  }
}

export async function POST(req: NextRequest) {
  await connectDB();
  try {
    // Parse the request body
    const body = await req.json();
    const { name } = body;

    // Validate required fields
    if (!name) {
      return NextResponse.json(
        {
          error: "Missing required fields: name ",
          status: 400,
        },
        { status: 400 }
      );
    }

    // Check if the category exists
    const categoryExists = await Category.findOne({ name: name });
    if (categoryExists) {
      console.log("this already exists ");

      return NextResponse.json(
        { error: "Category already exists", status: 400 },
        { status: 400 }
      );
    }

    // Create the product
    const newCategory = await Category.create({
      name,
    });

    // Return the created product
    return NextResponse.json({
      message: "Category created successfully",
      category: newCategory,
      status: 201,
    });
  } catch (error) {
    console.error("Error creating category:", error);
    return NextResponse.json(
      { error: "An error occurred while creating the category", status: 500 },
      { status: 500 }
    );
  }
}
