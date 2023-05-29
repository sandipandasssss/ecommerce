const errorhander = require("../utils/errorhander");

module.exports = (err, req, res, next) => {
   err.statusCode = err.statusCode || 500;
   err.message = err.message || "internal server Error";

   // Wrong Mongodb Id error
  if (err.name === "CastError") {
   const message = `Resource not found. Invalid: ${err.path}`;
   err = new errorhander(message, 400);
 }

 // Mongoose duplicate key error
 if (err.code === 11000) {
   const message = `Duplicate ${Object.keys(err.keyValue)} Entered`;
   err = new errorhander(message, 400);
 }

 // wrong JWT error 
 if (err.name === "JsonWebTokenError") {
  const message = `Json web token is invalid, try again`;
  err = new errorhander(message, 400);
 }

// JWT expire error
 if (err.name === "TokenExpiredError") {
  const message = `Json web token is Expired, try again`;
  err = new errorhander(message, 400);
 }


   res.status(err.statusCode).json({
    sucess:false,
    message: err.message,
   });
};



