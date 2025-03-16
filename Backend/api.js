const express = require("express");
const app = express();
const dotenv = require("dotenv");
dotenv.config(); 

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


app.use(express.json());

const AuthRouter = require("./Router/AuthRouter");
// const UserRouter = require("./Router/UserRouter");
// const moviesRouter = require("./Router/MoviesRouter");


app.use("/api/auth/", AuthRouter);
// app.use("/api/user", UserRouter);
// app.use("/api/movies", moviesRouter);



const PORT = process.env.PORT || 3000;
app.listen(3000, () => {
    console.log(`server is running at Port ${PORT}.`);
});