import { NextResponse } from "next/server";
import { connectDB } from "@/lib/db";
import AdminModel from "@/models/Admin";  // <-- renamed
import { getServerAdmin } from "@/lib/getServerUser";
import bcrypt from "bcryptjs";

export async function GET(request) {
    const admin = await getServerAdmin();

    if (!admin) {
        return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    try {
        await connectDB();

        const user = await AdminModel.findOne({ username: admin.email });

        return NextResponse.json(user);
    } catch (error) {
        return NextResponse.json({ error: "Server error" }, { status: 500 });
    }
}

export async function PUT(request) {
    const admin = await getServerAdmin();
    const formValues = await request.json();

    if (!admin) {
        return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    try {
        await connectDB();

        // Fetch the current admin record
        const existingAdmin = await AdminModel.findOne({ _id: formValues.id });

        if (!existingAdmin) {
            return NextResponse.json({ error: "Admin not found" }, { status: 404 });
        }

        // Prepare update fields
        const updateData = {
            name: formValues.name,
            username: formValues.email,
        };

        // Only update password if provided
        if (formValues.password && formValues.password.trim() !== "") {
            updateData.password = await bcrypt.hash(formValues.password, 10);
        } else {
            updateData.password = existingAdmin.password;
        }

        const updatedUser = await AdminModel.findOneAndUpdate(
            { _id: formValues.id },
            updateData,
            { new: true }
        );

        return NextResponse.json(updatedUser);
    } catch (error) {
        console.error(error);
        return NextResponse.json({ error: "Server error" }, { status: 500 });
    }
}

