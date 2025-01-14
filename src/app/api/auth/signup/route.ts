import { NextRequest, NextResponse } from "next/server";
import User from "@/models/User";
import connectDB from "@/utils/connectDB";
import { hashPassword } from "@/utils/auth";
import { IRequestUser } from "src/types/users/TUser";
import { serverErros } from "src/constants/erros/serverErros";
import { userErrors } from "src/constants/erros/userErrors";

export async function POST(req: NextRequest) {
  try {
    try {
      await connectDB();
    } catch (error) {
      throw new Error("cant connect to db");
    }

    const user: IRequestUser = await req.json();
    const { email, password, phoneNumber, name } = user;
    // check user entered email and pass
    if (!email || !password || !phoneNumber || !name) {
      return NextResponse.json({
        error: "Please fill all fields ",
        status: 422,
      });
    }
    // check email | phone  is exist

    const [emailExist, phoneExist] = await Promise.all([
      User.findOne({ email }),
      User.findOne({ phoneNumber }),
    ]);
    if (emailExist || phoneExist) {
      return NextResponse.json({
        error: emailExist ? userErrors.emailExist : userErrors.phoneExist,
        status: 422,
      });
    }
    // hash password and create user
    const hashedPassword = await hashPassword(password);
    await User.create({
      ...user,
      pocket: 0,
      password: hashedPassword,
    });

    return NextResponse.json({
      message: "You're Account Created Successfully ",
      status: 200,
    });
  } catch (error) {
    console.log(error);
    return NextResponse.json({
      error: serverErros.unknown,
      status: 500, // status 500 => server error
    });
  }
}
