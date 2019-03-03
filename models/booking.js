const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const bookingSchema = new Schema(
  {
    event: {
      type: Schema.Types.ObjectId,
      ref: "events"
    },
    user: {
      type: Schema.Types.ObjectId,
      ref: "users"
    }
  },
  { timestamps: true }
);

module.exports = mongoose.model('booking', bookingSchema);

/// creator: user.bind(this, booking._doc.event.creator)
// const event = {
//     ...booking.event._doc,
//     creator: user.bind(this, booking._doc.event.creator)
//   };
