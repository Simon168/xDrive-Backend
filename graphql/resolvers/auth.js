'use strict';

import { hash, compare } from 'bcryptjs';
import jwt from 'jsonwebtoken';
import User from '../../models/user';
//import { emailMobile } from '../../utils/utils';

export default {
  Query: {
    // users: (root, args, context, info) => {
    //   // todo: auth check, projection, pagination
    //
    //   return User.find({});
    //
    // },
    user: (root, args, context, info) => {
      // todo: auth check, projection

    },
    login: (root, args, context, info) => {

    }
  },
  Mutation: {
    signUp: (root, args, context, info) => {

    }
  }
}

// Provide resolver functions for your schema fields
// export default {
//   Query: {
//     login: async ({ email_mobile, password }) => {
//       let loginUser;
//       if(!emailMobile(email_mobile)){
//         loginUser = await User.findOne({ email: email_mobile});
//       }else{
//         loginUser = await User.findOne({ mobile: email_mobile});
//       }
//
//       if(!loginUser){
//         throw new Error('invalid credentials');
//       }
//       const isEqual = await compare(password, loginUser.password);
//       if(!isEqual){
//         throw new Error('invalid credentials');
//       }
//       const token = jwt.sign(
//         {
//           userId: loginUser.id, email: loginUser.email
//         },
//         constant.jwtSecretKey,
//         {
//           expiresIn: '2h'
//         }
//       );
//       return {userId: loginUser.id, token: token, tokenExpiration: 2};
//     }
//   },
//   Mutation: {
//     createUser: async (args) => {
//       try {
//         let existingCreator = await User.findOne({email: args.userInput.email});
//         if(existingCreator){
//           throw new Error('user exists already.');
//         }
//         const hashedPassword = await bcrypt.hash(args.userInput.password, 12);
//         const creator = new User({
//           email: args.userInput.email,
//           password: hashedPassword
//         });
//         const userSaveResult = await creator.save();
//         return {...userSaveResult._doc, password: null, _id: userSaveResult.id};
//       }catch(err){
//         throw err;
//       }
//     }
//   }
// };
