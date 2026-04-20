import express from "express";
import cors from "cors";
import helmet from "helmet";
import dotenv from "dotenv";
import pg from "pg";

dotenv.config();

const app = express();
const port = process.env.PORT || 8080;

const allowedOrigins = (process.env.CLIENT_URL || "")
  .split(",")
  .map((origin) => origin.trim())
  .filter(Boolean);

const pool = new pg.Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: process.env.NODE_ENV === "production" ? { rejectUnauthorized: false } : false,
});

app.use(helmet());
app.use(
  cors({
    origin(origin, callback) {
      if (!origin || allowedOrigins.length === 0 || allowedOrigins.includes(origin)) {
        return callback(null, true);
      }
      return callback(new Error("CORS blocked for this origin"));
    },
  })
);
app.use(express.json());

app.get("/health", async (_req, res) => {
  try {
    await pool.query("SELECT 1");
    res.json({ ok: true });
  } catch (error) {
    console.error(error);
    res.status(500).json({ ok: false, error: "Database health check failed." });
  }
});

app.post("/waitlist", async (req, res) => {
  const { firstName, lastName, email, phone, city, joiningAs, interest } = req.body;

  if (!firstName || !lastName || !email) {
    return res.status(400).json({ error: "First name, last name, and email are required." });
  }

  try {
    const query = `
      INSERT INTO waitlist_entries
        (first_name, last_name, email, phone, city, joining_as, interest)
      VALUES
        ($1, $2, $3, $4, $5, $6, $7)
      RETURNING id, created_at;
    `;

    const values = [
      firstName.trim(),
      lastName.trim(),
      email.trim().toLowerCase(),
      phone?.trim() || null,
      city?.trim() || null,
      joiningAs?.trim() || null,
      interest?.trim() || null,
    ];

    const result = await pool.query(query, values);

    return res.status(201).json({
      message: "Joined waitlist successfully.",
      entry: result.rows[0],
    });
  } catch (error) {
    console.error(error);

    if (error.code === "23505") {
      return res.status(409).json({ error: "This email is already on the waitlist." });
    }

    return res.status(500).json({ error: "Server error while saving waitlist entry." });
  }
});

app.use((error, _req, res, _next) => {
  console.error(error);
  res.status(500).json({ error: "Unexpected server error." });
});

app.listen(port, () => {
  console.log(`Local Man API listening on port ${port}`);
});
