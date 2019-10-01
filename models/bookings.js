'use strict';

import mongoose, { Schema } from 'mongoose';

const bookingSchema = new Schema(
  {
    plan: {
      type: Schema.Types.ObjectId,
      ref: 'Plan'
    },
    user: {
      type: Schema.Types.ObjectId,
      ref: 'User'
    },
    bookingdate: {
      type: String,
      required: [true, "can't be blank"]
    },
    bookingtime: {
      type: String,
      required: [true, "can't be blank"]
    },
    instructions: {
      type: String
    }
  },
  {
    timestamps: true
  }
);

const Booking = mongoose.model('Booking', bookingSchema);

export default Booking;
