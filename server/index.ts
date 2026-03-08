import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import fileUpload from "express-fileupload";
import connectDB from "./config/database";
import cloudinaryConnect from "./config/cloudinary";
import userRoutes from "./routes/userRoutes";
import articleRoutes from "./routes/articleRoutes";
import adminRoutes from "./routes/adminRoutes";
import os from "os";

// Load environment variables
dotenv.config();

// Connect to Database
connectDB();
// Connect to Cloudinary
cloudinaryConnect();

const app = express();
const PORT = Number(process.env.PORT) || 5000;
const HOST = "0.0.0.0";

// middlewares
app.use(
  cors({
    origin: process.env.CLIENT_URL || "http://localhost:3000",
    credentials: true,
  })
);
app.use(express.json());
app.use(cookieParser());
app.use(
  fileUpload({
    useTempFiles: true,
    tempFileDir: os.tmpdir(),
  })
);

// routes
app.use("/api/v1/auth", userRoutes);
app.use("/api/v1/articles", articleRoutes);
app.use("/api/v1/admin", adminRoutes);

// health route
app.get("/", (req, res) => {
  res.json({ success: true, message: "Backend is running" });
});

// Error handling middleware
app.use(
  (
    err: any,
    req: express.Request,
    res: express.Response,
    next: express.NextFunction
  ) => {
    console.error(err.stack);
    res.status(500).json({
      success: false,
      message: err.message || "Internal Server Error",
    });
  }
);

app.listen(PORT, HOST, () => {
  console.log(` Server running on http://${HOST}:${PORT}`);
});

export default app;
