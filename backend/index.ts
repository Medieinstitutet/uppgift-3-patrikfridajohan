import express, { Request, Response, NextFunction } from "express";
import dotenv from "dotenv";
import pool from "./mysql";

import apiRouter from "./routes/api";
import stripeRouter from "./stripe/stripeRouter";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json()); // Middleware to parse JSON bodies

app.use((req: Request, res: Response, next: NextFunction) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  next();
});

// Define your API routes
app.use("/", apiRouter);
app.use("/stripe", stripeRouter);

async function testMySQLConnection() {
  try {
    const [rows, fields]: [any[], any] = await pool.query(
      "SELECT * FROM data_users where id = 2 LIMIT 1"
    );

    console.log("MySQL connection works!");
  } catch (error) {
    console.error("Error testing MySQL connection:", error);
  }
}

testMySQLConnection();

app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
  // Error handling middleware
  console.error(err.stack);
  res.status(500).send("Something broke!");
});

app.listen(PORT, () => {
  // Start the server
  console.log(`Server is running on http://localhost:${PORT}`);
});
