import connectDB from "@/utils/connectDB";
import { NextRequest, NextResponse } from "next/server";
import Payment from "@/models/Payments";
// Adjust the path to your Payment model

// GET payments by User ID
export async function GET(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  await connectDB();
  const { id } = params;
  try {
    // Validate the User ID format
    if (!id || !id.match(/^[0-9a-fA-F]{24}$/)) {
      return NextResponse.json(
        { error: "Invalid user ID format", status: 400 },
        { status: 400 }
      );
    }

    // Fetch all payments for the given user ID
    const userPayments = await Payment.find({ user: id })
      .populate("user") // Populate user details
      .populate({
        path: "items.product", // Populate product details within items array
        model: "Product",
      });

    if (!userPayments || userPayments.length === 0) {
      return NextResponse.json(
        { error: "No payments found for the given user", status: 404 },
        { status: 404 }
      );
    }

    return NextResponse.json(
      {
        message: "User payments retrieved successfully",
        data: userPayments,
        status: 200,
      },
      { status: 200 }
    );
  } catch (error: any) {
    console.error("Error fetching user payments:", error.message);
    return NextResponse.json(
      { error: "Internal Server Error", details: error.message, status: 500 },
      { status: 500 }
    );
  }
}
