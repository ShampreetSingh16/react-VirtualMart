const mongoose = require("mongoose");
const Schema = mongoose.Schema;

//Structure for the order model
const OrderSchema = new Schema({
    userID: String,
    amount: Number,
    items: Array,
    customerEmail: String,
    shippingDetails: Object,
    billingDetails: Object,
    paymentMethod: Object,
    paymentIntentId: String,
    paymentStatus: String,
    createdAt: { type: Date, default: Date.now },
  });

module.exports = mongoose.model('Order', OrderSchema);
