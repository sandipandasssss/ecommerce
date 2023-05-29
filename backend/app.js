const express = require("express");
const app = express();
const errorMiddleware = require("./middleware/error");
const cookieParser = require("cookie-parser");


app.use(express.json());
app.use(cookieParser());


// route imports
const products = require("./routes/productRoute");
const user = require("./routes/userRoute");
const order = require("./routes/orderRoute");
const cart = require("./routes/cartRoute");

app.use("/api/v1",products);
app.use("/api/v1",user);
app.use("/api/v1", order);
app.use("/api/v1", cart);






// middleware for errors 

app.use(errorMiddleware);

module.exports = app