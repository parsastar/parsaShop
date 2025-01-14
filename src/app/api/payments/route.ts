import { NextRequest, NextResponse } from "next/server";
import connectDB from "@/utils/connectDB";
import Payment from "@/models/Payments";
import Product from "@/models/Product";
import User from "@/models/User";

// GET all payments with pagination
export async function GET(req: NextRequest) {
  await connectDB();

  try {
    // Extract query parameters
    const { searchParams } = new URL(req.url);
    const page = parseInt(searchParams.get("page") || "1", 10); // Current page
    const pageSize = parseInt(searchParams.get("pageSize") || "20", 10); // Items per page

    if (page < 1 || pageSize < 1) {
      return NextResponse.json(
        { error: "Invalid pagination parameters", status: 400 },
        { status: 400 }
      );
    }

    const skip = (page - 1) * pageSize; // Calculate the number of items to skip

    // Fetch paginated payments and total count
    const [payments, totalCount] = await Promise.all([
      Payment.find({})
        .populate("user") // Populate user details
        .populate({
          path: "items.product", // Populate product details within items array
          model: "Product",
        })
        .skip(skip)
        .limit(pageSize)
        .lean(), // Converts Mongoose documents to plain objects
      Payment.countDocuments(), // Total count of documents
    ]);

    const totalPages = Math.ceil(totalCount / pageSize); // Calculate total pages

    return NextResponse.json(
      {
        message: "Payments retrieved successfully",

        payments,
        pagination: {
          currentPage: page,
          pageSize,
          totalPages,
          totalCount,
        },

        status: 200,
      },
      { status: 200 }
    );
  } catch (error: any) {
    console.error("Error fetching payments:", error.message);
    return NextResponse.json(
      { error: "Internal Server Error", details: error.message, status: 500 },
      { status: 500 }
    );
  }
}

export async function POST(req: NextRequest) {
  await connectDB();

  try {
    const body = await req.json();
    const { amount, userId, items, address, description } = body;
    console.log();
    // Validate required fields
    if (
      !address ||
      !amount ||
      !userId ||
      !items ||
      !Array.isArray(items) ||
      items.length === 0
    ) {
      return NextResponse.json(
        {
          error: "Missing required fields: amount, address ,  userId, or items",
          status: 400,
        },
        { status: 400 }
      );
    }

    // Check product availability
    for (const item of items) {
      const product = await Product.findById(item.product);
      if (!product) {
        return NextResponse.json(
          { error: `Product with ID ${item.product} not found`, status: 404 },
          { status: 404 }
        );
      }
      if (product.count < item.count) {
        return NextResponse.json(
          {
            error: `Insufficient stock for product ID ${item.product}`,
            status: 400,
          },
          { status: 400 }
        );
      }
    }

    // Check if the user has enough money in the pocket
    const user = await User.findById(userId);
    if (!user) {
      return NextResponse.json(
        { error: "User not found", status: 404 },
        { status: 404 }
      );
    }

    if (user.pocket < amount) {
      return NextResponse.json(
        { error: "Insufficient funds in user pocket", status: 400 },
        { status: 400 }
      );
    }

    // Create the payment
    const newPayment = new Payment({
      amount,
      description: description || "no description",
      address,
      user: userId,
      items,
    });

    const savedPayment = await newPayment.save();

    // Decrease product count
    for (const item of items) {
      await Product.findByIdAndUpdate(item.product, {
        $inc: { count: -item.count },
      });
    }

    // Update the user's pocket
    user.pocket -= amount;
    await user.save();

    return NextResponse.json(
      {
        message: "Payment created successfully",
        data: savedPayment,
        status: 201,
      },
      { status: 201 }
    );
  } catch (error) {
    console.error("Error creating payment:", error);
    return NextResponse.json(
      { error: "Server error", status: 500 },
      { status: 500 }
    );
  }
}
