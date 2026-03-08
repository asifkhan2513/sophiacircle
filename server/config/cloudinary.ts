import { v2 as cloudinary } from "cloudinary";

const cloudinaryConnect = async (): Promise<void> => {
  try {
    const { CLOUD_NAME, API_KEY, API_SECRET } = process.env;

    if (!CLOUD_NAME || !API_KEY || !API_SECRET) {
      throw new Error("Missing Cloudinary environment variables");
    }

    cloudinary.config({
      cloud_name: CLOUD_NAME,
      api_key: API_KEY,
      api_secret: API_SECRET,
    });

    await cloudinary.api.ping();

    console.log("Cloudinary connected successfully");
  } catch (error: unknown) {
    if (error instanceof Error) {
      console.error("Error connecting to Cloudinary:", error.message);
    } else {
      console.error("Error connecting to Cloudinary:", error);
    }
    throw error;
  }
};

export default cloudinaryConnect;
