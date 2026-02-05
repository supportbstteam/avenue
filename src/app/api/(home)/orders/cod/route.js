import { connectDB } from "@/lib/db";
import Order from "@/models/Order";
import Book from "@/models/Book";
import User from "@/models/User";
import Cart from "@/models/Cart";
import { clearGuestCart } from "@/lib/guestCart";
import { NextResponse } from "next/server";
import { getServerUser } from "@/lib/getServerUser";

export async function POST(req) {
  try {
    await connectDB();

    const { userId, cart, shippingAddress } = await req.json();

    const sessionUser = await getServerUser();

    /**
     * =====================================
     * USER SNAPSHOT
     * =====================================
     */
    const user = await User.findById(userId);

    if (!user)
      return NextResponse.json({ error: "User not found" }, { status: 404 });

    const userSnapshot = {
      userId: user._id,
      firstName: user.firstName,
      lastName: user.lastName,
      email: user.email,
    };

    /**
     * =====================================
     * ITEMS SNAPSHOT
     * =====================================
     */
    let subtotal = 0;

    const items = await Promise.all(
      cart.map(async (c) => {
        const book = await Book.findById(c.bookId);

        if (!book) return null;

        const price = book.productSupply?.prices?.[0]?.amount || 0;

        subtotal += price * c.quantity;

        return {
          book: book._id,
          title: book.descriptiveDetail?.titles?.[0]?.text,
          type: book.type,
          price,
          currency: book.productSupply?.prices?.[0]?.currency,
          quantity: c.quantity,
          ebookFormat: c.ebookFormat,
        };
      })
    );

    const filteredItems = items.filter(Boolean);

    const shippingCost = subtotal > 500 ? 0 : 50;
    const total = subtotal + shippingCost;

    /**
     * =====================================
     * CREATE ORDER
     * =====================================
     */
    const order = await Order.create({
      user: userSnapshot,
      items: filteredItems,
      shippingAddress,

      payment: {
        method: "COD",
        status: "pending",
      },

      subtotal,
      shippingCost,
      total,
    });

    /**
     * =====================================
     * CLEAR CART (CRITICAL)
     * =====================================
     */

    // Logged-in user cart
    if (sessionUser) {
      await Cart.findOneAndUpdate(
        { user: sessionUser.id },
        { $set: { items: [] } }
      );
    }

    // Guest cart
    else {
      await clearGuestCart();
    }

    return NextResponse.json({
      success: true,
      order,
    });
  } catch (err) {
    console.error(err);
    return NextResponse.json({ success: false }, { status: 500 });
  }
}
