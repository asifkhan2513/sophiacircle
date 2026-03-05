import { Request, Response } from "express";
import jwt from "jsonwebtoken";
import otpGenerator from "otp-generator";
import User from "../models/User";
import OTP from "../models/OTP";

// Helper to generate JWT
const generateToken = (id: string) => {
  return jwt.sign({ id }, process.env.JWT_SECRET as string, {
    expiresIn: "30d",
  });
};
interface SendOtpRequestBody {
  email: string;
}

export const signup = async (req: Request, res: Response) => {
  const { name, email, password, otp } = req.body;

  try {
    // Check if all fields are provided
    if (!name || !email || !password || !otp) {
      return res.status(403).json({
        success: false,
        message: "All fields are required",
      });
    }

    const userExists = await User.findOne({ email });

    if (userExists) {
      return res.status(400).json({ message: "User already exists" });
    }

    // Find the most recent OTP for the email
    const response = await OTP.find({ email }).sort({ createdAt: -1 }).limit(1);

    if (response.length === 0) {
      return res.status(400).json({
        success: false,
        message: "The OTP is not valid",
      });
    } else if (otp !== response[0].otp) {
      return res.status(400).json({
        success: false,
        message: "The OTP is not valid",
      });
    }

    const user = await User.create({
      name,
      email,
      password,
    });

    if (user) {
      res.status(201).json({
        success: true,
        _id: user._id,
        name: user.name,
        email: user.email,
        token: generateToken(user._id.toString()),
      });
    } else {
      res.status(400).json({ success: false, message: "Invalid user data" });
    }
  } catch (error: any) {
    res.status(500).json({ success: false, message: error.message });
  }
};

export const login = async (req: Request, res: Response) => {
  const { email, password } = req.body;

  try {
    // Explicitly select password because select: false was set in model
    const user = await User.findOne({ email }).select("+password");

    if (!user || !(await user.comparePassword(password))) {
      return res
        .status(401)
        .json({ success: false, message: "Invalid email or password" });
    }

    const token = generateToken(user._id.toString());

    res.cookie("jwt", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
      maxAge: 30 * 24 * 60 * 60 * 1000,
    });

    res.json({
      success: true,
      _id: user._id,
      name: user.name,
      email: user.email,
      role: user.role,
      token,
    });
  } catch (error: any) {
    res.status(500).json({ success: false, message: error.message });
  }
};

export const logout = async (req: Request, res: Response) => {
  res.cookie("jwt", "", {
    httpOnly: true,
    expires: new Date(0),
  });
  res.status(200).json({ success: true, message: "Logged out successfully" });
};

export const sendotp = async (
  req: Request<any, any, SendOtpRequestBody>,
  res: Response
) => {
  try {
    const { email } = req.body;

    // --- Input Validation ---
    if (!email) {
      return res.status(400).json({
        success: false,
        message: "Email is required",
      });
    }

    console.log("Sending OTP to email:", email);

    // --- Check for Existing User ---
    // Assuming User.findOne returns a UserDocument or null
    const checkUserPresent = await User.findOne({ email });

    if (checkUserPresent) {
      return res.status(401).json({
        success: false,
        message: "User is Already Registered",
      });
    }

    // --- Generate Unique OTP ---
    let otp: string = otpGenerator.generate(6, {
      upperCaseAlphabets: false,
      lowerCaseAlphabets: false,
      specialChars: false,
    });

    console.log("Generated OTP:", otp);

    // Check if OTP already exists (ensure uniqueness)
    // Assuming OTP.findOne returns an OTPDocument or null
    let result = await OTP.findOne({ otp: otp });

    while (result) {
      otp = otpGenerator.generate(6, {
        upperCaseAlphabets: false,
        lowerCaseAlphabets: false,
        specialChars: false,
      });
      result = await OTP.findOne({ otp: otp });
    }

    console.log("Unique OTP generated:", otp);

    // --- Save OTP to Database (triggers post-save hook to send email) ---
    const otpPayload = { email, otp };
    const otpBody = await OTP.create(otpPayload);

    console.log("OTP saved to database:", otpBody);

    // --- Success Response ---
    return res.status(200).json({
      success: true,
      message: "OTP Sent Successfully",
      // WARNING: Including the raw OTP in the response is a severe security risk.
      // It is kept here to match the original JS code but should be removed in production.
      otp,
    });
  } catch (error) {
    // --- Error Handling ---
    const errorMessage =
      error instanceof Error ? error.message : "An unknown error occurred";

    console.error("SendOTP error:", errorMessage);
    console.error("Full error:", error);

    return res.status(500).json({
      success: false,
      message: "Failed to send OTP. Please try again.",
      error: errorMessage,
    });
  }
};
export const forgetPassword = async (req: Request, res: Response) => {
  try {
    const { email } = req.body;
    const user = await User.findOne({ email });
    if (!user) {
      return res
        .status(404)
        .json({ success: false, message: "User not found" });
    }
    const otp = otpGenerator.generate(6, {
      upperCaseAlphabets: false,
      lowerCaseAlphabets: false,
      specialChars: false,
    });
    await OTP.create({ email, otp });
    res
      .status(200)
      .json({ success: true, message: "OTP sent successfully", otp });
  } catch (error: any) {
    res.status(500).json({ success: false, message: error.message });
  }
};

export const resetPassword = async (req: Request, res: Response) => {
  try {
    const { email, otp, newPassword, confirmNewPassword } = req.body;

    if (newPassword !== confirmNewPassword) {
      return res
        .status(400)
        .json({ success: false, message: "Passwords do not match" });
    }

    const user = await User.findOne({ email });
    if (!user) {
      return res
        .status(404)
        .json({ success: false, message: "User not found" });
    }

    const otpBody = await OTP.findOne({ email, otp }).sort({ createdAt: -1 });
    if (!otpBody) {
      return res
        .status(400)
        .json({ success: false, message: "Invalid or expired OTP" });
    }

    user.password = newPassword;
    await user.save();

    await OTP.deleteOne({ _id: otpBody._id });

    res
      .status(200)
      .json({ success: true, message: "Password reset successfully" });
  } catch (error: any) {
    res.status(500).json({ success: false, message: error.message });
  }
};

export const changePassword = async (req: Request, res: Response) => {
  try {
    const { oldPassword, newPassword, confirmNewPassword } = req.body;
    const userId = req.user?.id;

    if (!userId) {
      return res.status(401).json({ success: false, message: "Unauthorized" });
    }

    if (newPassword !== confirmNewPassword) {
      return res
        .status(400)
        .json({ success: false, message: "Passwords do not match" });
    }

    const user = await User.findById(userId).select("+password");
    if (!user) {
      return res
        .status(404)
        .json({ success: false, message: "User not found" });
    }

    const isMatch = await user.comparePassword(oldPassword);
    if (!isMatch) {
      return res
        .status(401)
        .json({ success: false, message: "Invalid old password" });
    }

    user.password = newPassword;
    await user.save();

    res
      .status(200)
      .json({ success: true, message: "Password updated successfully" });
  } catch (error: any) {
    res.status(500).json({ success: false, message: error.message });
  }
};

export const updateProfile = async (req: Request, res: Response) => {
  try {
    const { name, age, gender, city, country } = req.body;
    const userId = req.user?.id;

    if (!userId) {
      return res.status(401).json({ success: false, message: "Unauthorized" });
    }

    const user = await User.findById(userId).select("+password");
    if (!user) {
      return res
        .status(404)
        .json({ success: false, message: "User not found" });
    }

    console.log(
      "Updating profile for user:",
      user.email,
      "with data:",
      req.body
    );

    // Update fields
    if (name) user.name = name;
    if (age !== undefined && age !== "") user.age = Number(age);
    if (gender) user.gender = gender;
    if (city) user.city = city;
    if (country) user.country = country;

    await user.save();
    console.log("Profile updated successfully for:", user.email);

    res.status(200).json({
      success: true,
      message: "Profile updated successfully",
      user: {
        _id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
        age: user.age,
        gender: user.gender,
        city: user.city,
        country: user.country,
      },
    });
  } catch (error: any) {
    res.status(500).json({ success: false, message: error.message });
  }
};
