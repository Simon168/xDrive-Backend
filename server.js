'use strict';

import dotenv from 'dotenv';
import mongoose from 'mongoose';

import app from './app';
import mongodbConnection from './mongodb/connection';
import utils from './utils/utils';

(async () => {
  // read environment variables in process.env
  const result = await dotenv.config()

  if (result.error) {
    throw result.error
  }
  // log parsed process.env
  console.log(result.parsed)
  // connect to mongoDB
  await mongodbConnection();

  /*
   * Get port from environment and store in Express.
  */
  // normalise PORT
  const port = utils.normalizePort(process.env.APP_PORT || 3008);
  app.listen(port, () => {
    console.log(`apollo server running on port ${port}`);
  });
  console.log('process.env.NODE_ENV:', process.env.NODE_ENV);
  console.log('process.env.MONGO_URI:', process.env.MONGO_URI);

})();
