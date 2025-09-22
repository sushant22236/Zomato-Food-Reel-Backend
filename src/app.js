import express from "express";
import cookieParser from "cookie-parser";
import { connectDB } from "./config/db.connection.js";
import apiroute from "./routes/route.js";
import foodroute from "./routes/food.route.js";
import cors from "cors";

const app = express();
app.use(express.json());
app.use(cors({ origin: "http://localhost:5173", credentials: true }));

connectDB();

app.use(express.json());
app.use(cookieParser());

app.use("/api", apiroute);

app.use("/food", foodroute);

export default app;
