const express = require('express')
const router= express.Router()

const { Plan } = require('../models');


 router.get('/', async(req, res) => {
    try {
        const planList = await Plan.findAll({
            
            attributes:[
                "id", 
                "plan_name", 
                "price", 
                "duration_minutes", 
                "status"
            ],
        });
        res. status(200).json(planList);
    } catch (error) {
        res.status(404)
        .json({ message: "An error occured while fetching plan data!"});

    }

 });

 router.get("/id",async(req, res) => {
    const  { id } = req.params
    try{
        const plan = Plan.findAll({
            attributes: [
                "id", 
                "plan_name", 
                "price", 
                "duration_minutes", 
                "status"],
            where: { id: id },

        });
        console.log(plan)
        res.status(200).json(plan)
    }catch ( error ){
    res.status(500)
    .json({ message: "Database error while fectching plans data"})
    }
 });
  
 router.post("/new", async(req, res) => {
    try {
        const newPlan = req.body
        console.log(newPlan);
        await Plan.create(newPlan)
        res.status(201).json({message: "New plan data created"});
        
    } catch (error) {
        res
        .status(404)
        .json({message: "An error occured while adding new plan."});
    }

 });

 router.put("/:id", async (req,res) => {
    const{ id } = req.params

    const {
        plan_name, 
        price, 
        duration_minutes, 
        status 
    } = req.body
    try{
        const plan = await Plan.update(
            {
                plan_name: plan_name,
                price: price,
                duration_minutes: duration_minutes,
                status: status,
            },
            {
                where:{id : id},
            },
        );
        console.log(plan.length);

        if (!plan.length === 0 ) {
            return res
            .status(404)
            .json({ message: "updateError: Plan data not found!"});
        }
        
        res.status(200).json({ message: "successfully updates plan data!"});
        }catch( error ){
        return res.status(404).json({ message: "An error occurred while updating data!"});

    }
 });

 
 module.exports = router;

