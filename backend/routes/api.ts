import express, { Request, Response, NextFunction } from "express";
import bcrypt from "bcrypt";
import pool from "../mysql";
const cookieParser = require("cookie-parser");
import { createSession } from "./authUtils";

const router = express.Router();

router.use(cookieParser());

// Made example to get started - Johan

// // POST /api/auth/login - User login
router.post(
  "/auth/login",
  async (req: Request, res: Response, next: NextFunction) => {
    const { email, password } = req.body;
    try {
      // Check if user with provided email exists
      const [rows]: [any[], any] = await pool.query(
        "SELECT * FROM data_users WHERE email = ?",
        [email]
      );
      if (rows.length === 0) {
        return res.status(401).json({ error: "Invalid credentials" });
      }

      // Check if password is correct
      const user = rows[0];
      const passwordMatch = await bcrypt.compare(password, user.password);
      if (!passwordMatch) {
        return res.status(401).json({ error: "Invalid credentials" });
      }

      // Set session cookie
      const session = await createSession(user.id);
      res.cookie("sessionID", session.id);
      res.cookie("userID", user.id);
      res.cookie("accessID", user.accessid);

      // Redirect user based on access ID
      if (user.accessid === 1) {
        res.redirect("/user/dashboard");
      } else if (user.accessid === 2) {
        res.redirect("/admin/admindashboard");
      } else {
        res.status(401).json({ error: "Invalid access ID" });
      }

    }catch (error) {
      console.error("Error logging in:", error);
      res.status(500).json({ error: "Internal server error" });
    }
  }
);

// // POST /api/auth/register - User registration
router.post(
  "/auth/register",
  async (req: Request, res: Response, next: NextFunction) => {
    const { email, password } = req.body;

    try {
      // Check if email already exists
      const [emailRows]: [any[], any] = await pool.query(
        "SELECT * FROM data_users WHERE email = ?",
        [email]
      );
      if (emailRows.length > 0) {
        return res.status(400).json({ error: "Email already exists" });
      }

      // Hash the password
      const hashedPassword = await bcrypt.hash(password, 10);

      // Insert user into database
      await pool.query(
        "INSERT INTO data_users (email, password) VALUES (?, ?)",
        [email, hashedPassword]
      );

      // Return success message
      res.status(201).json({ message: "User registered successfully" });
    } catch (error) {
      console.error("Error registering user:", error);
      res.status(500).json({ error: "Internal server error" });
    }
  }
);

// POST /api/auth/logout - User logout
router.post(
  "/auth/logout",
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      // Clear session information

      res.clearCookie("sessionID");
      res.clearCookie("userID");
      res.clearCookie("accessID");

      res.status(200).json({ message: "Logout successful" });
    } catch (error) {
      console.error("Error logging out:", error);
      res.status(500).json({ error: "Internal server error" });
    }
  }
);

// Get all data of the current logged in user
router.get("/user/:userId", async (req: Request, res: Response) => {
    try {
        const { userId } = req.params;
        const [userRows]: [any[], any] = await pool.query(
            "SELECT * FROM data_users WHERE id = ?",
            [userId]
        );
        if (userRows.length > 0) {
            const userData = userRows[0];
            return res.json(userData);
        } else {
            return res.status(404).json({ error: "User not found" });
        }
    } catch (error) {
        console.error("Error fetching user:", error);
        res.status(500).json({ error: "Internal server error" });
    }
});

// GET /api/subscription/:subscriptionId - Get subscription data by subscription ID
router.get("/subscription/:subscriptionId", async (req, res) => {
    try {
        const { subscriptionId } = req.params;
        const [subscriptionRows]: [any[], any] = await pool.query(
            "SELECT * FROM data_subscriptions WHERE id = ?",
            [subscriptionId]
        );
        if (subscriptionRows.length > 0) {
            const subscriptionData = subscriptionRows[0];
            return res.json(subscriptionData);
        } else {
            return res.status(404).json({ error: "Subscription not found" });
        }
    } catch (error) {
        console.error("Error fetching subscription data:", error);
        res.status(500).json({ error: "Internal server error" });
    }
});

// GET /api/subscription/plans - Get all subscription plans
router.get("/subscriptions", async (req, res) => {
    try {
        const [planRows]: [any[], any] = await pool.query(
            "SELECT * FROM data_subscriptions"
        );
        return res.json(planRows);
    } catch (error) {
        console.error("Error fetching subscription plans:", error);
        res.status(500).json({ error: "Internal server error" });
    }
});

// // GET /api/example - Protected endpoint
 router.get('/articles', async (req: Request, res: Response, next: NextFunction) => {
    try {
        const [rows]: [any[], any] = await pool.query('SELECT * FROM data_articles');
         res.json(rows);
     } catch (error) {
         console.error('Error fetching data:', error);
         res.status(500).json({ error: 'Internal server error' });
     }
 });
 router.get('/user', async (req: Request, res: Response, next: NextFunction) => {
    try {
        const [rows]: [any[], any] = await pool.query('SELECT * FROM data_users WHERE activesubscriptionid =     1');
         res.json({ data: rows });
     } catch (error) {
         console.error('Error fetching data:', error);
         res.status(500).json({ error: 'Internal server error' });
     }
 });

// // POST (Add to DB) /api/data - Protected endpoint
// router.post('/data', async (req: Request, res: Response, next: NextFunction) => {
//     const { body } = req;
//     try {
//         // Process request body and save data to database
//         // Example: await pool.query('INSERT INTO example_table (column1, column2) VALUES (?, ?)', [body.column1, body.column2]);
//         res.json({ message: 'Data saved successfully' });
//     } catch (error) {
//         console.error('Error saving data:', error);
//         res.status(500).json({ error: 'Internal server error' });
//     }
// });

// // PUT (Update DB) /api/data/:id - Protected endpoint
// router.put('/data/:id', async (req: Request, res: Response, next: NextFunction) => {
//     const { id } = req.params;
//     const { body } = req;
//     try {
//         // Update data with specified id in the database
//         // Example: await pool.query('UPDATE example_table SET column1 = ?, column2 = ? WHERE id = ?', [body.column1, body.column2, id]);
//         res.json({ message: `Data with id ${id} updated successfully` });
//     } catch (error) {
//         console.error('Error updating data:', error);
//         res.status(500).json({ error: 'Internal server error' });
//     }
// });

// // DELETE (Remove from DB) /api/data/:id - Protected endpoint
// router.delete('/data/:id', async (req: Request, res: Response, next: NextFunction) => {
//     const { id } = req.params;
//     try {
//         // Delete data with specified id from the database
//         // Example: await pool.query('DELETE FROM example_table WHERE id = ?', [id]);
//         res.json({ message: `Data with id ${id} deleted successfully` });
//     } catch (error) {
//         console.error('Error deleting data:', error);
//         res.status(500).json({ error: 'Internal server error' });
//     }
// });

export default router;