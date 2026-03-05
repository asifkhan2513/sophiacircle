import { Request, Response } from "express";
import User from "../models/User";
import Articles from "../models/Articles";

export const getAllUsers = async (req: Request, res: Response) => {
  try {
    const users = await User.find().select("-password");
    res.status(200).json({
      success: true,
      users,
    });
  } catch (error: any) {
    res.status(500).json({ success: false, message: error.message });
  }
};

export const getAdminStats = async (req: Request, res: Response) => {
  try {
    const userCount = await User.countDocuments();
    const articleCount = await Articles.countDocuments();

    // Get latest 5 users
    const latestUsers = await User.find()
      .select("-password")
      .sort({ createdAt: -1 })
      .limit(5);

    // Get latest 5 articles
    const latestArticles = await Articles.find()
      .populate("author", "name email")
      .sort({ createdAt: -1 })
      .limit(5);

    res.status(200).json({
      success: true,
      stats: {
        userCount,
        articleCount,
      },
      latestUsers,
      latestArticles,
    });
  } catch (error: any) {
    res.status(500).json({ success: false, message: error.message });
  }
};

export const deleteUserByAdmin = async (req: Request, res: Response) => {
  try {
    const { userId } = req.params;

    const user = await User.findById(userId);
    if (!user) {
      return res
        .status(404)
        .json({ success: false, message: "User not found" });
    }

    if (user.role === "admin") {
      return res
        .status(403)
        .json({ success: false, message: "Cannot delete another admin" });
    }

    // Delete user's articles first
    await Articles.deleteMany({ author: userId });

    // Delete user
    await User.findByIdAndDelete(userId);

    res
      .status(200)
      .json({
        success: true,
        message: "User and their articles deleted successfully",
      });
  } catch (error: any) {
    res.status(500).json({ success: false, message: error.message });
  }
};
