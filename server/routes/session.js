const express = require('express')
const router= express.Router()

const { Session } = require('../models');


 router.get('/', async(req, res) => {
    try {
        const sessionList = await session.findAll({
            attributes:[
                "id", 
                "user_id", 
                "machine_id", 
                "plan_id", 
                "start_time", 
                "end_time", 
                "status"
            ],
        });
        res. status(200).json(sessionList);
    } catch (error) {
        res.status(404)
        .json({ message: "An error occured while fetching session data!"});

    }

 });

 router.get("/id",async(req, res) => {
    const  { id } = req.params
    try{
        const session = session.findAll({
            attributes: [
                "id", 
                "user_id", 
                "machine_id", 
                "plan_id", 
                "start_time", 
                "end_time", 
                "status"
            ],
            where: { id: id },

        });
        console.log(session)
        res.status(200).json(session)
    }catch ( error ){
    res.status(500).json({ message: "Database error while fectching session data"});
    }
 });
  
 router.post("/new", async(req, res) => {
    try {
        const newSession = req.body
        console.log(newSession);
        await Session.create(newSession)
        res.status(201).json({message: "New session data created"});

    } catch (error) {
        res.status(404).json({message: "An error occured while adding new session."});
    }

 });

 router.put("/:id", async (req,res) => {
    const{ id } = req.params
    const {
        user_id, 
        machine_id, 
        plan_id, 
        start_time, 
        end_time, 
        status
    } = req.body
    try{
        const session = await session.update(
            {
                user_id: user_id,
                machine_id: machine_id,
                plan_id: plan_id,
                start_time: start_time,
                end_time: end_time,
                status: status,


            },
            {
                where:{id : id},
            },
        );
        console.log(session.length);

        if (!session.length === 0 ) {
            return res
            .status(404)
            .json({ message: "updateError: session data not found!"})
        }
        res.status(200).json({ message: "successfully updates session data!"});
    }catch( error ){
        return res.status(404).json({ message: "An error occurred while updating data!"});

    }
 });

 
 module.exports = router;

