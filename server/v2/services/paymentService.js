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
    try{
        const payment = new Payment(paymentData);
        await payment.save();
        return payment;
    }catch(error){
        console.error('Error creating payment:', error);
        throw new Error('Internal server error');
    }
}

async function updatePayment(id, paymentData){
    try{
        const payment = await Payment.findByIdAndUpdate(id, paymentData, { new: true });
        return payment;
    }catch(error){
        console.error('Error updating payment:', error);
        throw new Error('Internal server error');
    }
}

module.exports = {
    getPaymentById,
    getPayments,
    createPayment,
    updatePayment
}