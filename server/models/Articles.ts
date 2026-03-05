import mongoose, { Schema, Document, Model } from "mongoose";
import User from "./User";
export interface IArticles extends Document {
  image: String;
  title: String;
  description: String;
  category: String;
  viewCount: Number;
  author: mongoose.Types.ObjectId;
  tags: String[];
  isVerified: Boolean;
  comments: String[];
}

const ArticlesSchema = new Schema<IArticles>(
  {
    image: {
      type: String,
      required: true,
    },
    title: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    category: {
      type: String,
      required: true,
      default: "General",
    },
    viewCount: {
      type: Number,
      default: 0,
    },
    tags: {
      type: [String],
      default: [],
    },
    isVerified: {
      type: Boolean,
      default: false,
    },
    comments: {
      type: [String],
      default: [],
    },
    author: {
      type: mongoose.Types.ObjectId,
      ref: User,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

const Articles = mongoose.model<IArticles, Model<IArticles>>(
  "Articles",
  ArticlesSchema
);

export default Articles;
