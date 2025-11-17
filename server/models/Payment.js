const mongoose = require("mongoose");

const paymentSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  vendor: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Vendor",
    required: true,
  },
  booking: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Booking",
  },
  order: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Order",
  },
  transactionType: {
    type: String,
    enum: ["Booking", "Order"],
    required: true,
  },
  paymentMethod: {
    type: String,
    enum: ["Credit Card", "Debit Card", "PayPal", "Cash"],
    default: "Credit Card",
  },
  paymentProvider: {
    type: String,
    enum: ["Stripe", "PayPal", "Cash"],
    default: "Stripe",
  },
  amount: {
    type: Number,
    required: true,
  },
  currency: {
    type: String,
    default: "USD",
  },
  status: {
    type: String,
    enum: ["Pending", "Success", "Failed", "Refunded", "Cancelled"],
    default: "Pending",
  },
  stripePaymentIntentId: {
    type: String,
  },
  stripeChargeId: {
    type: String,
  },
  refundAmount: {
    type: Number,
    default: 0,
  },
  refundReason: {
    type: String,
  },
  metadata: {
    cardLast4: String,
    cardBrand: String,
    billingEmail: String,
    billingAddress: {
      line1: String,
      line2: String,
      city: String,
      state: String,
      postal_code: String,
      country: String,
    },
  },
  completedAt: {
    type: Date,
  },
  refundedAt: {
    type: Date,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  updatedAt: {
    type: Date,
    default: Date.now,
  },
});

// Update the updatedAt timestamp before saving
paymentSchema.pre("save", function (next) {
  this.updatedAt = Date.now();
  next();
});

// Index for faster queries
paymentSchema.index({ user: 1, createdAt: -1 });
paymentSchema.index({ vendor: 1, status: 1 });
paymentSchema.index({ booking: 1 });
paymentSchema.index({ order: 1 });

const Payment = mongoose.model("Payment", paymentSchema);

module.exports = Payment;

