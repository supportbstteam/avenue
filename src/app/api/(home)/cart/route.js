import { NextResponse } from "next/server";
import { connectDB } from "@/lib/db";
import { getGuestCart, setGuestCart, clearGuestCart } from "@/lib/guestCart";
import Cart from "@/models/Cart";
import Book from "@/models/Book";
import { getServerUser } from "@/lib/getServerUser";

/**
 * GET /api/cart
 * Fetch logged-in user's cart
 */
export async function GET() {
    await connectDB();

    const user = await getServerUser();

    // 🔹 LOGGED IN USER
    if (user) {
        const cart = await Cart.findOne({ user: user.id })
            .populate("items.book");

        return NextResponse.json(cart || { items: [] });
    }

    // 🔹 GUEST
    const guestCart = await getGuestCart();

    const populatedItems = await Promise.all(
        guestCart.items.map(async (item) => {
            const book = await Book.findById(item.bookId);
            return { book, quantity: item.quantity };
        })
    );

    return NextResponse.json({ items: populatedItems });
}


/**
 * POST /api/cart
 * Add item to cart
 */
export async function POST(request) {
    await connectDB();

    const { bookId, quantity = 1 } = await request.json();
    const user = await getServerUser();

    // 🔹 LOGGED IN
    if (user) {
        let cart = await Cart.findOne({ user: user.id });

        if (!cart) {
            cart = new Cart({
                user: user.id,
                items: [{ book: bookId, quantity }],
            });
        } else {
            const item = cart.items.find(
                (i) => i.book.toString() === bookId
            );

            item ? (item.quantity += quantity) :
                cart.items.push({ book: bookId, quantity });
        }

        await cart.save();
        await cart.populate("items.book");
        return NextResponse.json(cart);
    }

    // 🔹 GUEST
    const guestCart = await getGuestCart();
    const item = guestCart.items.find(i => i.bookId === bookId);

    item ? (item.quantity += quantity) :
        guestCart.items.push({ bookId, quantity });

    await setGuestCart(guestCart);

    return NextResponse.json(guestCart);
}


/**
 * PUT /api/cart
 * Update item quantity
 */
export async function PUT(request) {
    await connectDB();

    const { bookId, quantity } = await request.json();
    const user = await getServerUser();

    if (user) {
        const cart = await Cart.findOne({ user: user.id });
        if (!cart) return NextResponse.json({ items: [] });

        const item = cart.items.find(
            i => i.book.toString() === bookId
        );

        if (!item) return NextResponse.json(cart);

        quantity <= 0
            ? cart.items = cart.items.filter(i => i.book.toString() !== bookId)
            : item.quantity = quantity;

        await cart.save();
        await cart.populate("items.book");
        return NextResponse.json(cart);
    }

    // 🔹 GUEST
    const guestCart = await getGuestCart();
    guestCart.items = guestCart.items
        .map(i => i.bookId === bookId ? { ...i, quantity } : i)
        .filter(i => i.quantity > 0);

    await setGuestCart(guestCart);
    return NextResponse.json(guestCart);
}


/**
 * DELETE /api/cart
 * Remove item from cart
 */
export async function DELETE(request) {
    await connectDB();

    const { bookId } = await request.json();
    const user = await getServerUser();

    if (user) {
        const cart = await Cart.findOne({ user: user.id });
        if (!cart) return NextResponse.json({ items: [] });

        cart.items = cart.items.filter(
            i => i.book.toString() !== bookId
        );

        await cart.save();
        await cart.populate("items.book");
        return NextResponse.json(cart);
    }

    // 🔹 GUEST
    const guestCart = await getGuestCart();
    guestCart.items = guestCart.items.filter(
        i => i.bookId !== bookId
    );

    await setGuestCart(guestCart);
    return NextResponse.json(guestCart);
}

