// pages/api/updateLabTest.js

import { connect } from "@/dbConfig/dbConfig";
import User from "../../../../models/userModel";
import { NextRequest, NextResponse } from "next/server";

connect();

export async function PUT(request: NextRequest) {
  if (request.method !== "PUT") {
    return NextResponse.json(
      { message: "Method Not Allowed" },
      { status: 405 }
    );
  }

  const { id } = await request.json();

  try {
    const user = await User.findById(id);

    if (!user) {
      return NextResponse.json(
        { message: "User not found" },
        { status: 404 }
      );
    }

    user.isSubscribed = true;
    await user.save();

    return NextResponse.json(
      { message: "User updated successfully" },
      { status: 200 }
    );
  } catch (error: any) {
    return NextResponse.json(
      { message: "Something went wrong" },
      { status: 500 }
    );
  }
}
