import mongoose from "mongoose";
import bcrypt from "bcryptjs";
import Admin from "../models/Admin.js";

const MONGODB_URI = process.env.MONGODB_URI || "mongodb://127.0.0.1:27017/onixdb";

async function seedAdmin() {
  try {
    await mongoose.connect(MONGODB_URI);
    console.log("MongoDB connected");

    const username = "admin";
    const password = "123456";

    const existing = await Admin.findOne({ username });

    if (existing) {
      console.log("Admin already exists");
      process.exit(0);
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    await Admin.create({
      username,
      password: hashedPassword,
      role: "admin",
    });

    console.log("Admin seeded successfully!");
    console.log(`Username: ${username}`);
    console.log(`Password: ${password}`);

    process.exit(0);

  } catch (err) {
    console.error("Error seeding admin:", err);
    process.exit(1);
  }
}

seedAdmin();
