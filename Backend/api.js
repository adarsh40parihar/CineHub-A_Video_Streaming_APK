const express = require("express");
const app = express();
const dotenv = require("dotenv");
const cookieParser = require("cookie-parser");
const morgan = require("morgan");
const mongoose = require("mongoose");
const mongoSanitize = require("express-mongo-sanitize");
const helmet = require("helmet");
const xss = require("xss-clean");
const rateLimiter = require("express-rate-limit");

dotenv.config(); 

const limiter = rateLimiter({
  windowMs: 15 * 60 * 1000, // 15 minutes
  limit: 20000, // Limit each IP to 100 requests per `window` (here, per 15 minutes).
  standardHeaders: "draft-8", // draft-6: `RateLimit-*` headers; draft-7 & draft-8: combined `RateLimit` header
  legacyHeaders: false, // Disable the `X-RateLimit-*` headers.
  // store: ... , // Redis, Memcached, etc. See below.
});

// Middleware setup
app.use(limiter);
app.use(helmet());
app.use(express.json());
app.use(mongoSanitize());
app.use(xss());
app.use(cookieParser());

if (process.env.NODE_ENV !== "test") {
  app.use(morgan("dev")); //logger for debugging
}

// allowing frontend to access the api
const cors = require("cors");
const allowedOrigins = process.env.ALLOWED_ORIGINS.split(",");

const corsConfig = {
  origin: allowedOrigins, // Use the actual array instead of true
  credentials: true,
  methods: ["GET", "POST", "PUT", "DELETE", "PATCH", "OPTIONS"],
  allowedHeaders: ["Content-Type", "Authorization"],
};
app.use(cors(corsConfig));
app.options("*", cors(corsConfig));

// Router imports
const AuthRouter = require("./Router/AuthRouter");  
const UserRouter = require("./Router/UserRouter");
const MoviesRouter = require("./Router/MoviesRouter");
const DiscoverRouter = require("./Router/DiscoverRouter");
const TvShowsRouter = require("./Router/TvRouter");
const PaymentRouter = require("./Router/PaymentRouter");
const VideoRouter = require("./Router/VideoRouter");

// Router middleware
app.use("/api/auth/", AuthRouter); //✅
app.use("/api/user", UserRouter);  //✅
app.use("/api/movies", MoviesRouter); //✅
app.use("/api/discover", DiscoverRouter);//✅
app.use("/api/tv", TvShowsRouter);//✅
app.use("/api/payment", PaymentRouter);//✅
app.use("/api/videos", VideoRouter);  // ❌ not verified yet

// Conditional DB connection and server startup
async function startServer() {
  // Only connect to DB in development mode
  if (process.env.NODE_ENV !== 'test') {
    /***********************************Connection*********************************/
    const dbLink = `mongodb+srv://${process.env.DB_USERNAME}:${process.env.DB_PASSWORD}@cluster0.xpchg.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0`;
    console.log("Connection to server");
    mongoose
      .connect(dbLink)
      .then(function (connection) {
        console.log("Connected to the database successfully.");
      })
      .catch((err) => console.log("Error connecting to the database:", err));
  }
  const PORT = process.env.NODE_ENV === 'test' ? 5000 : process.env.PORT || 3400;
  
  app.listen(PORT, () => {
    console.log(`Server running in ${process.env.NODE_ENV} mode on port ${PORT}`);
  });
}

// Start server if not being required by another module (like tests)
if (process.env.NODE_ENV != 'test') {
    startServer();
}

// Export for testing
module.exports = { app };
