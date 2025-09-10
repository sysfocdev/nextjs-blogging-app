import { NextResponse } from "next/server";

import { User } from "../../../lib/model/User";
import mongoose from "mongoose";
import { connectionStr } from "../../../lib/db";


// GET all users
export async function GET() {
  try {
   await mongoose.connect(connectionStr)
    const users = await User.find().sort({ createdAt: -1 });
    return NextResponse.json(users);
  } catch (error) {
    return NextResponse.json({ message: "Error fetching users", error }, { status: 500 });
  }
}

// CREATE new user
export async function POST(request) {
  try {
    await mongoose.connect(connectionStr)
    const body = await request.json();

    // Check if email already exists
    const existingUser = await User.findOne({ email: body.email });
    if (existingUser) {
      return NextResponse.json({ message: "Email already registered" }, { status: 400 });
    }

    const newUser = new User(body);
    await newUser.save();

    return NextResponse.json({ success: true, user: newUser }, { status: 201 });
  } catch (error) {
    return NextResponse.json({ message: "Error creating user", error }, { status: 500 });
  }
}
