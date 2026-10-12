const express = require('express')
const router= express.Router()

const { User } = require('../models');


 router.get('/', async(req, res) => {
    try {
        const userList = await User.findAll({
            attributes:[
                "id", 
                "username", 
                "mac_address", 
                "device_name", 
                "created_at"],
        });
        res. status(200).json(userList);
    } catch (error) {
        res.status(404)
        .json({ message: "An error occured while fetching user data!"});

    }

 });

 router.get("/id",async(req, res) => {
    const  { id } = req.params
    try{
        const user = User.findAll({
            attributes: [
                "id", 
                "username", 
                "mac_address", 
                "device_name", 
                "created_at"
            ],
            where: { id: id },

        });
        console.log(user)
        res.status(200).json(user)
    }catch ( error ){
    res.status(500).json({ message: "Database error while fectching user data"});
    }
 });
  
 router.post("/new", async(req, res) => {
    try {
        const newUser = req.body
        console.log(newUser);
        await User.create(newUser)
        res.status(201).json({message: "New user data created"});

    } catch (error) {
        res.status(404).json({message: "An error occured while adding new user."});
    }

 });

 router.put("/:id", async (req,res) => {
    const{ id } = req.params
    const {
        username, 
        mac_address, 
        device_name, 
        created_at
    } = req.body
    try{
        const user = await User.update(
            {
                username: username,
                mac_address: mac_address,
                device_name: device_name,
                created_at: created_at,

            },
            {
                where:{id : id},
            },
        );
        console.log(user.length);

        if (!user.length === 0 ) {
            return res
            .status(404)
            .json({ message: "updateError: User data not found!"})
        }
        res.status(200).json({ message: "successfully updates user data!"});
    }catch( error ){
        return res.status(404).json({ message: "An error occurred while updating data!"});

    }
 });

 
 module.exports = router;

