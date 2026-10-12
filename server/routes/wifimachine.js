const express = require('express')
const router= express.Router()

const { Wifimachine } = require('../models');


 router.get('/', async(req, res) => {
    try {
        const wifimachineList = await Wifimachine.findAll({
            attributes:[
                "id", 
                "machine_code", 
                "location", 
                "ip_address", 
                "status", 
                "created_at"
            ],
        })
        res. status(200).json(wifimachineList);
    } catch (error) {
        res.status(404)
        .json({ message: "An error occured while fetching wifimachine data!"});

    }

 });

 router.get("/id",async(req, res) => {
    const  { id } = req.params
    try{
        const wifimachine = Wifimachine.findAll({
            attributes: [
                "id", 
                "machine_code", 
                "location", "ip_address", 
                "status", 
                "created_at"
            ],
            where: { id: id },

        });
        console.log(wifimachine)
        res.status(200).json(wifimachine)
    }catch ( error ){
    res.status(500).json({ message: "Database error while fectching wifimachine data"});
    }
 });
  
 router.post("/new", async(req, res) => {
    try {
        const newWifimachine = req.body
        console.log(newWifimachine);
        await Wifimachine.create(newWifimachine)
        res.status(201).json({message: "New wifimachine data created"});

    } catch (error) {
        res.status(404).json({message: "An error occured while adding new wifimachine."});
    }

 });

 router.put("/:id", async (req,res) => {
    const{ id } = req.params
    const {
        machine_code, 
        location, 
        ip_address, 
        status, 
        created_at
    } = req.body
    try{
        const wifimachine= await Wifimachine.update(
            {
                machine_code: machine_code,
                location: location,
                ip_address: ip_address,
                status: status,
                created_at: created_at,


            },
            {
                where:{id : id},
            },
        );
        console.log(wifimachine.length);

        if (!wifimachine.length === 0 ) {
            return res
            .status(404)
            .json({ message: "updateError: wifimachine data not found!"})
        }
        res.status(200).json({ message: "successfully updates wifimachine data!"});
    }catch( error ){
        return res.status(404).json({ message: "An error occurred while updating data!"});

    }
 });

 
 module.exports = router;

