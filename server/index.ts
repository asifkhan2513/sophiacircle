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

dotenv.config();

const app = express();
const PORT = Number(process.env.PORT) || 10000;

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
app.get("/", (_req, res) => {
  res.json({ success: true, message: "Backend is running" });
});

// error handling middleware
app.use(
  (
    err: unknown,
    _req: express.Request,
    res: express.Response,
    _next: express.NextFunction
  ) => {
    if (err instanceof Error) {
      console.error(err.stack);
      res.status(500).json({
        success: false,
        message: err.message,
      });
    } else {
      console.error("Unknown error:", err);
      res.status(500).json({
        success: false,
        message: "Internal Server Error",
      });
    }
  }
);

// Start listening immediately so Render can detect the open port.
// DB and Cloudinary connect in the background after the server is up.
app.listen(PORT, "0.0.0.0", () => {
  console.log(`Server running on port ${PORT}`);
});

const initServices = async (): Promise<void> => {
  try {
    await connectDB();
    await cloudinaryConnect();
    console.log("All services connected successfully");
  } catch (error: unknown) {
    if (error instanceof Error) {
      console.error("Service initialization error:", error.message);
    } else {
      console.error("Service initialization error:", error);
    }
    process.exit(1);
  }
};

initServices();

export default app;
