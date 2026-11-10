const express = require("express");
const router = express.Router();
const { Car, carRef } = require('../models/carModel')

router.get("/getallcars", async(req, res) =>{
    try {
        const cars = await carRef.once('value');
        const dataCars = cars.val() || {};
        //return Object.keys(dataCars).map(id => new Car(dataCars[id]));
         const carList = Object.keys(dataCars).map(id => {
            const car = dataCars[id]; 
            car.id = id; // Adding the ID of the car to each car object
            return car;  // Assuming Car is just a plain object, if it's a model, you'd call `.toObject()` or similar
        });

        // Return the car list as a response
        return res.status(200).json(carList);
    } catch (error) {
        return res.status(400).json(error);
    }
});

router.post("/addcar", async(req, res) => {
    try {
        const newcar = req.body;
        const newRef = carRef.push();
        newcar.id = newRef.key;
        await newRef.set(newcar);
        return res.status(200).json({ message: "Car added successfully" });
    } catch (error) {
        return res.status(400).json(error);
    }
});

router.post("/editcar", async(req, res) => {
    try {
        const { id, data } = req.body;
        const carid = await carRef.child(id).once("value")
        if (!carid.exists) {
            return res.status(400).json({ message: "Car not found" });
        }
        
        await carRef.child(id).update(data);
        return res.status(200).json({ message: "Car details updated successfully" });
    } catch (error) {
        return res.status(400).json(error);
    }
});

router.post("/deletecar", async(req, res) => {
    try {
        const { id, data } = req.body;
        const carid = await carRef.child(id).once("value")
        if (!carid.exists) {
            return res.status(400).json({ message: "Car not found" });
        }
        
        await carRef.child(id).remove;
        return res.status(200).json({ message: "Car deleted successfully" });
    } catch (error) {
        return res.status(400).json(error);
    }
});

module.exports = router;