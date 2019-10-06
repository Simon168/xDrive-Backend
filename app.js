'use strict';
/*
* convert require to import:
* npm install -S esm
* to enable ES6 import , node -r esm server.js
*/

import express from 'express';
import bodyParser from 'body-parser';
/*
* apollo-server combines express
* apollo-server-express independently works with express
*/
import { ApolloServer } from 'apollo-server-express';
/*
* This middleware is only intended to be used in a development environment,
* as the full error stack traces and internal details of any object passed
* to this module will be sent back to the client when an error occurs.
*/
import  errorHandler from 'errorhandler';
// enable CORS with various options.
import cors from 'cors';
import jwt from 'jsonwebtoken';
//import passport from 'passport';
//import FacebookStrategy from 'passport-facebook';
import mongoose from 'mongoose';


import typeDefs from './graphql/typeDefs';
import resolvers from './graphql/resolvers';

// import authentication middleware
import { userAuth } from './middleware/userAuth';

import utils from './utils/utils';

const app = express();
// hide information: x-powered-by: express
app.disable('x-powered-by');

// parse json in request body
app.use(bodyParser.json());
// allow CORS
// app.use((req, res, next) => {
// 	res.setHeader('Access-Control-Allow-Origin', '*');
// 	res.setHeader('Access-Control-Allow-Methods', 'POST, GET, OPTIONS');
// 	res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
// 	if(req.method === 'OPTIONS'){
// 		return res.sendStatus(200);
// 	}
// 	next();
// });
app.use(cors());

// add authentication middleware
app.use(userAuth);

// REST API
app.get('/', (req, res, next) => {
  res.end('Hello world!');
});

// graphQL API
const apolloServer = new ApolloServer({
	typeDefs,
	resolvers,
	playground: true,
	context: ({ req, res }) => ({ req, res })
});

apolloServer.applyMiddleware({ app, path: '/graphql' });





// log errors
app.use(utils.logErrors);
app.use(utils.clientErrorHandler);
// catch 404 and forward to error handler
app.use(utils.error404Handler);
// final error handler
// configuration for development environment
if(process.env.NODE_ENV === 'development') {
   console.log("running in development environment");
	 console.log(`${apolloServer.graphqlPath}`);
   app.use(errorHandler());
 };
// Set the environment variable NODE_ENV to production, to run the app in production mode.
// configuration for production environment (NODE_ENV=production)
if(process.env.NODE_ENV === 'production') {
   console.log("running in production environment");
   // configure a generic 500 error message
   app.use(utils.finalErrorHandler);
};


export default app;
