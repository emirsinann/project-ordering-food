
//ana dizin
const express = require("express");
require("dotenv").config();
const app = express();
const { registerValidator } = require("./validators/registerValidators");
const { HomeController } = require("./controller/HomeController");
const { loginValidators } = require("./validators/loginValidators");
const { JWTController } = require("./controller/JWTController");
const userRouter = require("./routes/userroutes");
const addressRouter = require("./routes/addressroutes");
const orderRouter = require("./routes/orderroutes");
const categoryRouter = require("./routes/categoryRoutes");
const productRouter = require("./routes/productroutes");

const cors = require("cors");

var corsOptions = {
    origin: "http://localhost:3000",
    optionsSuccessStatus: 200, // some legacy browsers (IE11, various SmartTVs) choke on 204
  };
  
  app.use(function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "http://localhost:3000"); // update to match the domain you will make the request from
    res.header(
      "Access-Control-Allow-Headers",
      "Origin, X-Requested-With, Content-Type, Accept"
    );
    res.setHeader("Access-Control-Allow-Credentials", "true");
    res.setHeader("Access-Control-Allow-Headers", "content-type");
    res.setHeader(
      "Access-Control-Allow-Methods",
      "PUT, POST, GET, DELETE, PATCH, OPTIONS"
    );
next();
});


app.use(express.json());
//const {init} =require("./dbconfig")
//init();
app.use("/user",cors(corsOptions),JWTController.verifyAccessToken.bind(JWTController),userRouter)
app.use("/address",cors(corsOptions),JWTController.verifyAccessToken.bind(JWTController),addressRouter)
app.use("/order",cors(corsOptions),JWTController.verifyAccessToken.bind(JWTController),orderRouter)
app.use("/category",cors(corsOptions),categoryRouter); // ekleme yapacağım zaman kullanacağım sadece.
app.use("/product",cors(corsOptions),productRouter); // ekleme yapacağım zaman kullanacağım sadece.
app.get("/",(req,res)=>{
    res.send({message : "Hello you are all the be231311212312332st people"});
})
app.post(
"/register",cors(corsOptions),
registerValidator,
HomeController.register
);
app.post(
    "/login",cors(corsOptions),
    loginValidators,
    HomeController.login
    );

app.listen(5000,()=>{
    console.log("Server running great of port 5000");
})  