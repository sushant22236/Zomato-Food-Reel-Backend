import express from "express";
import cookieParser from "cookie-parser";
import { connectDB } from "./config/db.connection.js";
import apiroute from "./routes/route.js";

const app = express();

connectDB();

app.use(express.json());
app.use(cookieParser());

app.use("/api", apiroute);

export default app;
