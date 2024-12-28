// backend/db/index.js
const mongoose = require("mongoose");
const { logger } = require("../utils/logger");

// Configuration options for MongoDB connection
const mongooseOptions = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  autoIndex: true, // Build indexes
  maxPoolSize: 10, // Maintain up to 10 socket connections
  serverSelectionTimeoutMS: 5000, // Keep trying to send operations for 5 seconds
  socketTimeoutMS: 45000, // Close sockets after 45 seconds of inactivity
  family: 4, // Use IPv4, skip trying IPv6
};

// Cached connection
let cached = global.mongoose;
if (!cached) {
  cached = global.mongoose = { conn: null, promise: null };
}

async function connectToDatabase() {
  if (cached.conn) {
    logger.info("Using cached MongoDB connection");
    return cached.conn;
  }

  if (!cached.promise) {
    const MONGODB_URI = process.env.MONGODB_URI;

    if (!MONGODB_URI) {
      throw new Error("Please define the MONGODB_URI environment variable");
    }

    // Connection events
    mongoose.connection.on("connected", () => {
      logger.info("MongoDB connected successfully");
    });

    mongoose.connection.on("error", (err) => {
      logger.error("MongoDB connection error:", err);
    });

    mongoose.connection.on("disconnected", () => {
      logger.warn("MongoDB disconnected");
    });

    // Handle Node.js process termination
    process.on("SIGINT", async () => {
      try {
        await mongoose.connection.close();
        logger.info("MongoDB connection closed through app termination");
        process.exit(0);
      } catch (err) {
        logger.error("Error closing MongoDB connection:", err);
        process.exit(1);
      }
    });

    cached.promise = mongoose
      .connect(MONGODB_URI, mongooseOptions)
      .then((mongoose) => {
        logger.info("New MongoDB connection established");
        return mongoose;
      })
      .catch((err) => {
        logger.error("Error connecting to MongoDB:", err);
        throw err;
      });
  }

  try {
    cached.conn = await cached.promise;
    return cached.conn;
  } catch (err) {
    cached.promise = null;
    throw err;
  }
}

// Create indexes for collections
async function createIndexes() {
  try {
    const db = mongoose.connection;

    // User indexes
    await db.collection("users").createIndex({ address: 1 }, { unique: true });
    await db.collection("users").createIndex({ username: 1 }, { sparse: true });

    // NFT indexes
    await db.collection("nfts").createIndex({ tokenId: 1 }, { unique: true });
    await db.collection("nfts").createIndex({ owner: 1 });
    await db.collection("nfts").createIndex({ creator: 1 });
    await db.collection("nfts").createIndex({ "listingDetails.isListed": 1 });
    await db.collection("nfts").createIndex(
      {
        name: "text",
        description: "text",
      },
      {
        weights: {
          name: 10,
          description: 5,
        },
      }
    );

    // Collection indexes
    await db.collection("collections").createIndex({ creator: 1 });
    await db.collection("collections").createIndex({
      name: "text",
      description: "text",
    });

    // Transaction indexes
    await db
      .collection("transactions")
      .createIndex({ transactionHash: 1 }, { unique: true });
    await db.collection("transactions").createIndex({ nft: 1 });
    await db.collection("transactions").createIndex({ from: 1 });
    await db.collection("transactions").createIndex({ to: 1 });
    await db.collection("transactions").createIndex({ timestamp: 1 });

    logger.info("Database indexes created successfully");
  } catch (err) {
    logger.error("Error creating database indexes:", err);
    throw err;
  }
}

// Health check function
async function checkDatabaseHealth() {
  try {
    if (mongoose.connection.readyState !== 1) {
      throw new Error("Database not connected");
    }

    // Perform a simple operation to verify database responsiveness
    await mongoose.connection.db.admin().ping();
    return {
      status: "healthy",
      connectionState: mongoose.connection.readyState,
      timestamp: new Date(),
    };
  } catch (err) {
    logger.error("Database health check failed:", err);
    return {
      status: "unhealthy",
      error: err.message,
      connectionState: mongoose.connection.readyState,
      timestamp: new Date(),
    };
  }
}

// Get database statistics
async function getDatabaseStats() {
  try {
    const stats = await mongoose.connection.db.stats();
    return {
      collections: stats.collections,
      documents: stats.objects,
      dataSize: stats.dataSize,
      storageSize: stats.storageSize,
      indexes: stats.indexes,
      indexSize: stats.indexSize,
    };
  } catch (err) {
    logger.error("Error getting database stats:", err);
    throw err;
  }
}

module.exports = {
  connectToDatabase,
  createIndexes,
  checkDatabaseHealth,
  getDatabaseStats,
  mongoose, // Export mongoose instance if needed elsewhere
};

// Optional: Auto-connect when the module is imported
if (process.env.NODE_ENV !== "test") {
  connectToDatabase().catch((err) => {
    logger.error("Initial database connection failed:", err);
    process.exit(1);
  });
}
