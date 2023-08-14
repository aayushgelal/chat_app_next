import express from "express";
import authRouter from "./routes/AuthRoutes.js";
import messageRouter from "./routes/MessageRoutes.js";

import cors from "cors";
import dotenv from "dotenv";
import path from "path";

import { app, server } from "./routes/Socket.js";

import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);

export const __dirname = path.dirname(__filename);

dotenv.config();

app.use(cors({ origin: "*" }));
// Parse JSON bodies (Equivalent to previous body-parser.json())
app.use(express.json());

// Parse URL-encoded bodies (Equivalent to previous body-parser.urlencoded())
app.use(express.urlencoded({ extended: true }));
app.use("/auth", authRouter);
app.use("/chat", messageRouter);
app.use(
  "/uploads/images",
  express.static(path.join(__dirname + "/uploads/images"))
);
app.use("/", (req, res) => {
  res.send("Server is runing");
});
server.listen(process.env.PORT, () => {
  console.log(`⚡️[server]: Server is running at 4000`);
});
