import { Request, Response } from "express";
import User from "../models/User";
import Articles from "../models/Articles";
import { uploadImageToCloudinary } from "../utils/imageUploader";
import { UploadedFile } from "express-fileupload";
import {
  getCache,
  setCache,
  deleteCache,
  deleteCachePattern,
} from "../lib/cache";

export const createArticles = async (req: Request, res: Response) => {
  try {
    const { title, description, tags, category } = req.body;
    const user = await User.findById(req.user?.id);

    if (!user) {
      return res
        .status(404)
        .json({ success: false, message: "User not found" });
    }

    if (!req.files || !req.files.image) {
      return res
        .status(400)
        .json({ success: false, message: "Image file is required" });
    }

    const imageFile = req.files.image as UploadedFile;

    const uploadDetails = await uploadImageToCloudinary(
      imageFile,
      process.env.FOLDER_NAME || "articles"
    );

    if (!uploadDetails || !uploadDetails.secure_url) {
      return res.status(500).json({
        success: false,
        message: "Failed to upload image to Cloudinary",
      });
    }

    let tagsArray = [];
    if (tags) {
      try {
        tagsArray = typeof tags === "string" ? JSON.parse(tags) : tags;
      } catch (e) {
        tagsArray = [tags];
      }
    }

    const article = await Articles.create({
      image: uploadDetails.secure_url,
      title,
      description,
      category: category || "General",
      tags: Array.isArray(tagsArray) ? tagsArray : [tagsArray],
      author: user._id,
    });

    // Invalidate main list cache
    await deleteCachePattern("all_articles_*");

    res.status(201).json({ success: true, article });
  } catch (error: any) {
    console.error("Article Creation Error:", error);
    res.status(500).json({ success: false, message: error.message });
  }
};

export const updateArticles = async (req: Request, res: Response) => {
  try {
    const { title, description, tags, category } = req.body;
    const user = await User.findById(req.user?.id);

    if (!user) {
      return res
        .status(404)
        .json({ success: false, message: "User not found" });
    }

    const article = await Articles.findById(req.params.id);
    if (!article) {
      return res
        .status(404)
        .json({ success: false, message: "Article not found" });
    }

    // Check if user is the author or an admin
    if (
      article.author.toString() !== user._id.toString() &&
      user.role !== "admin"
    ) {
      return res.status(403).json({
        success: false,
        message: "Not authorized to update this article",
      });
    }

    let imageUrl = article.image;
    if (req.files && req.files.image) {
      const imageFile = req.files.image as UploadedFile;
      const uploadDetails = await uploadImageToCloudinary(
        imageFile,
        process.env.FOLDER_NAME || "articles"
      );
      if (uploadDetails && uploadDetails.secure_url) {
        imageUrl = uploadDetails.secure_url;
      }
    }

    let tagsArray = article.tags;
    if (tags) {
      try {
        tagsArray = typeof tags === "string" ? JSON.parse(tags) : tags;
      } catch (e) {
        tagsArray = [tags];
      }
    }

    const updatedArticle = await Articles.findByIdAndUpdate(
      req.params.id,
      {
        title: title || article.title,
        description: description || article.description,
        category: category || article.category,
        tags: Array.isArray(tagsArray) ? tagsArray : [tagsArray],
        image: imageUrl,
      },
      { new: true }
    );

    // Invalidate caches
    await deleteCachePattern("all_articles_*");
    await deleteCache(`article:${req.params.id}`);

    res.status(200).json({ success: true, article: updatedArticle });
  } catch (error: any) {
    res.status(500).json({ success: false, message: error.message });
  }
};

export const deleteArticles = async (req: Request, res: Response) => {
  try {
    const user = await User.findById(req.user?.id);
    if (!user) {
      return res
        .status(404)
        .json({ success: false, message: "User not found" });
    }

    const article = await Articles.findById(req.params.id);
    if (!article) {
      return res
        .status(404)
        .json({ success: false, message: "Article not found" });
    }

    // Check if user is the author or an admin
    if (
      article.author.toString() !== user._id.toString() &&
      user.role !== "admin"
    ) {
      return res.status(403).json({
        success: false,
        message: "Not authorized to delete this article",
      });
    }

    await Articles.findByIdAndDelete(req.params.id);

    // Invalidate caches
    await deleteCachePattern("all_articles_*");
    await deleteCache(`article:${req.params.id}`);

    res
      .status(200)
      .json({ success: true, message: "Article deleted successfully" });
  } catch (error: any) {
    res.status(500).json({ success: false, message: error.message });
  }
};

export const getAllArticles = async (req: Request, res: Response) => {
  try {
    const page = Math.max(parseInt(req.query.page as string) || 1, 1);
    const limit = Math.max(parseInt(req.query.limit as string) || 10, 1);

    const skip = (page - 1) * limit;

    // caching with pagination
    const cacheKey = `all_articles_page_${page}_limit_${limit}`;
    const cachedData = await getCache<any>(cacheKey);

    if (cachedData) {
      return res
        .status(200)
        .json({ success: true, ...cachedData, fromCache: true });
    }

    const articles = await Articles.find()
      .populate("author", "name email")
      .skip(skip)
      .limit(limit)
      .sort({ createdAt: -1 });

    const totalArticles = await Articles.countDocuments();

    const responseData = {
      articles,
      page,
      limit,
      totalArticles,
      totalPages: Math.ceil(totalArticles / limit),
      data: articles,
    };

    // Cache for 1 hour
    await setCache(cacheKey, responseData, { ttlSeconds: 3600 });

    res.status(200).json({ success: true, ...responseData });
  } catch (error: any) {
    res.status(500).json({ success: false, message: error.message });
  }
};

export const getMyArticles = async (req: Request, res: Response) => {
  try {
    const user = await User.findById(req.user?.id);
    if (!user) {
      return res
        .status(404)
        .json({ success: false, message: "User not found" });
    }

    const articles = await Articles.find({ author: user._id });
    res.status(200).json({ success: true, articles });
  } catch (error: any) {
    res.status(500).json({ success: false, message: error.message });
  }
};

export const getArticleById = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const cacheKey = `article:${id}`;

    const cachedArticle = await getCache<any>(cacheKey);
    if (cachedArticle) {
      return res
        .status(200)
        .json({ success: true, article: cachedArticle, fromCache: true });
    }

    const article = await Articles.findById(id).populate(
      "author",
      "name email city country"
    );
    if (!article) {
      return res
        .status(404)
        .json({ success: false, message: "Article not found" });
    }

    // Cache for 1 hour
    await setCache(cacheKey, article, { ttlSeconds: 3600 });

    res.status(200).json({ success: true, article });
  } catch (error: any) {
    res.status(500).json({ success: false, message: error.message });
  }
};
