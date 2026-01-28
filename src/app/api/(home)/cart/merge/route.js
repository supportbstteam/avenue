import { NextResponse } from "next/server";
import { connectDB } from "@/lib/db";
import { getGuestCart, clearGuestCart } from "@/lib/guestCart";
import Cart from "@/models/Cart";
import { getServerUser } from "@/lib/getServerUser";

export async function POST() {
  await connectDB();

  const user = await getServerUser();
  if (!user) return NextResponse.json({});

  const guestCart = await getGuestCart();
  if (!guestCart.items.length) return NextResponse.json({});

  let cart = await Cart.findOne({ user: user.id });

  if (!cart) cart = new Cart({ user: user.id, items: [] });

  guestCart.items.forEach(({ bookId, quantity }) => {
    const item = cart.items.find(
      i => i.book.toString() === bookId
    );

    item ? (item.quantity += quantity) :
      cart.items.push({ book: bookId, quantity });
  });

  await cart.save();
  await clearGuestCart();

  return NextResponse.json({ success: true });
}
