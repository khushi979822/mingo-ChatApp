import mongoose from "mongoose";

const connectDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGO_URI, {
      // These are the recommended options for a stable local connection
      serverSelectionTimeoutMS: 5000,   // Fail fast if MongoDB isn't running
      socketTimeoutMS: 45000,           // Close sockets after 45s of inactivity
    });

    console.log("━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━");
    console.log("✅  MongoDB Connected Successfully");
    console.log(`📡  Host     : ${conn.connection.host}`);
    console.log(`📦  Database : ${conn.connection.name}`);
    console.log("━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━");
  } catch (error) {
    console.error("━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━");
    console.error("❌  MongoDB Connection Failed");
    console.error(`🔴  Error   : ${error.message}`);z
    console.error("💡  Make sure MongoDB is running locally.");
    console.error("    Start it with: net start MongoDB");
    console.error("━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━");
    process.exit(1);
  }
};

// Graceful disconnect on app termination
process.on("SIGINT", async () => {
  await mongoose.connection.close();
  console.log("\n🔌  MongoDB disconnected on app termination");
  process.exit(0);
});

export default connectDB;
