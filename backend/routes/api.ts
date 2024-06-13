import express, { Request, Response, NextFunction } from "express";
import bcrypt from "bcrypt";
import pool from "../mysql";
const cookieParser = require("cookie-parser");
import { createSession } from "./authUtils";

const router = express.Router();

router.use(cookieParser());

// POST /auth/login - User login
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
      res.cookie("activesubscriptionid", user.activesubscriptionid);

      // Redirect user based on access ID
      if (user.accessid === 1) {
        res.send("/user/dashboard");
      } else if (user.accessid === 2) {
        res.send("/admin/dashboard");
      } else {
        res.status(401).json({ error: "Invalid access ID" });
      }
    } catch (error) {
      console.error("Error logging in:", error);
      res.status(500).json({ error: "Internal server error" });
    }
  }
);

// POST /api/auth/register - User registration
router.post(
  "/auth/register",
  async (req: Request, res: Response, next: NextFunction) => {
    const { firstname, lastname, email, password } = req.body;

    try {
      // Hash the password
      const hashedPassword = await bcrypt.hash(password, 10);

      // Insert user into database
      await pool.query(
        "INSERT INTO data_users (firstname, lastname, email, password) VALUES (?, ?, ?, ?)",
        [firstname, lastname, email, hashedPassword]
      );

      // Return success message
      res.status(201).json({ message: "User registered successfully" });
    } catch (error) {
      console.error("Error registering user:", error);
      res.status(500).json({ error: "Internal server error" });
    }
  }
);

// POST /auth/logout - User logout
router.post(
  "/auth/logout",
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      // Clear session information

      res.clearCookie("sessionID");
      res.clearCookie("userID");
      res.clearCookie("accessID");
      res.clearCookie("activesubscriptionid");

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

// Check if the email already exists in users
router.get('/checkemail/:email', async (req: Request, res: Response) => {
  try {
    const email = req.params.email;
    const query = `SELECT COUNT(*) AS count FROM data_users WHERE email = ?`;

    const [results]: [any[], any] = await pool.query(query, [email]);

    if (results.length > 0) {
      const emailExists = results[0].count > 0;
      res.json({ exists: emailExists });
    } else {
      res.status(404).json({ error: 'User not found' });
    }
  } catch (error) {
    console.error('Error checking email:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});


// GET /subscription/:subscriptionId - Get subscription data by subscription ID
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

// GET /subscriptiondata/:Id - Get active subscription data by subscription ID
router.get("/activesubscriptiondata/:Id", async (req, res) => {
  try {
    const { Id } = req.params;
    const [subscriptionRows]: [any[], any] = await pool.query(
      "SELECT * FROM data_users_subscriptions WHERE active = 1 AND uid = ?",
      [Id]
    );
    if (subscriptionRows.length > 0) {
      const activesubscriptionData = subscriptionRows[0];
      return res.json(activesubscriptionData);
    } else {
      return res.status(404).json({ error: "Subscription not found" });
    }
  } catch (error) {
    console.error("Error fetching subscription data:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});


// GET /auth/subscriptionid - Get the logged-in user's subscription ID - NEW
router.get("/auth/subscriptionid", async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { userId } = req.query;

    const [rows]: [any[], any] = await pool.query(
      "SELECT subscriptionid FROM data_users_subscriptions WHERE uid = ? AND active = 1",
      [userId]
    );

    if (rows.length > 0) {
      const subscriptionId = rows[0].subscriptionid;
      return res.json({ subscriptionId });
    } else {
      return res.status(404).json({ error: "No active subscription found for the user" });
    }
  } catch (error) {
    console.error("Error fetching subscription ID:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});
// GET /subscriptions - Get all subscription plans
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


// GET /articletitles - Get all article titles
router.get("/articletitles", async (req, res) => {
  try {
    const [articleRows]: [any[], any] = await pool.query(
      "SELECT id, title, added FROM data_articles WHERE active = 1 ORDER BY added DESC"
    );
    return res.json(articleRows);
  } catch (error) {
    console.error("Error fetching article titles:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

// GET /articles - Get all articles for the logged in user
// router.get("/articles", async (req: Request, res: Response, next: NextFunction) => {
//     try {
//       const activesubscriptionid = req.cookies.activesubscriptionid;
//       const [rows]: [any[], any] = await pool.query(
//         "SELECT * FROM data_articles WHERE subscriptionid = ?", [activesubscriptionid]
//       );
//       res.json(rows);
//     } catch (error) {
//       console.error("Error fetching data:", error);
//       res.status(500).json({ error: "Internal server error" });
//     }
//   }
// );

// GET /articlesforme - Get all articles for logged in user - NEW
router.get("/articlesforme/:activesubscriptionid", async (req, res) => {
  try {
    const { activesubscriptionid } = req.params;
    const [articleRows]: [any[], any] = await pool.query(
      "SELECT * FROM data_articles WHERE subscriptionid <= ? ORDER BY added DESC", [activesubscriptionid]
    );

    if (articleRows.length > 0) {
      // Return latest articles that match the subscription ID and below for user
      return res.json(articleRows);
    } else {
      return res.status(404).json({ error: "Articles not found" });
    }
  } catch (error) {
    console.error("Error fetching articles:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

// GET /articles - Get latest articles for the logged in user
router.get("/latestarticlesforme/:activesubscriptionid", async (req, res) => {
  try {
    const { activesubscriptionid } = req.params;
    const [articleRows]: [any[], any] = await pool.query(
      "SELECT * FROM data_articles WHERE subscriptionid <= ? ORDER BY added DESC LIMIT 3", [activesubscriptionid]
    );

    if (articleRows.length > 0) {
      // Return latest articles that match the subscription ID and below for user
      return res.json(articleRows);
    } else {
      return res.status(404).json({ error: "Articles not found" });
    }
  } catch (error) {
    console.error("Error fetching articles:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

// GET /articlesforadmin - Get all articles for admin
router.get("/articlesforadmin", async (req, res) => {
  try {
    const [articleRows]: [any[], any] = await pool.query(
      "SELECT * FROM data_articles ORDER BY added DESC"
    );

    if (articleRows.length > 0) {
      // Return all articles for admin
      return res.json(articleRows);
    } else {
      return res.status(404).json({ error: "Articles not found" });
    }
  } catch (error) {
    console.error("Error fetching articles:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

// GET /article/:id - Get a single article by ID
router.get("/article/:id", async (req, res) => {
  try {
    const { id } = req.params;

    const [articleRows]: [any[], any] = await pool.query(
      "SELECT * FROM data_articles WHERE id = ?", [id]
    );

    if (articleRows.length > 0) {
      return res.json(articleRows[0]);
    } else {
      return res.status(404).json({ error: "Article not found" });
    }
  } catch (error) {
    console.error("Error fetching article:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});


// POST /admin/create-news-article - Create a new news article
router.post('/admin/create-news-article', async (req, res) => {
  try {
    // Extract article data from request body
    const { title, subscriptionid, shortInfo, longInfo } = req.body;

    // Capitalize the first letter of title, shortInfo, and longInfo
    const capitalizedTitle = title.charAt(0).toUpperCase() + title.slice(1);
    const capitalizedShortInfo = shortInfo.charAt(0).toUpperCase() + shortInfo.slice(1);
    const capitalizedLongInfo = longInfo.charAt(0).toUpperCase() + longInfo.slice(1);

    // Save the article to the database
    const query = 'INSERT INTO data_articles (title, subscriptionid, shortinfo, longinfo) VALUES (?, ?, ?, ?)';
    await pool.query(query, [capitalizedTitle, subscriptionid, capitalizedShortInfo, capitalizedLongInfo]);

    // Respond with success message
    return res.status(201).json({ message: 'Article created successfully' });
  } catch (error) {
    console.error('Error creating news article:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});


router.get("/user", async (req: Request, res: Response, next: NextFunction) => {
  try {
    const [rows]: [any[], any] = await pool.query(
      "SELECT * FROM data_users WHERE activesubscriptionid =     1"
    );
    res.json({ data: rows });
  } catch (error) {
    console.error("Error fetching data:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

export default router;
