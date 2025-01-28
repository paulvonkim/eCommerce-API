import express from "express";
import dotenv from "dotenv";
dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;
const NEON = process.env.NEON;
app.get("/", (req, res) => res.send("Hello, World!"));

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
