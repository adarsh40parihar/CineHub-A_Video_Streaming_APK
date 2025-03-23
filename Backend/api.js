const express = require("express");
const app = express();
const dotenv = require("dotenv");
const cookieParser = require("cookie-parser");
const morgan = require("morgan");

dotenv.config(); 

app.use(express.json());
app.use(cookieParser());

app.use(morgan("dev"));   //logger for debugging

// allowing frontend to access the api
const cors = require("cors");
const corsConfig = {
  origin: "http://localhost:3000",// Replace with your frontend's origin
  credentials: true,
};
app.use(cors(corsConfig));
app.options("*", cors(corsConfig));


/***********************************Connection*********************************/
const mongoose = require("mongoose");

const dbLink = `mongodb+srv://${process.env.DB_USERNAME}:${process.env.DB_PASSWORD}@cluster0.xpchg.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0`;
console.log("Connection to server");

mongoose
  .connect(dbLink) 
  .then(function (connection) {
    console.log("Connected to the database successfully.");
  })
  .catch((err) => console.log("Error connecting to the database:", err));


 
const AuthRouter = require("./Router/AuthRouter");  
const UserRouter = require("./Router/UserRouter");
const MoviesRouter = require("./Router/MoviesRouter");
const DiscoverRouter = require("./Router/DiscoverRouter");
const TvShowsRouter = require("./Router/TvRouter");
const PaymentRouter = require("./Router/PaymentRouter");
const VideoRouter = require("./Router/VideoRouter");

app.use("/api/auth/", AuthRouter); //✅
app.use("/api/user", UserRouter);  //✅
app.use("/api/movies", MoviesRouter); //✅
app.use("/api/discover", DiscoverRouter);//✅
app.use("/api/tv", TvShowsRouter);//✅
app.use("/api/payment", PaymentRouter);//✅
app.use("/api/videos", VideoRouter);  // ❌ not verified yet



const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`server is running at Port ${PORT}.`);
});