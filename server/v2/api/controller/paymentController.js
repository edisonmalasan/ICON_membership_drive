const {parseFilters} = require('../../utils/routeUtil.js');

const {getPaymentById, getPayments, createPayment, updatePayment} = require('../../services/paymentService.js')

async function handleGetPayment(req, res){
    const allowedOperators = ['gte','lte','eq'];
    let filters = {}
    if(req.query.filter){
        filters = parseFilters(req.query, allowedOperators);
    }

    try{
        const payments = await getPayments(filters);
        res.status(200).json(payments); 
    }catch(error) {
        res.status(500).json({ error: 'Internal server error' });
    }

} 

async function handlePostPayment(req,res){
    const { user, amount, paymentMethod, remarks, transactionId } = req.body;

    try{
        const newPayment = await createPayment({ user, amount, paymentMethod, remarks, transactionId });
        res.status(201).json(newPayment);
    }catch(error) {
        res.status(500).json({ error: 'Internal server error' });
    }
}

async function handlePutPayment(req,res){
    const paymentId = req.params.id;
    const { amount, status, paymentMethod, remarks, transactionId } = req.body;

    try{
        const updatedPayment = await updatePayment(paymentId, { amount, status, paymentMethod, remarks, transactionId });
        if(!updatedPayment){
            return res.status(404).json({ error: 'Payment not found' });
        }
        res.status(200).json(updatedPayment);
    }catch(error) {
        console.log(error)
        res.status(500).json({ error: 'Internal server error' });
    }
}

module.exports = {
    handleGetPayment,
    handlePostPayment,
    handlePutPayment
}