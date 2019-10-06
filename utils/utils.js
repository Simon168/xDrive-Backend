'use strict';

// judge email or mobile number, if email: return NaN, if mobile number: return a number
function emailMobile (email_mobile) {
  let loginId = email_mobile.trim().split('');
  return +loginId[loginId.length - 1];
};


function logErrors (err, req, res, next) {
  console.error(err.stack);
  next(err);
};

function clientErrorHandler (err, req, res, next) {
  if (req.xhr) {
    res.status(500).send({ error: 'Something failed!' });
  } else {
    next(err);
  }
};

function error404Handler (err, req, res, next) {
    let err = new Error('Path or File Not Found!');
    err.status = 404;
    next(err);
};

function finalErrorHandler (err, req, res, next) {
  res.status(500);
  res.render('error', { error: err });
};

/*
 * Normalize a port into a number, string, or false.
*/
function normalizePort(val) {
  let port = parseInt(val, 10);
  if (isNaN(port)) {
    // named pipe
    return val;
  };
  if (port >= 0) {
    // port number
    return port;
  };
  return false;
};

const dateToString = date => new Date(date).toISOString();

export default {
  emailMobile,
	logErrors,
	clientErrorHandler,
	error404Handler,
	finalErrorHandler,
  normalizePort,
  dateToString,
};
