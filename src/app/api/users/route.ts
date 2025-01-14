import { NextRequest, NextResponse } from "next/server";
import connectDB from "@/utils/connectDB";
import User from "@/models/User";

// GET all users with optional pagination and search
export async function GET(req: NextRequest) {
  await connectDB();
  const { searchParams } = new URL(req.url);
  const page = parseInt(searchParams.get("page") || "1", 10);
  const pageSize = parseInt(searchParams.get("pageSize") || "20", 10);
  const search = searchParams.get("search") || "";
  const query = search ? { name: { $regex: search, $options: "i" } } : {};
  // Count the total number of products matching the query
  const totalUsers = await User.countDocuments(query);

  // Calculate total pages
  const totalPages = Math.ceil(totalUsers / pageSize);
  try {
    const users = await User.find(query)
      .skip((page - 1) * pageSize)
      .limit(pageSize);

    return NextResponse.json(
      {
        message: "Users retrieved successfully",
        users,
        pagination: {
          currentPage: page,
          pageSize,
          totalPages,
          totalUsers,
        },
        status: 200,
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error fetching users:", error);
    return NextResponse.json(
      { error: "Server error", status: 500 },
      { status: 500 }
    );
  }
}
