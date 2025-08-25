const mongoose = require('mongoose');

const paymentSchema = mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Member",
    required: true,
  },
  amount: {
    type: Number,
    required: true,
  },
  paymentMethod: {
    type: String,
    enum: ["cash", "digital"],
  },
  status: {
    type: String,
    required: true,
    enum: ["Unpaid", "Paid", "Pending"],
    default: function () {
      if (this.paymentMethod === "digital") {
        return "Pending";
      }else{
        return "Unpaid";
      }
    },
  },
  transactionId: {
    type: String,
    required: true,
  },
  remarks: {
    type: String,
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model('Payment', paymentSchema);