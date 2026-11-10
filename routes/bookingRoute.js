const express = require('express');
const router = express.Router();
const { Booking, bookingRef } = require('../models/bookingModel')
const { Car, carRef } = require('../models/carModel')
const stripe = require('stripe')('')
const { v4, uuidv4 } = require('uuid')
router.post('/bookcar', async(req, res) => {

    const {token} = req.body
    try {
        const customer = await stripe.customer.create({
            email : token.email,
            source : token.id
        })

        const payment =  await stripe.charges.create({
            amount : req.body.totalAmount * 100,
            currency : 'idr',
            customer : customer.id,
            receipt_email : token.email
        }, {
            idempotencyKey : uuidv4()
        })
        
        if(payment) 
        {
        //const transactionId = req.body.transactionId || bookingRef.push().key
        //req.body.transactionId = transactionId
        req.body.transactionId = payment.source.id
        await bookingRef.child(transactionId).set(req.body);
        const car =  await carRef.child(req.body.car).once('value');
        if(!car.exists()) {
            return res.status(400).json({message: 'Not found'})
        }
        const carData =  car.val(); 
        const bookedTimeSlots = carData.bookedTimeSlots || [];

        bookedTimeSlots.push({
            from:req.body.bookedTimeSlots.from,
            to: req.body.bookedTimeSlots.to
        });
        await carRef.child(req.body.car).update({
            bookedTimeSlots
        });
        return res.status(200).json({ message: "Your booking is successfully" });
        } else  {
            return res.status(400).json(error);
        }
    } catch (error) {
        return res.status(400).json(error);
    }
});

router.get('/getallbooking', async(req, res) => {
    try {
        const booking = await bookingRef.once('value');
        const data = booking.val() || {};
        const carId = Object.values(data).map(b => b.car);
        const carPromise = carId.map(carId => carRef.child(carId).once('value'));
        const carSnapshot = await Promise.all(carPromise);
        const cars = carSnapshot.map(snapshot => snapshot.val());
        const bookings = Object.keys(data).map((id, index) => ({
            _id: id,
            ...data[id],
            car: cars[index],
        }));
        return res.status(200).json(bookings);
    } catch (error) {
        return res.status(400).json(error);
    }
});

module.exports = router