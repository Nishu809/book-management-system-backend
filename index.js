import express from "express";
import dotenv from "dotenv";
import mongoose from "mongoose";
import path from "path";
import booksRoute from "./routes/booksRoute.js";
import cors from "cors";
import { fileURLToPath } from "url";
dotenv.config();
const app = express();

app.use(express.json());
// Serve frontend dist folder
// Needed for __dirname in ES modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

app.use(cors());
// Serve frontend dist
app.use(express.static(path.join(__dirname, "../frontend/dist")));

app.get("/", (request, response) => {
  console.log(request);
  return response.status(234).send("Welcome To MERN Stack Tutorial");
});

app.use("/books", booksRoute);

// Handle SPA routes (React Router / Vue Router, etc.)
app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "../frontend/dist/index.html"));
});
const PORT = process.env.PORT;
const url = process.env.MONGODB_URL;
mongoose
  .connect(url)
  .then(() => {
    console.log("App connected to database");
    app.listen(PORT, () => {
      console.log(`App is listening to port: ${PORT}`);
    });
  })
  .catch((error) => {
    console.log(error, "------------errorr----------------");
  });
