import mongoose from "mongoose";

/**
 * ============================================
 * ITEM SNAPSHOT
 * ============================================
 * Stores book info at purchase time
 * so later edits/deletes don't affect order
 */
const OrderItemSchema = new mongoose.Schema(
  {
    book: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Book",
    },

    title: String,
    type: String, // ebook | book
    price: Number,
    currency: String,

    quantity: {
      type: Number,
      default: 1,
    },

    ebookFormat: String, // EPUB / PDF / KINDLE (if ebook)
  },
  { _id: false }
);

/**
 * ============================================
 * USER SNAPSHOT
 * ============================================
 */
const UserSnapshotSchema = new mongoose.Schema(
  {
    userId: mongoose.Schema.Types.ObjectId,

    firstName: String,
    lastName: String,
    email: String,
  },
  { _id: false }
);

/**
 * ============================================
 * ADDRESS
 * ============================================
 */
const AddressSchema = new mongoose.Schema(
  {
    name: String,
    phone: String,

    line1: String,
    line2: String,

    city: String,
    state: String,
    postalCode: String,
    country: String,
  },
  { _id: false }
);

/**
 * ============================================
 * ORDER SCHEMA
 * ============================================
 */
const OrderSchema = new mongoose.Schema(
  {
    orderNumber: {
      type: String,
      unique: true,
      index: true,
    },

    user: UserSnapshotSchema,

    items: [OrderItemSchema],

    shippingAddress: AddressSchema,

    /**
     * PAYMENT
     */
    payment: {
      method: {
        type: String,
        enum: ["COD", "ONLINE"],
      },

      status: {
        type: String,
        enum: ["pending", "paid", "failed", "refunded"],
        default: "pending",
      },

      transactionId: String,
    },

    /**
     * ORDER STATUS
     */
    status: {
      type: String,
      enum: ["placed", "processing", "shipped", "delivered", "cancelled"],
      default: "placed",
      index: true,
    },

    /**
     * TOTALS
     */
    subtotal: Number,
    shippingCost: Number,
    total: Number,
  },
  { timestamps: true }
);

/**
 * AUTO ORDER NUMBER
 */
OrderSchema.pre("save", async function () {
  if (!this.orderNumber) {
    this.orderNumber =
      "ORD-" +
      Date.now().toString().slice(-6) +
      Math.floor(Math.random() * 1000);
  }
});

export default mongoose.models.Order || mongoose.model("Order", OrderSchema);
