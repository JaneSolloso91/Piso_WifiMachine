const express = require('express')
const router= express.Router()

const { Payment } = require('../models');


 router.get('/', async(req, res) => {
    try {
        const paymentList = await Payment.findAll({
            attributes:[
                "id", 
                "user_id", 
                "machine_id", 
                "plan_id", 
                "amount", 
                "payment_method", 
                "status", 
                "paid_at"
            ],
            where: { id: id },
        });
        res. status(200).json(paymentList);
    } catch (error) {
        res.status(404)
        .json({ message: "An error occured while fetching payment data!"});

    }

 });

 router.get("/id",async(req, res) => {
    const  { id } = req.params
    try{
        const payment = Payment.findAll({
            attributes: [
                "id", 
                "user_id", 
                "machine_id", 
                "plan_id", 
                "amount", 
                "payment_method", 
                "status", 
                "paid_at"
            ],
            where: { id: id },

        });
        console.log(payment)
        res.status(200).json(payment)
    }catch ( error ){
    res.status(500).json({ message: "Database error while fectching payment data"});
    }
 });
  
 router.post("/new", async(req, res) => {
    try {
        const newPayment = req.body
        console.log(newPayment);
        await Payment.create(newPayment)
        res.status(201).json({message: "New payment data created"});

    } catch (error) {
        res.status(404).json({message: "An error occured while adding new payment."});
    }

 });

 router.put("/:id", async (req,res) => {
    const{ id } = req.params
    const {
        user_id, 
        machine_id, 
        plan_id, amount, 
        payment_method, 
        status, 
        paid_at
    } = req.body
    try{
        const payment = await Payment.update(
            {
                user_id: user_id,
                machine_id: machine_id,
                plan_id: plan_id,
                amount: amount,
                payment_method: payment_method,
                status: status,
                paid_at: paid_at,

            },
            {
                where:{id : id},
            },
        );
        console.log(payment.length);

        if (!payment.length === 0 ) {
            return res
            .status(404)
            .json({ message: "updateError: Payment data not found!"})
        }
        res.status(200).json({ message: "successfully updates payment data!"});
    }catch( error ){
        return res.status(404).json({ message: "An error occurred while updating data!"});

    }
 });

 
 module.exports = router;

