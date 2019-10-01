import mongoose, { Schema } from 'mongoose';

const planSchema = new Schema({
  name: {
    type: String,
    required: true
  },
  description: {
    type: String
  },
  price: {
    type: Number,
    required: true
  },  
  creator: {
    type: Schema.Types.ObjectId,
    ref: 'User'
  }

});
//
const Plan = mongoose.model('Plan', planSchema);

export default Plan;
