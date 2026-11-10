const db = require("../firebaseConfig");
const bookingRef = db.ref("booking");

const bookingSchema =function(booking) {
        this.car = booking.car;
        this.user = booking.user;
        this.bookedTimeSlots = [{
                from: booking.from,
                to: booking.to
        }];
        this.totalHours = booking.totalHours;
        this.totalAmount = booking.totalAmount;
        this.transactionId = booking.id || bookingRef.push().key;
        this.driverRequired = booking.driverRequired;
        this.created_at = Date.now();
        this.updated_at = Date.now();
        this.is_deleted = false;
}

module.exports = { Booking: bookingSchema, bookingRef };