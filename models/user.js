// import ORM
import mongoose, { Schema } from 'mongoose';
// import bcryptjs 
import { hash, compare } from 'bcryptjs';

const userSchema = new Schema({
  email: {
    type: String,
    lowercase: true,
    required: [true, "can't be blank"],
    trim: true,
    match: [/\S+@\S+\.\S+/, 'is invalid'],
    index: true,
    validate: {
      validator: email => User.doesntExist({ email }),
      message: 'Email has already been taken.'
    }
  },
  mobile: {
    type: String,
    required: [true, "can't be blank"],
    trim: true,
    validate: {
      validator: mobile => User.doesntExist({ mobile }),
      message: 'Mobile number has already been taken.'
    }
  },
  image: {
    data: Buffer,
    contentType: String
  },
  firstname: {
    type: String,
    trim: true
  },
  lastname: {
    type: String,
    trim: true
  },
  password: {
    type: String,
    trim: true,
    required: [true, "can't be blank"],
  }
}, {
  timestamps: true  // generate createdAt, updatedAt automatically by mongoose
});
// pre processing, hash raw password before save
userSchema.pre('save', async function () {
  if (this.isModified('password')) {
    this.password = await hash(this.password, 10)
  }
});
// insert a static method
userSchema.statics.doesntExist = async function (options) {
  return await this.where(options).countDocuments() === 0;
};
// compare hashed password
userSchema.methods.matchesPassword = function (password) {
  return compare(password, this.password)
};

const User = mongoose.model('User', userSchema);

export default User;
