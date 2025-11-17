import Payment from "../models/Payment.js";
import Booking from "../models/Booking.js";
import Order from "../models/Order.js";
// import Stripe from "stripe";

// const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

// @desc    Create payment intent
// @route   POST /api/payments/create-intent
// @access  Private (User)
const createPaymentIntent = async (req, res) => {
  try {
    const { bookingId, orderId, paymentMethod } = req.body;

    if (!bookingId && !orderId) {
      return res.status(400).json({
        message: "Please provide either bookingId or orderId",
      });
    }

    let transaction;
    let transactionType;
    let vendor;

    // Get booking or order details
    if (bookingId) {
      transaction = await Booking.findById(bookingId).populate("vendor");
      transactionType = "Booking";
    } else {
      transaction = await Order.findById(orderId).populate("vendor");
      transactionType = "Order";
    }

    if (!transaction) {
      return res.status(404).json({
        message: `${transactionType} not found`,
      });
    }

    // Verify user owns this transaction
    if (transaction.user.toString() !== req.user._id.toString()) {
      return res.status(403).json({
        message: "Not authorized",
      });
    }

    // Check if already paid
    if (transaction.paymentStatus === "Paid") {
      return res.status(400).json({
        message: "Payment already completed",
      });
    }

    vendor = transaction.vendor;
    const amount = Math.round(transaction.totalAmount * 100); // Convert to cents

    // Create payment record
    const payment = await Payment.create({
      user: req.user._id,
      vendor: vendor._id,
      booking: bookingId || undefined,
      order: orderId || undefined,
      transactionType,
      paymentMethod: paymentMethod || "Credit Card",
      paymentProvider: "Stripe",
      amount: transaction.totalAmount,
      currency: "USD",
      status: "Pending",
    });

    // In production: Create Stripe Payment Intent
    /*
    const paymentIntent = await stripe.paymentIntents.create({
      amount,
      currency: "usd",
      metadata: {
        paymentId: payment._id.toString(),
        userId: req.user._id.toString(),
        vendorId: vendor._id.toString(),
        type: transactionType,
      },
    });

    payment.stripePaymentIntentId = paymentIntent.id;
    await payment.save();
    */

    // Mock response for development
    const mockClientSecret = `pi_mock_${payment._id}_secret_mock`;

    res.json({
      success: true,
      clientSecret: mockClientSecret,
      paymentId: payment._id,
      amount: transaction.totalAmount,
      message: "Payment intent created successfully",
    });
  } catch (error) {
    console.error("Create payment intent error:", error);
    res.status(500).json({ message: error.message });
  }
};

// @desc    Process payment (confirm payment)
// @route   POST /api/payments/:id/confirm
// @access  Private (User)
const confirmPayment = async (req, res) => {
  try {
    const { paymentIntentId, cardDetails } = req.body;

    const payment = await Payment.findById(req.params.id)
      .populate("booking")
      .populate("order");

    if (!payment) {
      return res.status(404).json({ message: "Payment not found" });
    }

    // Verify user owns this payment
    if (payment.user.toString() !== req.user._id.toString()) {
      return res.status(403).json({
        message: "Not authorized",
      });
    }

    if (payment.status === "Success") {
      return res.status(400).json({
        message: "Payment already completed",
      });
    }

    // In production: Confirm with Stripe
    /*
    const paymentIntent = await stripe.paymentIntents.confirm(paymentIntentId, {
      payment_method: req.body.paymentMethodId,
    });

    if (paymentIntent.status === "succeeded") {
      payment.status = "Success";
      payment.stripeChargeId = paymentIntent.charges.data[0].id;
      payment.completedAt = Date.now();
      
      // Store card metadata
      payment.metadata = {
        cardLast4: req.body.cardLast4,
        cardBrand: req.body.cardBrand,
        billingEmail: req.user.email,
      };

      await payment.save();

      // Update booking/order
      if (payment.booking) {
        payment.booking.status = "Confirmed";
        payment.booking.paymentStatus = "Paid";
        await payment.booking.save();
      } else if (payment.order) {
        payment.order.status = "Confirmed";
        payment.order.paymentStatus = "Paid";
        await payment.order.save();
      }
    }
    */

    // Mock successful payment for development
    payment.status = "Success";
    payment.completedAt = Date.now();
    payment.metadata = {
      cardLast4: cardDetails?.last4 || "4242",
      cardBrand: cardDetails?.brand || "visa",
      billingEmail: req.user.email,
    };
    await payment.save();

    // Update booking/order status
    if (payment.booking) {
      payment.booking.status = "Confirmed";
      payment.booking.paymentStatus = "Paid";
      await payment.booking.save();
    } else if (payment.order) {
      payment.order.status = "Confirmed";
      payment.order.paymentStatus = "Paid";
      payment.order.statusHistory.push({
        status: "Confirmed",
        timestamp: Date.now(),
        updatedBy: "System",
      });
      await payment.order.save();
    }

    res.json({
      success: true,
      message: "Payment successful",
      payment,
      receipt: {
        transactionId: payment._id,
        amount: payment.amount,
        date: payment.completedAt,
        paymentMethod: `${payment.metadata.cardBrand} ending in ${payment.metadata.cardLast4}`,
      },
    });
  } catch (error) {
    console.error("Confirm payment error:", error);
    res.status(500).json({ message: error.message });
  }
};

// @desc    Get payment by ID
// @route   GET /api/payments/:id
// @access  Private (User/Vendor)
const getPaymentById = async (req, res) => {
  try {
    const payment = await Payment.findById(req.params.id)
      .populate("user", "name email")
      .populate("vendor", "businessName")
      .populate("booking")
      .populate("order");

    if (!payment) {
      return res.status(404).json({ message: "Payment not found" });
    }

    // Check authorization
    const isUser = payment.user._id.toString() === req.user._id.toString();
    const isVendor = payment.vendor._id.toString() === req.user._id.toString();

    if (!isUser && !isVendor && req.user.role !== "admin") {
      return res.status(403).json({
        message: "Not authorized to view this payment",
      });
    }

    res.json({
      success: true,
      payment,
    });
  } catch (error) {
    console.error("Get payment by ID error:", error);
    res.status(500).json({ message: error.message });
  }
};

// @desc    Get user's payment history
// @route   GET /api/payments/my-payments
// @access  Private (User)
const getUserPayments = async (req, res) => {
  try {
    const payments = await Payment.find({ user: req.user._id })
      .populate("vendor", "businessName")
      .sort({ createdAt: -1 });

    res.json({
      success: true,
      count: payments.length,
      payments,
    });
  } catch (error) {
    console.error("Get user payments error:", error);
    res.status(500).json({ message: error.message });
  }
};

// @desc    Get vendor's payment history
// @route   GET /api/vendor/payments
// @access  Private (Vendor)
const getVendorPayments = async (req, res) => {
  try {
    const { status } = req.query;
    let query = { vendor: req.user._id };

    if (status) {
      query.status = status;
    }

    const payments = await Payment.find(query)
      .populate("user", "name email")
      .sort({ createdAt: -1 });

    // Calculate totals
    const totalEarnings = payments
      .filter((p) => p.status === "Success")
      .reduce((sum, p) => sum + p.amount, 0);

    res.json({
      success: true,
      count: payments.length,
      totalEarnings,
      payments,
    });
  } catch (error) {
    console.error("Get vendor payments error:", error);
    res.status(500).json({ message: error.message });
  }
};

// @desc    Process refund
// @route   POST /api/payments/:id/refund
// @access  Private (Admin/Vendor)
const processRefund = async (req, res) => {
  try {
    const { refundAmount, refundReason } = req.body;

    const payment = await Payment.findById(req.params.id);

    if (!payment) {
      return res.status(404).json({ message: "Payment not found" });
    }

    // Check authorization
    const isVendor = payment.vendor.toString() === req.user._id.toString();
    if (!isVendor && req.user.role !== "admin") {
      return res.status(403).json({
        message: "Not authorized to process refund",
      });
    }

    if (payment.status !== "Success") {
      return res.status(400).json({
        message: "Cannot refund a payment that is not successful",
      });
    }

    // In production: Process refund with Stripe
    /*
    const refund = await stripe.refunds.create({
      charge: payment.stripeChargeId,
      amount: Math.round(refundAmount * 100),
      reason: "requested_by_customer",
    });
    */

    // Mock refund for development
    const amountToRefund = refundAmount || payment.amount;
    payment.refundAmount = amountToRefund;
    payment.refundReason = refundReason;
    payment.refundedAt = Date.now();
    payment.status =
      amountToRefund === payment.amount ? "Refunded" : "Partially Refunded";

    await payment.save();

    res.json({
      success: true,
      message: "Refund processed successfully",
      payment,
    });
  } catch (error) {
    console.error("Process refund error:", error);
    res.status(500).json({ message: error.message });
  }
};

// @desc    Handle Stripe webhook (for production)
// @route   POST /api/payments/webhook
// @access  Public
const handleStripeWebhook = async (req, res) => {
  try {
    // In production: Verify webhook signature
    /*
    const sig = req.headers["stripe-signature"];
    const event = stripe.webhooks.constructEvent(
      req.body,
      sig,
      process.env.STRIPE_WEBHOOK_SECRET
    );

    switch (event.type) {
      case "payment_intent.succeeded":
        // Handle successful payment
        break;
      case "payment_intent.payment_failed":
        // Handle failed payment
        break;
      default:
        console.log(`Unhandled event type ${event.type}`);
    }
    */

    res.json({ received: true });
  } catch (error) {
    console.error("Webhook error:", error);
    res.status(400).json({ message: error.message });
  }
};

export {
  createPaymentIntent,
  confirmPayment,
  getPaymentById,
  getUserPayments,
  getVendorPayments,
  processRefund,
  handleStripeWebhook,
};
