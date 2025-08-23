const Payment = require('../models/paymentModel.js');

async function getPaymentById(id, filter={}){
    const payment = await Payment.findById(id).filter(filter).populate('user', 'name email year course role');
    return payment;
}

async function getPayments(filter={}){
    const payments = await Payment.find(filter).populate('user', 'name email year course role');
    return payments;
}

async function createPayment(paymentData){
    const payment = new Payment(paymentData);
    await payment.save();
    return payment;
}

async function updatePayment(id, paymentData){
    const payment = await Payment.findByIdAndUpdate(id, paymentData, { new: true });
    return payment;
}

module.exports = {
    getPaymentById,
    getPayments,
    createPayment,
    updatePayment
}