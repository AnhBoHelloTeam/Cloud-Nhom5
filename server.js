const express = require("express");
const mysql = require("mysql2/promise");
const cors = require("cors");
require("dotenv").config();

const app = express();
const PORT = process.env.PORT || 3000;

// Log environment for debugging
console.log("🔍 Environment Check:");
console.log("   PORT:", process.env.PORT || "(using default 3000)");
console.log("   DB_HOST:", process.env.DB_HOST || "(missing)");
console.log("   DB_NAME:", process.env.DB_NAME || "(missing)");

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.static("public"));

// Database connection
let db;
let dbConnected = false;

// Check environment variables
function checkEnvVariables() {
  const required = ["DB_HOST", "DB_USER", "DB_PASSWORD", "DB_NAME"];
  const missing = required.filter((key) => !process.env[key]);

  if (missing.length > 0) {
    console.error(
      "❌ Missing required environment variables:",
      missing.join(", ")
    );
    console.error("📝 Please create a .env file based on .env.example");
    console.error("💡 Example:");
    console.error("   DB_HOST=localhost");
    console.error("   DB_USER=root");
    console.error("   DB_PASSWORD=your_password");
    console.error("   DB_NAME=crud_app");
    console.error("   DB_PORT=3306");
    return false;
  }
  return true;
}

async function initDatabase() {
  // Check env variables first
  if (!checkEnvVariables()) {
    console.warn(
      "⚠️  Server will start but database operations will fail until .env is configured"
    );
    return;
  }

  try {
    console.log("🔄 Attempting to connect to database...");
    console.log(`   Host: ${process.env.DB_HOST}`);
    console.log(`   Database: ${process.env.DB_NAME}`);
    console.log(`   User: ${process.env.DB_USER}`);

    const connectionConfig = {
      host: process.env.DB_HOST,
      user: process.env.DB_USER,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_NAME,
      port: parseInt(process.env.DB_PORT) || 3306,
      connectTimeout: 10000, // 10 seconds timeout
      waitForConnections: true,
      queueLimit: 0,
    };

    // Add SSL for public connections (external proxies)
    if (process.env.DB_HOST.includes("proxy.rlwy.net")) {
      connectionConfig.ssl = { rejectUnauthorized: false };
    }

    db = await mysql.createConnection(connectionConfig);

    // Create table if not exists
    await db.execute(`
      CREATE TABLE IF NOT EXISTS items (
        id INT AUTO_INCREMENT PRIMARY KEY,
        name VARCHAR(255) NOT NULL,
        description TEXT,
        status VARCHAR(50) DEFAULT 'active',
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
      )
    `);

    dbConnected = true;
    console.log("✅ Database connected and table created successfully");
  } catch (error) {
    dbConnected = false;
    console.error("❌ Database connection error:", error.message);
    console.error("");
    console.error("🔍 Troubleshooting:");
    console.error("   1. Check if MySQL service is running");
    console.error("   2. Verify .env file has correct credentials");
    console.error(
      "   3. Ensure database exists: CREATE DATABASE " + process.env.DB_NAME
    );
    console.error("   4. Check firewall/network settings");
    console.error("   5. If using Railway MySQL, verify connection string");
    console.error("");
    console.warn(
      "⚠️  Server will continue running but database operations will fail"
    );
  }
}

// Initialize database on startup
initDatabase();

// Routes - CRUD Operations

// Middleware to check database connection
function checkDbConnection(req, res, next) {
  if (!dbConnected || !db) {
    return res.status(503).json({
      success: false,
      error:
        "Database not connected. Please check your .env configuration and ensure MySQL is running.",
    });
  }
  next();
}

// GET all items
app.get("/api/items", checkDbConnection, async (req, res) => {
  try {
    const [rows] = await db.execute(
      "SELECT * FROM items ORDER BY created_at DESC"
    );
    res.json({ success: true, data: rows });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});

// GET single item by ID
app.get("/api/items/:id", checkDbConnection, async (req, res) => {
  try {
    const [rows] = await db.execute("SELECT * FROM items WHERE id = ?", [
      req.params.id,
    ]);
    if (rows.length === 0) {
      return res.status(404).json({ success: false, error: "Item not found" });
    }
    res.json({ success: true, data: rows[0] });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});

// CREATE new item
app.post("/api/items", checkDbConnection, async (req, res) => {
  try {
    const { name, description, status } = req.body;

    if (!name) {
      return res
        .status(400)
        .json({ success: false, error: "Name is required" });
    }

    const [result] = await db.execute(
      "INSERT INTO items (name, description, status) VALUES (?, ?, ?)",
      [name, description || "", status || "active"]
    );

    const [newItem] = await db.execute("SELECT * FROM items WHERE id = ?", [
      result.insertId,
    ]);
    res.status(201).json({ success: true, data: newItem[0] });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});

// UPDATE item
app.put("/api/items/:id", checkDbConnection, async (req, res) => {
  try {
    const { name, description, status } = req.body;

    // Check if item exists
    const [existing] = await db.execute("SELECT * FROM items WHERE id = ?", [
      req.params.id,
    ]);
    if (existing.length === 0) {
      return res.status(404).json({ success: false, error: "Item not found" });
    }

    await db.execute(
      "UPDATE items SET name = ?, description = ?, status = ? WHERE id = ?",
      [
        name || existing[0].name,
        description !== undefined ? description : existing[0].description,
        status || existing[0].status,
        req.params.id,
      ]
    );

    const [updated] = await db.execute("SELECT * FROM items WHERE id = ?", [
      req.params.id,
    ]);
    res.json({ success: true, data: updated[0] });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});

// DELETE item
app.delete("/api/items/:id", checkDbConnection, async (req, res) => {
  try {
    const [existing] = await db.execute("SELECT * FROM items WHERE id = ?", [
      req.params.id,
    ]);
    if (existing.length === 0) {
      return res.status(404).json({ success: false, error: "Item not found" });
    }

    await db.execute("DELETE FROM items WHERE id = ?", [req.params.id]);
    res.json({ success: true, message: "Item deleted successfully" });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});

// Health check
app.get("/api/health", async (req, res) => {
  if (!dbConnected || !db) {
    return res.status(503).json({
      success: false,
      error: "Database not connected",
      details:
        "Please check your .env configuration and ensure MySQL is running",
    });
  }

  try {
    await db.execute("SELECT 1");
    res.json({ success: true, message: "Database connection healthy" });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: "Database connection failed",
      details: error.message,
    });
  }
});

app.listen(PORT, () => {
  console.log("");
  console.log("🚀 Server is running on port", PORT);
  console.log(`📱 Open http://localhost:${PORT} in your browser`);
  console.log("");
  if (!dbConnected) {
    console.log(
      "⚠️  Note: Database is not connected. Please configure .env file."
    );
  } else {
    console.log("✅ Database connected successfully!");
  }
  console.log("");
});
