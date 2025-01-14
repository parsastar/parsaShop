import { NextRequest, NextResponse } from "next/server";
import connectDB from "@/utils/connectDB";
import User from "@/models/User";
import { Types } from "mongoose";

export async function GET(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  await connectDB();
  const { id } = params;
  console.log("here id : ", id);
  // Validate the ID format
  if (!Types.ObjectId.isValid(id)) {
    return NextResponse.json(
      { error: "Invalid user ID", status: 400 },
      { status: 400 }
    );
  }

  try {
    // Fetch the user by ID
    const user = await User.findById(id);
    if (!user) {
      return NextResponse.json(
        { error: "User not found", status: 404 },
        { status: 404 }
      );
    }

    return NextResponse.json(
      {
        message: "User retrieved successfully",
        user,
        status: 200,
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error fetching user or payments:", error);
    return NextResponse.json(
      { error: "Server error", status: 500 },
      { status: 500 }
    );
  }
}

// DELETE user by ID
export async function DELETE(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  await connectDB();
  const { id } = params;
  // Validate the ID format
  if (!Types.ObjectId.isValid(id)) {
    return NextResponse.json(
      { error: "Invalid user ID", status: 400 },
      { status: 400 }
    );
  }

  try {
    const deletedUser = await User.findByIdAndDelete(id);

    if (!deletedUser) {
      return NextResponse.json(
        { error: "User not found", status: 404 },
        { status: 404 }
      );
    }

    return NextResponse.json(
      { message: "User deleted successfully", status: 200 },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error deleting user:", error);
    return NextResponse.json(
      { error: "Server error", status: 500 },
      { status: 500 }
    );
  }
}

// PUT to update user by ID
export async function PUT(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  await connectDB();

  const { id } = params;
  const updates = await req.json();

  // Validate the ID format
  if (!Types.ObjectId.isValid(id)) {
    return NextResponse.json(
      { error: "Invalid user ID", status: 400 },
      { status: 400 }
    );
  }

  try {
    const updatedUser = await User.findByIdAndUpdate(id, updates, {
      new: true,
      runValidators: true,
    });

    if (!updatedUser) {
      return NextResponse.json(
        { error: "User not found", status: 404 },
        { status: 404 }
      );
    }

    return NextResponse.json(
      { message: "User updated successfully", data: updatedUser, status: 200 },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error updating user:", error);
    return NextResponse.json(
      { error: "Server error", status: 500 },
      { status: 500 }
    );
  }
}

export async function PATCH(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  await connectDB();
  const { id } = params;
  console.log("here in patch ", id);

  const { value } = await req.json(); // Parse the request body to get the value

  // Validate the ID format
  if (!Types.ObjectId.isValid(id)) {
    return NextResponse.json(
      { error: "Invalid user ID", status: 400 },
      { status: 400 }
    );
  }

  // Validate the value
  if (typeof value !== "number") {
    return NextResponse.json(
      { error: "Value must be a number", status: 400 },
      { status: 400 }
    );
  }
  const user = await User.findById(id);
  console.log(user);
  try {
    // Update the user's pocket (money)
    const updatedUser = await User.findByIdAndUpdate(
      id,
      { $inc: { pocket: value } }, // Increment or decrement the pocket field
      { new: true, runValidators: true } // Return the updated document and run validation
    );

    if (!updatedUser) {
      return NextResponse.json(
        { error: "User not found", status: 404 },
        { status: 404 }
      );
    }

    return NextResponse.json(
      {
        message: "User pocket updated successfully",
        data: updatedUser,
        status: 200,
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error updating user pocket:", error);
    return NextResponse.json(
      { error: "Server error", status: 500 },
      { status: 500 }
    );
  }
}
