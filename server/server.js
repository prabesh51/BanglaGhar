// server/server.js
const path = require("path");

// 1) load exactly the .env you intend (works for local dev, ignored in Netlify)
require("dotenv").config({
  path: path.resolve(__dirname, "./.env"),
});

// Optional Debugging:
// console.log("------------------------------------------");
// console.log("[DEBUG Server Start] Loading environment variables...");
// console.log("[DEBUG Server Start] AWS_REGION:", process.env.AWS_REGION);
// console.log(
//   "[DEBUG Server Start] COGNITO_USER_POOL_ID:",
//   process.env.COGNITO_USER_POOL_ID
// );
// console.log(
//   "[DEBUG Server Start] MONGO_URI:",
//   process.env.MONGO_URI ? "Loaded successfully" : "!!! MONGO_URI NOT LOADED !!!"
// );
// console.log("------------------------------------------");

const aiRoutes = require("./routes/aiRoutes");
const propertyRoutes = require("./routes/propertyRoutes");
const wishlistRoutes = require("./routes/wishlistRoutes");
const userProfileRoutes = require("./routes/userProfileRoutes");
const adminRoutes = require("./routes/adminRoutes");

// 2) imports
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const app = express();
app.use(cors());
app.use(express.json());

// 3) API Routes
app.use("/api", aiRoutes);
app.use("/api/properties", propertyRoutes);
app.use("/api/users/:username/wishlist", wishlistRoutes);
app.use("/api/user-profiles", userProfileRoutes);
app.use("/api/admin", adminRoutes); // Mount admin routes under /api/admin

// 4) Connect to DB
const uri = process.env.MONGO_URI;
if (!uri) {
  console.error("No Mongo URI found in ENV! Check your .env name.");
  // In a serverless environment, throwing an error might be better than process.exit
  // process.exit(1);
  throw new Error("MONGO_URI environment variable is not set.");
}
mongoose
  .connect(uri, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("✅ Connected to MongoDB Atlas successfully!");
  })
  .catch((err) => {
    console.error("❌ Error connecting to MongoDB Atlas:", err);
    // Propagate the error for serverless environments
    throw new Error(`Failed to connect to MongoDB: ${err.message}`);
  });

// 5) MODELS (Ensure UserProfile is defined in its file)
const Property = require("./models/property");
const Wishlist = require("./models/Wishlist");
const UserProfile = require("./models/UserProfile");

// 6) TEST ROUTE (Optional, can be useful for initial deploy testing)
app.get("/", (req, res) => {
  res.send(
    "Hello from the backend server! MongoDB connection check performed on start."
  );
});

// 7) -- REMOVE OR COMMENT OUT THIS PART --
// const PORT = process.env.PORT || 5001;
// app.listen(PORT, () => {
//   console.log(`Server listening on port ${PORT}`);
// });
// -- END OF REMOVED PART --

// 8) Export the app instance for the serverless handler
module.exports = { app };
