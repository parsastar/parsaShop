import { NextRequest, NextResponse } from "next/server";
import Product from "@/models/Product";
import Category from "@/models/Category";
import connectDB from "@/utils/connectDB";

export async function GET(req: NextRequest) {
  try {
    await connectDB();
    // Parse query parameters
    const { searchParams } = new URL(req.url);
    const page = parseInt(searchParams.get("page") || "1"); // Default to page 1
    const pageSize = parseInt(searchParams.get("pageSize") || "10"); // Default to 10 items per page
    const search = searchParams.get("search")?.trim() || ""; // Product search term
    const categorySearch = searchParams.get("category")?.trim() || ""; // Category search term
    // Ensure valid pagination values
    if (page < 1 || pageSize < 1) {
      return NextResponse.json(
        { error: "Page and pageSize must be positive integers", status: 400 },
        { status: 400 }
      );
    }
    // Build query for product search
    const query: any = {};

    // If there's a product search term, add it to the query
    if (search) {
      query.name = { $regex: search, $options: "i" }; // Case-insensitive search
    }
    console.log("search : ", query.name, search, pageSize);
    // If there's a category search term, add it to the query
    if (categorySearch) {
      const category = await Category.findOne({
        name: { $regex: categorySearch, $options: "i" },
      });
      if (category) {
        query.category = category._id;
      } else {
        query.category = null; // If no matching category, return no products
      }
    }

    // Calculate the skip value for pagination
    const skip = (page - 1) * pageSize;

    // Fetch products with pagination and filtering
    const products = await Product.find(query)
      .skip(skip)
      .limit(pageSize)
      .populate("category")
      .sort({ createdAt: -1 });

    // Count the total number of products matching the query
    const totalProducts = await Product.countDocuments(query);

    // Calculate total pages
    const totalPages = Math.ceil(totalProducts / pageSize);

    // Return paginated and filtered results
    return NextResponse.json({
      products,
      pagination: {
        currentPage: page,
        pageSize,
        totalPages,
        totalProducts,
      },
      status: 200,
    });
  } catch (error) {
    console.error("Error fetching products:", error);
    return NextResponse.json(
      { error: "An error occurred while fetching products", status: 500 },
      { status: 500 }
    );
  }
}

export async function POST(req: NextRequest) {
  try {
    await connectDB();
    // Parse the request body
    const body = await req.json();
    const { name, description, price, categoryId, image, count } = body;
    // Validate required fields
    if (!name || !price || !categoryId || count === undefined) {
      return NextResponse.json(
        {
          error:
            "Missing required fields: name, price, categoryId, image, or count",
          status: 400,
        },
        { status: 400 }
      );
    }

    // Check if the category exists
    const category = await Category.findById(categoryId);
    if (!category) {
      return NextResponse.json(
        { error: "Invalid categoryId: Category does not exist", status: 404 },
        { status: 404 }
      );
    }

    // Create the product
    const newProduct = await Product.create({
      name,
      description,
      price,
      category: categoryId,
      image,
      count,
      // createdAt: Date.now(),
    });
    // Return the created product
    return NextResponse.json({
      message: "Product created successfully",
      product: newProduct,
      status: 201,
    });
  } catch (error) {
    console.error("Error creating product:", error);
    return NextResponse.json(
      { error: "An error occurred while creating the product", status: 500 },
      { status: 500 }
    );
  }
}
