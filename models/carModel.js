const db = require("../firebaseConfig");
const carRef = db.ref("car");

const carSchema =function(car) {
        this.id = car.id || carRef.push().key;
        this.image = car.image;
        this.capacity = car.capacity;
        this.fuelType = car.fuelType;
        this.bookedTimeSlots = [{
            from: car.bookedTimeSlots.from,
            to: car.bookedTimeSlots.to
        }];
        this.rentPerHour = car.rentPerHour;
        this.created_at = Date.now();
        this.updated_at = Date.now();
        this.is_deleted = false;
}

module.exports = { Car: carSchema, carRef };