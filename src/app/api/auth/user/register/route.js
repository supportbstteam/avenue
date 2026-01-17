import { connectDB } from "@/lib/db";
import User from "@/models/User";
import bcrypt from "bcryptjs";

export async function POST(req) {
  try {
    await connectDB();

    const { firstName, lastName, email, password } = await req.json();

    // Validate fields
    if (!firstName || !lastName || !email || !password) {
      return Response.json(
        { success: false, message: "All fields are required" },
        { status: 400 }
      );
    }

    // Check if email already exists
    const existingUser = await User.findOne({ email });

    if (existingUser) {
      return Response.json(
        { success: false, message: "Email already exists" },
        { status: 400 }
      );
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create user
    await User.create({
      firstName,
      lastName,
      email,
      password: hashedPassword,
      role: "user",
    });

    return Response.json({
      success: true,
      message: "User registered successfully",
    });
  } catch (error) {
    console.error("Registration Error:", error);

    return Response.json(
      { success: false, message: "Server error, please try again" },
      { status: 500 }
    );
  }
}
