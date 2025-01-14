import { NextRequest, NextResponse } from "next/server";
import connectDB from "@/utils/connectDB";
import Payment from "@/models/Payments";
import Product from "@/models/Product";
import { getServerSession } from "next-auth";
import { authOptions } from "../../auth/[...nextauth]/options";
import User from "@/models/User";

// GET payment by ID
export async function GET(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  await connectDB();
  const { id } = params;
  const session = await getServerSession(authOptions);
  try {
    // Validate the ID format
    if (!id || !id.match(/^[0-9a-fA-F]{24}$/)) {
      return NextResponse.json(
        { error: "Invalid payment ID format", status: 400 },
        { status: 400 }
      );
    }
    const CheckPayment = await Payment.findById(id);
    if (
      CheckPayment.user == session?.user.id ||
      session?.user.role == "ADMIN"
    ) {
      // Fetch payment by ID and populate user and items.product
      const payment = await Payment.findById(id)
        .populate("user") // Populate user details
        .populate({
          path: "items.product", // Populate product details within items array
          model: "Product",
        });

      if (!payment) {
        return NextResponse.json(
          { error: "Payment not found", status: 404 },
          { status: 404 }
        );
      }

      return NextResponse.json(
        {
          message: "Payment retrieved successfully",
          data: payment,
          status: 200,
        },
        { status: 200 }
      );
    } else {
      return NextResponse.json(
        { error: "you dont have permission to this Payment", status: 403 },
        { status: 403 }
      );
    }
  } catch (error: any) {
    console.error("Error fetching payment:", error.message);
    return NextResponse.json(
      { error: "Internal Server Error", details: error.message, status: 500 },
      { status: 500 }
    );
  }
}

// DELETE payment by ID
export async function DELETE(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  await connectDB();
  const { id } = params;

  try {
    const payment = await Payment.findByIdAndDelete(id);
    if (!payment) {
      return NextResponse.json(
        { error: "Payment not found", status: 404 },
        { status: 404 }
      );
    }

    // Restore product count
    for (const item of payment.items) {
      await Product.findByIdAndUpdate(item.product, {
        $inc: { count: item.count },
      });
    }

    return NextResponse.json(
      {
        message: "Payment deleted successfully",
        status: 200,
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error deleting payment:", error);
    return NextResponse.json(
      { error: "Server error", status: 500 },
      { status: 500 }
    );
  }
}

// PUT to update payment by ID
export async function PUT(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  await connectDB();
  const { id } = params;

  try {
    const body = await req.json();
    const { amount, userId, items } = body;

    // Validate required fields
    if (
      !amount ||
      !userId ||
      !items ||
      !Array.isArray(items) ||
      items.length === 0
    ) {
      return NextResponse.json(
        {
          error: "Missing required fields: amount, userId, or items",
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

    // Find the existing payment
    const payment = await Payment.findById(id);
    if (!payment) {
      return NextResponse.json(
        { error: "Payment not found", status: 404 },
        { status: 404 }
      );
    }

    // Restore product count for old items
    for (const item of payment.items) {
      await Product.findByIdAndUpdate(item.product, {
        $inc: { count: item.count },
      });
    }

    // Update payment fields
    payment.amount = amount;
    payment.user = userId;
    payment.items = items;

    const updatedPayment = await payment.save();

    // Decrease product count for new items
    for (const item of items) {
      await Product.findByIdAndUpdate(item.product, {
        $inc: { count: -item.count },
      });
    }

    return NextResponse.json(
      {
        message: "Payment updated successfully",
        data: updatedPayment,
        status: 200,
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error updating payment:", error);
    return NextResponse.json(
      { error: "Server error", status: 500 },
      { status: 500 }
    );
  }
}
