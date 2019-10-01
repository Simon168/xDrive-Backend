import mongoose, { Schema } from 'mongoose';

const messageSchema = new Schema({
  message: {
    type: String    
  },
  creator: {
    type: Schema.Types.ObjectId,
    ref: 'User'
  }

});
//
const Message = mongoose.model('Message', messageSchema);
export default Message;
